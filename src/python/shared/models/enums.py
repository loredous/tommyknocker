from enum import Enum


class ResultType(int, Enum):
    EXIT_CODE = 1
    PRESENT_IN_OUTPUT = 2
    REGEX_MATCH_OUTPUT = 3

class MonitorType(int, Enum):
    ELASTICSEARCH = 1
    MOCK = 2

class TestStatus(int, Enum):
    PENDING = 1
    KNOCKING = 2
    CHECKING = 3
    SUCCESS = 4
    FAILURE = 5
    ERROR = 6

class ComponentStatus(int, Enum):
    PENDING = 1
    RUNNING = 2
    SUCCESS = 3
    FAILURE = 4
    ERROR = 5

class ComponentType(int, Enum):
    KNOCK = 1
    RESPONSE = 2