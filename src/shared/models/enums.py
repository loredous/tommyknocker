from enum import Enum


class ResultType(Enum):
    EXIT_CODE = 1
    PRESENT_IN_OUTPUT = 2
    REGEX_MATCH_OUTPUT = 3

class MonitorType(Enum):
    SPLUNK = 1
    ELASTICSEARCH = 2

class TestStatus(Enum):
    PENDING = 1
    RUNNING = 2
    SUCCESS = 3
    FAILURE = 4
    ERROR = 5

class ComponentType(Enum):
    KNOCK = 1
    RESPONSE = 2