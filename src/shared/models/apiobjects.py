from dataclasses import dataclass
from enum import Enum
from typing import Dict, List, Optional
from uuid import UUID

from shared.models.objects import MonitorType, ResultType

## Knock Objects

@dataclass
class UpdatedKnocker:
    name: Optional[str]
    description: Optional[str]
    id: UUID

@dataclass
class NewKnock:
    name: str
    description: Optional[str]
    runner_id: UUID
    command: str
    result_ids: Optional[List[UUID]]

@dataclass
class UpdatedKnock:
    id: UUID
    name: Optional[str]
    description: Optional[str]
    runner_id: Optional[UUID]
    command: Optional[str]
    result_ids: Optional[List[UUID]]

@dataclass
class NewRunner:
    name: str
    description: Optional[str]
    image_name: str
    image_tag: str

@dataclass
class UpdatedRunner:
    id: UUID
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
    id: UUID
    value: Optional[str]

## Response Objects
    
@dataclass
class NewMonitor:
    name: str
    description: Optional[str]
    type: MonitorType

@dataclass
class UpdatedMonitor:
    id: UUID
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
    id: UUID
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
    id: UUID
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
    id: UUID
    name: Optional[str]
    description: Optional[str]
    runner_id: Optional[UUID]
    knock_ids: Optional[List[UUID]]
    response_expectation_ids: Optional[List[UUID]]

@dataclass
class NewTestSuite:
    name: str
    description: Optional[str]
    test_configuration_ids: Optional[List[UUID]]

@dataclass
class UpdatedTestSuite:
    id: UUID
    name: Optional[str]
    description: Optional[str]
    test_configuration_ids: Optional[List[UUID]]