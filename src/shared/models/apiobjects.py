from dataclasses import dataclass
from enum import Enum
from typing import Dict, List, Optional
from uuid import UUID

from shared.models.objects import MonitorType, ResultType
from shared.models.enums import ComponentType, TestStatus

## Knock Objects

@dataclass
class UpdatedKnocker:
    name: Optional[str]
    description: Optional[str]

@dataclass
class NewKnocker(UpdatedKnocker):
    pass

@dataclass
class UpdatedKnock:
    name: str
    description: Optional[str]
    runner_id: UUID
    command: str
    result_ids: Optional[List[UUID]]

@dataclass
class NewKnock(UpdatedKnock):
    pass

@dataclass
class NewRunner:
    name: str
    description: Optional[str]
    image_name: str
    image_tag: str

@dataclass
class UpdatedRunner:
    name: Optional[str]
    description: Optional[str]
    image_name: Optional[str]
    image_tag: Optional[str]

@dataclass
class NewResult:
    type: ResultType
    value: str

@dataclass
class UpdatedResult:
    value: str

## Response Objects
    
@dataclass
class NewMonitor:
    name: str
    description: Optional[str]
    type: MonitorType

@dataclass
class UpdatedMonitor:
    name: Optional[str]
    description: Optional[str]

@dataclass
class NewResponse:
    name: str
    description: Optional[str]
    monitor_id: UUID
    monitor_parameters: Dict[str, str]

@dataclass
class UpdatedResponse:
    name: Optional[str]
    description: Optional[str]
    monitor_id: Optional[UUID]
    monitor_parameters: Optional[Dict[str, str]]

@dataclass
class NewResponseExpectation:
    response_id: UUID
    expected: bool
    timeout: int

@dataclass
class UpdatedResponseExpectation:
    expected: Optional[bool]
    timeout: Optional[int]

## Test Objects
    
@dataclass
class NewTestConfiguration:
    name: str
    description: Optional[str]
    runner_id: UUID
    knock_ids: Optional[List[UUID]]
    response_expectation_ids: Optional[List[UUID]]

@dataclass
class UpdatedTestConfiguration:
    name: Optional[str]
    description: Optional[str]
    runner_id: Optional[UUID]
    knock_ids: Optional[List[UUID]]
    response_expectation_ids: Optional[List[UUID]]

@dataclass
class NewTestComponentStatus:
    component_id: UUID
    component_type: ComponentType
    status: TestStatus

@dataclass
class UpdatedTestComponentStatus:
    status: TestStatus

@dataclass
class NewTest:
    configuration_id: UUID
    knocker_id: UUID


@dataclass
class NewTestSuite:
    name: str
    description: Optional[str]
    test_configuration_ids: Optional[List[UUID]]

@dataclass
class UpdatedTestSuite:
    name: Optional[str]
    description: Optional[str]
    test_configuration_ids: Optional[List[UUID]]