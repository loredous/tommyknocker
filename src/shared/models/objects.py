from dataclasses import dataclass
import datetime
from enum import Enum
from typing import Dict, List, Union
from uuid import UUID
from shared.models.dbobjects import DBKnock, DBKnocker, DBMonitor, DBResponse, DBResponseExpectation, DBResult, DBRunner, DBTest, DBTestConfiguration, DBTestKnockStatus, DBTestResponseStatus

from shared.models.enums import ComponentType, MonitorType, ResultType, TestStatus

## Knock Objects

@dataclass
class Knocker:
    name: str
    description: str
    id: UUID
    last_seen: datetime.datetime

    @classmethod
    def from_db(cls, db_knocker: DBKnocker):
        return cls(
            name=db_knocker.name,
            description=db_knocker.description,
            id=db_knocker.id,
            last_seen=db_knocker.last_seen
        )

@dataclass
class Knock:
    id: UUID
    name: str
    description: str
    runner_id: UUID
    command: str
    result_ids: List[UUID]

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
class Runner:
    name: str
    description: str
    id: UUID
    image_name: str
    image_tag: str

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
class Result:
    id: UUID
    type: ResultType
    value: str

    @classmethod
    def from_db(cls, db_result: DBResult):
        return cls(
            id=db_result.id,
            type=db_result.type,
            value=db_result.value
        )

## Response Objects



@dataclass
class Monitor:
    name: str
    description: str
    id: UUID
    type: MonitorType

    @classmethod
    def from_db(cls, db_monitor: DBMonitor):
        return cls(
            name=db_monitor.name,
            description=db_monitor.description,
            id=db_monitor.id,
            type=db_monitor.type
        )

@dataclass
class Response:
    name: str
    description: str
    id: UUID
    monitor_id: UUID
    monitor_parameters: Dict[str, str]

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
class ResponseExpectation:
    id: UUID
    response_id: UUID
    expected: bool
    timeout: int

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
class TestConfiguration:
    name: str
    description: str
    id: UUID
    runner_id: UUID
    knock_ids: List[UUID]
    response_expectation_ids: List[UUID]

    @classmethod
    def from_db(cls, db_test_configuration: DBTestConfiguration):
        return cls(
            name=db_test_configuration.name,
            description=db_test_configuration.description,
            id=db_test_configuration.id,
            runner_id=db_test_configuration.runner.id,
            knock_ids=[knock.id for knock in db_test_configuration.knocks],
            response_expectation_ids=[response_expectation.id for response_expectation in db_test_configuration.response_expectations]
        )

@dataclass
class TestComponentStatus:
    id: UUID
    component_id: UUID
    component_type: ComponentType
    status: TestStatus
    updated: datetime.datetime

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
class Test:
    id: UUID
    configuration_id: UUID
    knocker_id: UUID
    started: datetime.datetime
    ended: datetime.datetime
    status: TestStatus
    component_status_ids: List[UUID]

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
class TestSuite:
    id: UUID
    name: str
    description: str
    test_cofiguration_ids: List[UUID]

    @classmethod
    def from_db(cls, db_test_suite):
        return cls(
            id=db_test_suite.id,
            name=db_test_suite.name,
            description=db_test_suite.description,
            test_cofiguration_ids=[test_configuration.id for test_configuration in db_test_suite.test_configurations]
        )