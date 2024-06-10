from dataclasses import Field, dataclass, field
from enum import Enum
from typing import Dict, List, Optional
from uuid import UUID

from shared.models.objects import MonitorType, ResultType, NotUpdated
from shared.models.enums import ComponentStatus, ComponentType, TestStatus

## Knock Objects

@dataclass
class UpdatedKnocker:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated

@dataclass
class NewKnocker:
    name: str
    description: Optional[str] = None

@dataclass
class UpdatedKnock:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated
    runner_id: Optional[UUID] = NotUpdated
    command: Optional[str] = NotUpdated
    result_ids: Optional[List[UUID]] = NotUpdated

@dataclass
class NewKnock:
    name: str
    runner_id: UUID
    command: str
    description: Optional[str] = None
    result_ids: Optional[List[UUID]] = None


@dataclass
class NewRunner:
    name: str
    image_name: str
    image_tag: str
    description: Optional[str] = None

@dataclass
class UpdatedRunner:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated
    image_name: Optional[str] = NotUpdated
    image_tag: Optional[str] = NotUpdated

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
    type: MonitorType
    description: Optional[str] = None
    config: Optional[Dict[str, str]] = field(default_factory=dict)

@dataclass
class UpdatedMonitor:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated
    config: Optional[Dict[str, str]] = NotUpdated

@dataclass
class NewResponse:
    name: str
    monitor_id: UUID
    description: Optional[str] = None
    monitor_parameters: Dict[str, str] = field(default_factory=dict)

@dataclass
class UpdatedResponse:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated
    monitor_id: Optional[UUID] = NotUpdated
    monitor_parameters: Optional[Dict[str, str]] = NotUpdated

@dataclass
class NewResponseExpectation:
    response_id: UUID
    expected: bool
    timeout: int

@dataclass
class UpdatedResponseExpectation:
    expected: Optional[bool] = NotUpdated
    timeout: Optional[int] = NotUpdated

## Test Objects
    
@dataclass
class NewTestConfiguration:
    name: str
    description: Optional[str] = None
    knock_ids: Optional[List[UUID]] = field(default_factory=list)
    response_expectation_ids: Optional[List[UUID]] = field(default_factory=list)

@dataclass
class UpdatedTestConfiguration:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated
    knock_ids: Optional[List[UUID]] = NotUpdated
    response_expectation_ids: Optional[List[UUID]] = NotUpdated

@dataclass
class NewTestComponentStatus:
    component_id: UUID
    component_type: ComponentType
    status: ComponentStatus

@dataclass
class UpdatedTestComponentStatus:
    status: ComponentStatus
    

@dataclass
class NewTest:
    configuration_id: UUID
    knocker_id: UUID

@dataclass
class UpdatedTest:
    configuration_id: Optional[UUID] = NotUpdated
    knocker_id: Optional[UUID] = NotUpdated

@dataclass
class NewTestSuite:
    name: str
    description: Optional[str] = NotUpdated
    test_configuration_ids: Optional[List[UUID]] = field(default_factory=list)

@dataclass
class UpdatedTestSuite:
    name: Optional[str] = NotUpdated
    description: Optional[str] = NotUpdated
    test_configuration_ids: Optional[List[UUID]] = NotUpdated