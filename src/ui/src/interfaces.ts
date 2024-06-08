export interface Knocker {
    id: string,
    name: string,
    description: string,
    last_seen: Date
}

export interface Runner {
    id: string,
    name: string,
    description: string,
    image_name: string,
    image_tag: string
}

export interface MonitorConfig {
    [key: string]: string | number | boolean
}

export interface Monitor {
    id: string,
    name: string,
    description?: string,
    type: string,
    config?: MonitorConfig[]
}

export interface ResponseMonitorParameters {
    [key: string]: string | number | boolean
}

export interface Response {
    id: string,
    name: string,
    description: string,
    monitor_id: string,
    monitor_parameters: ResponseMonitorParameters
}

export interface Knock {
    id: string,
    runner_id: string,
    command: string,
    description: string,
    result_ids: string[]
}

export interface Result {
    id: string,
    type: string,
    value: string
}

export interface ResponseExpectation {
    id: string,
    response_id: string,
    expected: boolean,
    timeout: number
}

export interface TestConfiguration {
    id: string,
    name: string,
    description: string,
    knock_ids: string[],
    response_expectation_ids: string[]
}

export interface TestComponentStatus {
    id: string,
    component_id: string,
    component_type: string,
    status: string,
    updated: Date
}

export enum TestStatus {
    PENDING = 1,
    KNOCKING = 2,
    CHECKING = 3,
    SUCCESS = 4,
    FAILURE = 5,
    ERROR = 6
}

export interface Test {
    id: string,
    configuration_id: string,
    knocker_id: string,
    started: Date,
    ended: Date,
    status: TestStatus,
    component_status_ids: string[]
}

export interface SaturatedTest {
    test: Test,
    knocker: Knocker,
    configuration: TestConfiguration,
    component_statuses: TestComponentStatus[]
}

export interface TestSuite {
    id: string,
    name: string,
    description: string,
    test_configuration_ids: string[],
}

export enum StatusValue {
    HEALTHY = "HEALTHY",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    UNKNOWN = "UNKNOWN"
  }
  
export  interface TestConfigurationStatus {
    config: TestConfiguration;
    status : StatusValue;
    runs : Test[];
  }
  
export  interface TestSuiteStatus {
    suite: TestSuite;
    status : StatusValue;
    test_configs : TestConfigurationStatus[];
  }
  
export  interface StatusData {
    test_suites : TestSuiteStatus[];
    uncategorized_tests : TestSuiteStatus;
  }