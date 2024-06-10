from abc import ABC, abstractmethod
from datetime import datetime
from typing import Dict, List
from uuid import UUID
import asyncio
import pickle
from controller.settings import app_settings

from fastapi import Response


from shared.models.objects import Knock, Knocker, Runner, Monitor, ResponseExpectation, Test, TestComponentStatus, TestConfiguration, TestSuite, Result
from controller.errors import DuplicateException, NotFoundException
from shared.models.apiobjects import UpdatedTestComponentStatus
from shared.models.enums import ResultType, TestStatus

class ControllerState(ABC):
    #region Knocker Management
    @abstractmethod
    def list_knockers(self) -> List[Knocker]:
        raise NotImplementedError
    
    @abstractmethod
    def get_knocker_by_id(self, id: UUID) -> Knocker:
        raise NotImplementedError
    
    @abstractmethod
    def create_knocker(self, knocker: Knocker) -> Knocker:
        raise NotImplementedError
    
    @abstractmethod
    def update_knocker(self, knocker: Knocker) -> Knocker:
        raise NotImplementedError
    
    @abstractmethod
    def delete_knocker(self, id: UUID) -> None:
        raise NotImplementedError
    
    @abstractmethod
    def knocker_checkin(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion Knocker Management

    #region Knock Management
    @abstractmethod
    def list_knocks(self) -> List[Knock]:
        raise NotImplementedError
    
    @abstractmethod
    def get_knock_by_id(self, id: UUID) -> Knock:
        raise NotImplementedError
    
    @abstractmethod
    def create_knock(self, knock: Knock) -> Knock:
        raise NotImplementedError
    
    @abstractmethod
    def update_knock(self, knock: Knock) -> Knock:
        raise NotImplementedError
    
    @abstractmethod
    def delete_knock(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion Knock Management

    #region Runner Management
    @abstractmethod
    def list_runners(self) -> List[Runner]:
        raise NotImplementedError
    
    @abstractmethod
    def get_runner_by_id(self, id: UUID) -> Runner:
        raise NotImplementedError
    
    @abstractmethod
    def create_runner(self, runner: Runner) -> Runner:
        raise NotImplementedError
    
    @abstractmethod
    def update_runner(self, runner: Runner) -> Runner:
        raise NotImplementedError
    
    @abstractmethod
    def delete_runner(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion Runner Management
    
    #region Result Management
    @abstractmethod
    def list_results(self) -> List[Result]:
        raise NotImplementedError
    
    @abstractmethod
    def get_result_by_id(self, id: UUID) -> Result:
        raise NotImplementedError
    
    @abstractmethod
    def create_result(self, result: Result) -> Result:
        raise NotImplementedError
    
    @abstractmethod
    def update_result(self, result: Result) -> Result:
        raise NotImplementedError
    
    @abstractmethod
    def delete_result(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion Result Management

    #region Monitor Management
    @abstractmethod
    def list_monitors(self) -> List[Monitor]:
        raise NotImplementedError
    
    @abstractmethod
    def get_monitor_by_id(self, id: UUID) -> Monitor:
        raise NotImplementedError
    
    @abstractmethod
    def create_monitor(self, monitor: Monitor) -> Monitor:
        raise NotImplementedError
    
    @abstractmethod
    def update_monitor(self, monitor: Monitor) -> Monitor:
        raise NotImplementedError
    
    @abstractmethod
    def delete_monitor(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion Monitor Management

    #region Response Management
    @abstractmethod
    def list_responses(self) -> List[Response]:
        raise NotImplementedError
    
    @abstractmethod
    def get_response_by_id(self, id: UUID) -> Response:
        raise NotImplementedError
    
    @abstractmethod
    def create_response(self, response: Response) -> Response:
        raise NotImplementedError
    
    @abstractmethod
    def update_response(self, response: Response) -> Response:
        raise NotImplementedError
    
    @abstractmethod
    def delete_response(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion Response Management

    #region ResponseExpectation Management
    @abstractmethod
    def list_response_expectations(self) -> List[ResponseExpectation]:
        raise NotImplementedError
    
    @abstractmethod
    def get_response_expectation_by_id(self, id: UUID) -> ResponseExpectation:
        raise NotImplementedError
    
    @abstractmethod
    def create_response_expectation(self, response_expectation: ResponseExpectation) -> ResponseExpectation:
        raise NotImplementedError
    
    @abstractmethod
    def update_response_expectation(self, response_expectation: ResponseExpectation) -> ResponseExpectation:
        raise NotImplementedError
    
    @abstractmethod
    def delete_response_expectation(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion ResponseExpectation Management

    #region TestConfiguration Management
    @abstractmethod
    def list_test_configurations(self) -> List[TestConfiguration]:
        raise NotImplementedError
    
    @abstractmethod
    def get_test_configuration_by_id(self, id: UUID) -> TestConfiguration:
        raise NotImplementedError
    
    @abstractmethod
    def create_test_configuration(self, test_configuration: TestConfiguration) -> TestConfiguration:
        raise NotImplementedError
    
    @abstractmethod
    def update_test_configuration(self, test_configuration: TestConfiguration) -> TestConfiguration:
        raise NotImplementedError
    
    @abstractmethod
    def delete_test_configuration(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion TestConfiguration Management

    #region TestComponentStatus Management
    @abstractmethod
    def list_test_component_statuses(self) -> List[TestComponentStatus]:
        raise NotImplementedError
    
    @abstractmethod
    def get_test_component_status_by_id(self, id: UUID) -> TestComponentStatus:
        raise NotImplementedError
    
    @abstractmethod
    def create_test_component_status(self, test_component_status: TestComponentStatus) -> TestComponentStatus:
        raise NotImplementedError
    
    @abstractmethod
    def update_test_component_status(self, test_component_id: UUID, test_component_status: UpdatedTestComponentStatus)  -> TestComponentStatus:
        raise NotImplementedError
    
    @abstractmethod
    def delete_test_component_status(self, id: UUID) -> None:
        raise NotImplementedError
    
    @abstractmethod
    def get_test_component_status_by_component_id(self, component_id: UUID) -> TestComponentStatus:
        raise NotImplementedError
    #endregion TestComponentStatus Management

    #region Test Management
    @abstractmethod
    def list_tests(self) -> List[Test]:
        raise NotImplementedError
    
    @abstractmethod
    def get_test_by_id(self, id: UUID) -> Test:
        raise NotImplementedError
    
    @abstractmethod
    def create_test(self, test: Test) -> Test:
        
        raise NotImplementedError
    
    @abstractmethod
    def update_test(self, test: Test) -> Test:
        raise NotImplementedError
    
    @abstractmethod
    def delete_test(self, id: UUID) -> None:
        raise NotImplementedError

    @abstractmethod
    def add_test_component_status(self, test_id: UUID, component_status_id: UUID) -> None:
        raise NotImplementedError
    
    @abstractmethod
    def get_tests_by_knocker_id(self, knocker_id: UUID) -> List[Test]:
        raise NotImplementedError
    #endregion Test Management

    #region TestSuite Management
    @abstractmethod
    def list_test_suites(self) -> List[TestSuite]:
        raise NotImplementedError
    
    @abstractmethod
    def get_test_suite_by_id(self, id: UUID) -> TestSuite:
        raise NotImplementedError
    
    @abstractmethod
    def create_test_suite(self, test_suite: TestSuite) -> TestSuite:
        raise NotImplementedError
    
    @abstractmethod
    def update_test_suite(self, test_suite: TestSuite) -> TestSuite:
        raise NotImplementedError
    
    @abstractmethod
    def delete_test_suite(self, id: UUID) -> None:
        raise NotImplementedError
    #endregion TestSuite Management
    
class InMemoryState(ControllerState):
    def __init__(self):
        super().__init__()
        self._knockers: Dict[UUID, Knocker] = {}
        self._knocks: Dict[UUID, Knock] = {}
        self._runners: Dict[UUID, Runner] = {}
        self._results: Dict[UUID, Result] = {}
        self._monitors: Dict[UUID, Monitor] = {}
        self._responses: Dict[UUID, Response] = {}
        self._response_expectations: Dict[UUID, ResponseExpectation] = {}
        self._test_configurations: Dict[UUID, TestConfiguration] = {}
        self._test_component_statuses: Dict[UUID, TestComponentStatus] = {}
        self._tests: Dict[UUID, Test] = {}
        self._test_suites: Dict[UUID, TestSuite] = {}

    #region Knocker Management

    def list_knockers(self) -> List[Knocker]:
        return list(self._knockers.values())
    
    def get_knocker_by_id(self, id: UUID) -> Knocker:
        knocker = self._knockers.get(id,None)
        if knocker:
            return knocker
        else:
            raise NotFoundException(f"Knocker with id {id} not found")
    
    def create_knocker(self, knocker: Knocker) -> Knocker:
        if knocker.id in self._knockers:
            raise DuplicateException(f"Knocker with id {knocker.id} already exists")
        else:
            self._knockers[knocker.id] = knocker
            return knocker

    def update_knocker(self, id: UUID, knocker: Knocker) -> Knocker:
        if id in self._knockers:
            self._knockers[id].update(knocker)
            return self._knockers[id]
        else:
            raise NotFoundException(f"Knocker with id {knocker.id} not found")
        
    def delete_knocker(self, id: UUID) -> None:
        if id in self._knockers:
            self._knockers.pop(id)
        else:
            raise NotFoundException(f"Knocker with id {id} not found")
        
    def knocker_checkin(self, id: UUID) -> None:
        if id in self._knockers:
            self._knockers[id].last_seen = datetime.now()
        else:
            raise NotFoundException(f"Knocker with id {id} not found")
        
    #endregion Knocker Management
        
    #region Knock Management

    def validate_knock_relationships(self, knock: Knock) -> None:
        for result_id in knock.result_ids:
            if result_id not in self._results:
                raise NotFoundException(f"Result with id {result_id} not found")
        if knock.runner_id not in self._runners:
            raise NotFoundException(f"Runner with id {knock.runner_id} not found")

    def list_knocks(self) -> List[Knock]:
        return list(self._knocks.values())
    
    def get_knock_by_id(self, id: UUID) -> Knock:
        knock = self._knocks.get(id,None)
        if knock:
            return knock
        else:
            raise NotFoundException(f"Knock with id {id} not found")
    
    def create_knock(self, knock: Knock) -> Knock:
        if knock.id in self._knocks:
            raise DuplicateException(f"Knock with id {knock.id} already exists")
        self.validate_knock_relationships(knock)
        self._knocks[knock.id] = knock
        return knock
    
    def update_knock(self, id: UUID, knock: Knock) -> Knock:
        if id in self._knocks:
            updated = self._knocks[id].clone_with_updates(knock)
            self.validate_knock_relationships(updated)
            self._knocks[id] = updated
            return self._knocks[id]
        else:
            raise NotFoundException(f"Knock with id {id} not found")
    
    def delete_knock(self, id: UUID) -> None:
        if id in self._knocks:
            self._knocks.pop(id)
        else:
            raise NotFoundException(f"Knock with id {id} not found")
    
    #endregion Knock Management
        
    #region Runner Management

    def list_runners(self) -> List[Runner]:
        return list(self._runners.values())

    def get_runner_by_id(self, id: UUID) -> Runner:
        runner = self._runners.get(id, None)
        if runner:
            return runner
        else:
            raise NotFoundException(f"Runner with id {id} not found")

    def create_runner(self, runner: Runner) -> Runner:
        if runner.id in self._runners:
            raise DuplicateException(f"Runner with id {runner.id} already exists")
        self._runners[runner.id] = runner
        return runner

    def update_runner(self, id: UUID, runner: Runner) -> Runner:
        if id in self._runners:
            self._runners[id] = runner
            return self._runners[id]
        else:
            raise NotFoundException(f"Runner with id {id} not found")

    def delete_runner(self, id: UUID) -> None:
        if id in self._runners:
            self._runners.pop(id)
        else:
            raise NotFoundException(f"Runner with id {id} not found")

    #endregion Runner Management
    
    #region Result Management

    def list_results(self) -> List[Result]:
        return list(self._results.values())

    def get_result_by_id(self, id: UUID) -> Result:
        result = self._results.get(id, None)
        if result:
            return result
        else:
            raise NotFoundException(f"Result with id {id} not found")

    def create_result(self, result: Result) -> Result:
        if result.id in self._results:
            raise DuplicateException(f"Result with id {result.id} already exists")
        self._results[result.id] = result
        return result

    def update_result(self, id: UUID, result: Result) -> Result:
        if id in self._results:
            self._results[id] = result
            return self._results[id]
        else:
            raise NotFoundException(f"Result with id {id} not found")

    def delete_result(self, id: UUID) -> None:
        if id in self._results:
            self._results.pop(id)
        else:
            raise NotFoundException(f"Result with id {id} not found")

    #endregion Result Management

    #region Monitor Management
    def list_monitors(self) -> List[Monitor]:
        return list(self._monitors.values())

    def get_monitor_by_id(self, id: UUID) -> Monitor:
        monitor = self._monitors.get(id, None)
        if monitor:
            return monitor
        else:
            raise NotFoundException(f"Monitor with id {id} not found")

    def create_monitor(self, monitor: Monitor) -> Monitor:
        if monitor.id in self._monitors:
            raise DuplicateException(f"Monitor with id {monitor.id} already exists")
        self._monitors[monitor.id] = monitor
        return monitor

    def update_monitor(self, id: UUID, monitor: Monitor) -> Monitor:
        if id in self._monitors:
            self._monitors[id] = monitor
            return self._monitors[id]
        else:
            raise NotFoundException(f"Monitor with id {id} not found")

    def delete_monitor(self, id: UUID) -> None:
        if id in self._monitors:
            self._monitors.pop(id)
        else:
            raise NotFoundException(f"Monitor with id {id} not found")
    
    #endregion Monitor Management
    
    #region Response Management
        
    def validate_response_relationships(self, response: Response) -> None:
        if response.monitor_id not in self._monitors:
            raise NotFoundException(f"Monitor with id {response.monitor_id} not found")
        
    def list_responses(self) -> List[Response]:
        return list(self._responses.values())
    
    def get_response_by_id(self, id: UUID) -> Response:
        response = self._responses.get(id, None)
        if response:
            return response
        else:
            raise NotFoundException(f"Response with id {id} not found")
        
    def create_response(self, response: Response) -> Response:
        if response.id in self._responses:
            raise DuplicateException(f"Response with id {response.id} already exists")
        self.validate_response_relationships(response)
        self._responses[response.id] = response
        return response
    
    def update_response(self, id: UUID, response: Response) -> Response:
        if id in self._responses:
            updated = self._responses[id].clone_with_updates(response)
            self.validate_response_relationships(updated)
            self._responses[id] = updated
            return self._responses[id]
        else:
            raise NotFoundException(f"Response with id {response.id} not found")
    
    def delete_response(self, id: UUID) -> None:
        if id in self._responses:
            self._responses.pop(id)
        else:
            raise NotFoundException(f"Response with id {id} not found")
    
    #endregion Response Management

    #region ResponseExpectation Management
    
    def validate_response_expectation_relationships(self, response_expectation: ResponseExpectation) -> None:
        if response_expectation.response_id not in self._responses:
            raise NotFoundException(f"Response with id {response_expectation.response_id} not found")
    
    def list_response_expectations(self) -> List[ResponseExpectation]:
        return list(self._response_expectations.values())
    
    def get_response_expectation_by_id(self, id: UUID) -> ResponseExpectation:
        response_expectation = self._response_expectations.get(id, None)
        if response_expectation:
            return response_expectation
        else:
            raise NotFoundException(f"ResponseExpectation with id {id} not found")
        
    def create_response_expectation(self, response_expectation: ResponseExpectation) -> ResponseExpectation:
        if response_expectation.id in self._response_expectations:
            raise DuplicateException(f"ResponseExpectation with id {response_expectation.id} already exists")
        self.validate_response_expectation_relationships(response_expectation)
        self._response_expectations[response_expectation.id] = response_expectation
        return response_expectation
        
    def update_response_expectation(self, id: UUID, response_expectation: ResponseExpectation) -> ResponseExpectation:
        if id in self._response_expectations:
            updated = self._response_expectations[id].clone_with_updates(response_expectation)
            self.validate_response_expectation_relationships(updated)
            self._response_expectations[id] = updated
            return self._response_expectations[id]
        else:
            raise NotFoundException(f"ResponseExpectation with id {id} not found")
        
    def delete_response_expectation(self, id: UUID) -> None:
        if id in self._response_expectations:
            self._response_expectations.pop(id)
        else:
            raise NotFoundException(f"ResponseExpectation with id {id} not found")
        
    #endregion ResponseExpectation Management
    
    #region TestConfiguration Management
    
    def validate_test_configuration_relationships(self, test_configuration: TestConfiguration) -> None:
        for knock_id in test_configuration.knock_ids:
            if knock_id not in self._knocks:
                raise NotFoundException(f"Knock with id {knock_id} not found")
        for response_expectation_id in test_configuration.response_expectation_ids:
            if response_expectation_id not in self._response_expectations:
                raise NotFoundException(f"ResponseExpectation with id {response_expectation_id} not found")
            
    def list_test_configurations(self) -> List[TestConfiguration]:
        return list(self._test_configurations.values())
    
    def get_test_configuration_by_id(self, id: UUID) -> TestConfiguration:
        test_configuration = self._test_configurations.get(id, None)
        if test_configuration:
            return test_configuration
        else:
            raise NotFoundException(f"TestConfiguration with id {id} not found")
    
    def create_test_configuration(self, test_configuration: TestConfiguration) -> TestConfiguration:
        if test_configuration.id in self._test_configurations:
            raise DuplicateException(f"TestConfiguration with id {test_configuration.id} already exists")
        self.validate_test_configuration_relationships(test_configuration)
        self._test_configurations[test_configuration.id] = test_configuration
        return test_configuration
    
    def update_test_configuration(self, id: UUID, test_configuration: TestConfiguration) -> TestConfiguration:
        if id in self._test_configurations:
            updated = self._test_configurations[id].clone_with_updates(test_configuration)
            self.validate_test_configuration_relationships(updated)
            self._test_configurations[id] = updated
            return self._test_configurations[id]
        else:
            raise NotFoundException(f"TestConfiguration with id {id} not found")
        
    def delete_test_configuration(self, id: UUID) -> None:
        if id in self._test_configurations:
            self._test_configurations.pop(id)
        else:
            raise NotFoundException(f"TestConfiguration with id {id} not found")
        
    def get_latest_runs_by_test_configuration_id(self, id: UUID, count: int):
        tests = [test for test in self._tests.values() if test.configuration_id == id]
        tests.sort(key=lambda x: x.ended, reverse=True)
        if len(tests) > count:
            return tests[:count]
        else:
            return tests
        
    #endregion TestConfiguration Management

    #region TestComponentStatus Management
    
    def validate_test_component_status_relationships(self, test_component_status: TestComponentStatus) -> None:
        if test_component_status.component_id not in self._knocks and test_component_status.component_id not in self._responses:
            raise NotFoundException(f"Id {test_component_status.component_id} does not match any known Knocks or Responses")

    def list_test_component_statuses(self) -> List[TestComponentStatus]:
        return list(self._test_component_statuses.values())
    
    def get_test_component_status_by_id(self, id: UUID) -> TestComponentStatus:
        test_component_status = self._test_component_statuses.get(id, None)
        if test_component_status:
            return test_component_status
        else:
            raise NotFoundException(f"TestComponentStatus with id {id} not found")
        
    def create_test_component_status(self, test_component_status: TestComponentStatus) -> TestComponentStatus:
        if test_component_status.id in self._test_component_statuses:
            raise DuplicateException(f"TestComponentStatus with id {test_component_status.id} already exists")
        test_component_status.updated = datetime.now()
        self.validate_test_component_status_relationships(test_component_status)
        self._test_component_statuses[test_component_status.id] = test_component_status
        return test_component_status
    
    def update_test_component_status(self, test_component_id: UUID, test_component_status: UpdatedTestComponentStatus) -> TestComponentStatus:
        if test_component_id in self._test_component_statuses:
            self._test_component_statuses[test_component_id].status = test_component_status.status
            self._test_component_statuses[test_component_id].updated = datetime.now()
            return self._test_component_statuses[test_component_id]
        else:
            raise NotFoundException(f"TestComponentStatus with id {test_component_status.id} not found")
        
    def delete_test_component_status(self, id: UUID) -> None:
        if id in self._test_component_statuses:
            self._test_component_statuses.pop(id)
        else:
            raise NotFoundException(f"TestComponentStatus with id {id} not found")
        
    def get_test_component_status_by_component_id(self, component_id: UUID) -> TestComponentStatus:
        for test_component_status in self._test_component_statuses.values():
            if test_component_status.component_id == component_id:
                return test_component_status
        raise NotFoundException(f"TestComponentStatus with component_id {component_id} not found")
    
    def get_test_component_statuses_by_test_id(self, test_id: UUID) -> List[TestComponentStatus]:
        test = self.get_test_by_id(test_id)
        return [self._test_component_statuses[component_status_id] for component_status_id in test.component_status_ids]
        
    #endregion TestComponentStatus Management

    #region Test Management
        
    def validate_test_relationships(self, test: Test) -> None:
        if test.configuration_id not in self._test_configurations:
            raise NotFoundException(f"TestConfiguration with id {test.configuration_id} not found")
        if test.knocker_id not in self._knockers:
            raise NotFoundException(f"Knocker with id {test.knocker_id} not found")
        for component_status_id in test.component_status_ids:
            if component_status_id not in self._test_component_statuses:
                raise NotFoundException(f"TestComponentStatus with id {component_status_id} not found")
            
    def list_tests(self) -> List[Test]:
        return list(self._tests.values())
    
    def get_test_by_id(self, id: UUID) -> Test:
        test = self._tests.get(id, None)
        if test:
            return test
        else:
            raise NotFoundException(f"Test with id {id} not found")
    
    def create_test(self, test: Test) -> Test:
        if test.id in self._tests:
            raise DuplicateException(f"Test with id {test.id} already exists")
        self.validate_test_relationships(test)
        self._tests[test.id] = test
        return test
    
    def update_test(self, id: UUID, test: Test) -> Test:
        if id in self._tests:
            updated = self._tests[id].clone_with_updates(test)
            self.validate_test_relationships(updated)
            self._tests[id] = updated
            return self._tests[id]
        else:
            raise NotFoundException(f"Test with id {id} not found")
        
        
    def delete_test(self, id: UUID) -> None:
        if id in self._tests:
            self._tests.pop(id)
        else:
            raise NotFoundException(f"Test with id {id} not found")
        
    def get_tests_by_knocker_id(self, knocker_id: UUID) -> List[Test]:
        return [test for test in self._tests.values() if test.knocker_id == knocker_id]
        
    def add_test_component_status(self, test_id: UUID, component_status_id: UUID) -> None:
        if test_id in self._tests:
            self._tests[test_id].component_status_ids.append(component_status_id)
            return self._tests[test_id]
        else:
            raise NotFoundException(f"Test with id {test_id} not found")
        
    def get_tests_by_status(self, status: TestStatus) -> List[Test]:
        return [test for test in self._tests.values() if test.status == status]
    
    def get_running_tests(self) -> List[Test]:
        return [test for test in self._tests.values() if test.status in (TestStatus.KNOCKING, TestStatus.CHECKING)]
    
    def get_completed_tests(self) -> List[Test]:
        return [test for test in self._tests.values() if test.status in (TestStatus.SUCCESS, TestStatus.FAILURE, TestStatus.ERROR)]
    #endregion Test Management

    #region TestSuite Management
        
    def validate_test_suite_relationships(self, test_suite: TestSuite) -> None:
        for test_configuration_id in test_suite.test_configuration_ids:
            if test_configuration_id not in self._test_configurations:
                raise NotFoundException(f"TestConfiguration with id {test_configuration_id} not found")
            
    def list_test_suites(self) -> List[TestSuite]:
        return list(self._test_suites.values())
    
    def get_test_suite_by_id(self, id: UUID) -> TestSuite:
        test_suite = self._test_suites.get(id, None)
        if test_suite:
            return test_suite
        else:
            raise NotFoundException(f"TestSuite with id {id} not found")
        
    def create_test_suite(self, test_suite: TestSuite) -> TestSuite:
        if test_suite.id in self._test_suites:
            raise DuplicateException(f"TestSuite with id {test_suite.id} already exists")
        self.validate_test_suite_relationships(test_suite)
        self._test_suites[test_suite.id] = test_suite
        return test_suite
    
    def update_test_suite(self, id: UUID, test_suite: TestSuite) -> TestSuite:
        if id in self._test_suites:
            updated = self._test_suites[id].clone_with_updates(test_suite)
            self.validate_test_suite_relationships(updated)
            self._test_suites[id] = updated
            return self._test_suites[id]
        else:
            raise NotFoundException(f"TestSuite with id {id} not found")
    
    def delete_test_suite(self, id: UUID) -> None:
        if id in self._test_suites:
            self._test_suites.pop(id)
        else:
            raise NotFoundException(f"TestSuite with id {id} not found")
        
    def get_test_configurations_in_suite(self, suite_id: UUID) -> List[TestConfiguration]:
        return [test for test in self._test_configurations.values() if test.id in self._test_suites[suite_id].test_configuration_ids]
        
    def get_uncategorized_test_configurations(self) -> List[TestConfiguration]:
        return [test for test in self._test_configurations.values() if not any(test.id in test_suite.test_configuration_ids for test_suite in self._test_suites.values())]
    #endregion TestSuite Management

class PersistentInMemoryState(InMemoryState):
    def __init__(self):
        super().__init__()
        self.load()
        asyncio.get_running_loop().create_task(self.ongoing_save())

    async def ongoing_save(self):
        while True:
            await asyncio.sleep(10)
            await self.save()

    async def save(self):
        with open(app_settings.state_file, "wb") as f:
            pickle.dump(self, f)

    def load(self):
        try:
            with open(app_settings.state_file, "rb") as f:
                state = pickle.load(f)
                self.__dict__.update(state.__dict__)
        except:
            pass
        
class ControllerStateFactory:
    _state: ControllerState = None
    _state_type: type = InMemoryState

    @classmethod
    def set_state_type(cls, state_type: type):
        cls._state_type = state_type

    @classmethod
    def get_state(cls) -> ControllerState:
        if not cls._state:
            cls._state = cls._state_type()
        return cls._state