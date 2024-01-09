from dataclasses import dataclass
import datetime
from enum import Enum
from typing import Dict, List
from uuid import UUID

## Knock Objects

@dataclass
class Knocker:
    name: str
    description: str
    id: UUID
    last_seen: datetime.datetime

@dataclass
class Knock:
    name: str
    description: str
    runner_id: UUID
    command: str
    result_ids: List[UUID]

@dataclass
class Runner:
    name: str
    description: str
    id: UUID
    image_name: str
    image_tag: str

class ResultType(Enum):
    EXIT_CODE = 1
    PRESENT_IN_OUTPUT = 2
    REGEX_MATCH_OUTPUT = 3

@dataclass
class Result:
    id: UUID
    type: ResultType
    value: str

## Response Objects

class MonitorType(Enum):
    SPLUNK = 1
    ELASTICSEARCH = 2

@dataclass
class Monitor:
    name: str
    description: str
    id: UUID
    type: MonitorType

@dataclass
class Response:
    name: str
    description: str
    id: UUID
    monitor_id: UUID
    monitor_parameters: Dict[str, str]

@dataclass
class ResponseExpectation:
    id: UUID
    response_id: UUID
    expected: bool
    timeout: int

## Test Objects

@dataclass
class TestConfgiuration:
    name: str
    description: str
    id: UUID
    runner_id: UUID
    knock_ids: List[UUID]
    response_expectation_ids: List[UUID]

class TestStatus(Enum):
    PENDING = 1
    RUNNING = 2
    SUCCESS = 3
    FAILURE = 4
    ERROR = 5

class ComponentType(Enum):
    KNOCK = 1
    RESPONSE = 2

@dataclass
class TestComponentStatus:
    id: UUID
    component_id: UUID
    component_type: ComponentType
    status: TestStatus
    updated: datetime.datetime
    

@dataclass
class Test:
    id: UUID
    configuration_id: UUID
    knocker_id: UUID
    started: datetime.datetime
    ended: datetime.datetime
    status: TestStatus
    component_status_ids: List[UUID]
    
@dataclass
class TestSuite:
    id: UUID
    name: str
    description: str
    test_cofiguration_ids: List[UUID]