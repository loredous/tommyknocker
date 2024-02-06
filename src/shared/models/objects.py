from dataclasses import dataclass, asdict, field
import datetime
from enum import Enum
import re
from typing import Dict, List, Optional, Union
from uuid import UUID, uuid4
from shared.models.dbobjects import DBKnock, DBKnocker, DBMonitor, DBResponse, DBResponseExpectation, DBResult, DBRunner, DBTest, DBTestConfiguration, DBTestKnockStatus, DBTestResponseStatus

from shared.models.enums import ComponentStatus, ComponentType, MonitorType, ResultType, TestStatus

class Updateable(object):
    def update(self, new):
        for key, value in asdict(new).items():
            if hasattr(self, key):
                setattr(self, key, value)

    def clone_with_updates(self, new):
        clone = self.__class__(**asdict(self))
        clone.update(new)
        return clone

## Knock Objects

@dataclass
class Knocker(Updateable):
    name: str
    description: str = ""
    id: UUID = field(default_factory=uuid4)
    last_seen: Optional[datetime.datetime] = None

    @classmethod
    def from_db(cls, db_knocker: DBKnocker):
        return cls(
            name=db_knocker.name,
            description=db_knocker.description,
            id=db_knocker.id,
            last_seen=db_knocker.last_seen
        )

@dataclass
class Knock(Updateable):
    name: str
    runner_id: UUID
    command: str
    description: str = ""
    id: UUID = field(default_factory=uuid4)
    result_ids: List[UUID] = field(default_factory=list)

    @classmethod
    def from_db(cls, db_knock: DBKnock):
        return cls(
            id=db_knock.id,
            name=db_knock.name,
            description=db_knock.description,
            runner_id=db_knock.runner.id,
            command=db_knock.command,
            result_ids=[result.id for result in db_knock.results]
        )

@dataclass
class Runner(Updateable):
    name: str
    description: str
    image_name: str
    image_tag: str
    id: UUID = field(default_factory=uuid4)

    @classmethod
    def from_db(cls, db_runner: DBRunner):
        return cls(
            name=db_runner.name,
            description=db_runner.description,
            id=db_runner.id,
            image_name=db_runner.image_name,
            image_tag=db_runner.image_tag
        )

@dataclass
class Result(Updateable):
    type: ResultType
    value: str
    id: UUID = field(default_factory=uuid4)

    @classmethod
    def from_db(cls, db_result: DBResult):
        return cls(
            id=db_result.id,
            type=db_result.type,
            value=db_result.value
        )
    
    def check_result(self, exit_code: int = 0, output: str = "") -> bool:
        if self.type == ResultType.EXIT_CODE:
            return str(exit_code) == self.value
        elif self.type == ResultType.PRESENT_IN_OUTPUT:
            return self.value in output.decode()
        elif self.type == ResultType.REGEX_MATCH_OUTPUT:
            return bool(re.match(self.value, output.decode()))
        else:
            return False

## Response Objects



@dataclass
class Monitor(Updateable):
    name: str
    type: MonitorType
    description: str = ""
    id: UUID = field(default_factory=uuid4)

    @classmethod
    def from_db(cls, db_monitor: DBMonitor):
        return cls(
            name=db_monitor.name,
            description=db_monitor.description,
            id=db_monitor.id,
            type=db_monitor.type
        )

@dataclass
class Response(Updateable):
    name: str
    monitor_id: UUID
    monitor_parameters: Dict[str, str]
    description: str = ""
    id: UUID = field(default_factory=uuid4)

    @classmethod
    def from_db(cls, db_response: DBResponse):
        return cls(
            name=db_response.name,
            description=db_response.description,
            id=db_response.id,
            monitor_id=db_response.monitor.id,
            monitor_parameters=db_response.monitor_parameters
        )

@dataclass
class ResponseExpectation(Updateable):
    response_id: UUID
    expected: bool
    timeout: int
    id: UUID = field(default_factory=uuid4)

    @classmethod
    def from_db(cls, db_response_expectation: DBResponseExpectation):
        return cls(
            id=db_response_expectation.id,
            response_id=db_response_expectation.response.id,
            expected=db_response_expectation.expected,
            timeout=db_response_expectation.timeout
        )

## Test Objects

@dataclass
class TestConfiguration(Updateable):
    name: str
    id: UUID = field(default_factory=uuid4)
    description: str = ""
    knock_ids: List[UUID] = field(default_factory=list)
    response_expectation_ids: List[UUID] = field(default_factory=list)

    @classmethod
    def from_db(cls, db_test_configuration: DBTestConfiguration):
        return cls(
            name=db_test_configuration.name,
            description=db_test_configuration.description,
            id=db_test_configuration.id,
            knock_ids=[knock.id for knock in db_test_configuration.knocks],
            response_expectation_ids=[response_expectation.id for response_expectation in db_test_configuration.response_expectations]
        )

@dataclass
class TestComponentStatus(Updateable):
    component_id: UUID
    component_type: ComponentType
    status: ComponentStatus
    id: UUID = field(default_factory=uuid4)
    updated: Optional[datetime.datetime] = None

    @classmethod
    def from_db(cls, db_test_component_status: Union[DBTestKnockStatus, DBTestResponseStatus]):
        if isinstance(db_test_component_status, DBTestKnockStatus):
            return cls(
                id=db_test_component_status.id,
                component_id=db_test_component_status.knock.id,
                component_type=ComponentType.KNOCK,
                status=db_test_component_status.status,
                updated=db_test_component_status.updated
            )
        else:
            return cls(
                id=db_test_component_status.id,
                component_id=db_test_component_status.response.id,
                component_type=ComponentType.RESPONSE,
                status=db_test_component_status.status,
                updated=db_test_component_status.updated
            )
    

@dataclass
class Test(Updateable):
    configuration_id: UUID
    knocker_id: UUID
    id: UUID = field(default_factory=uuid4)
    started: Optional[datetime.datetime] = None
    ended: Optional[datetime.datetime] = None
    status: TestStatus = TestStatus.PENDING
    component_status_ids: List[UUID] = field(default_factory=list)

    @classmethod
    def from_db(cls, db_test: DBTest):
        return cls(
            id=db_test.id,
            configuration_id=db_test.configuration.id,
            knocker_id=db_test.knocker.id,
            started=db_test.started,
            ended=db_test.ended,
            status=db_test.status,
            component_status_ids=[component_status.id for component_status in db_test.knock_statuses + db_test.response_statuses]
        )
    
@dataclass
class TestSuite(Updateable):
    name: str
    id: UUID = field(default_factory=uuid4)
    description: str = ""
    test_cofiguration_ids: List[UUID] = field(default_factory=list)

    @classmethod
    def from_db(cls, db_test_suite):
        return cls(
            id=db_test_suite.id,
            name=db_test_suite.name,
            description=db_test_suite.description,
            test_cofiguration_ids=[test_configuration.id for test_configuration in db_test_suite.test_configurations]
        )