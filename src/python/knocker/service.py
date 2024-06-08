import asyncio
from dataclasses import dataclass, asdict
from logging import getLogger
import sched
from typing import Dict, List
from uuid import UUID

import requests

from shared.models.objects import Result, Test, Knock, TestConfiguration, TestComponentStatus, Runner
from shared.models.apiobjects import NewTestComponentStatus, UpdatedTestComponentStatus
from shared.models.enums import ComponentStatus, TestStatus, ComponentType
from knocker.knock import ActiveKnock


@dataclass
class KnockerConfig:
    controller: str
    port: int
    interval: int
    identity: str

    def __str__(self) -> str:
        return str(vars(self))
    
class v1ControllerAPIInteractor:
    def __init__(self, controller, port, identity) -> None:
        self.url = f"http://{controller}:{port}/api/v1/"
        self.logger = getLogger("v1ControllerAPIInteractor")
        self.logger.debug(f"Initialized v1 controller API interactor with URL: {self.url}")
        self.identity = identity

    def send_post_request(self, endpoint: str, data: Dict = {}) -> requests.Response:
        self.logger.debug(f"Sending POST request to {endpoint} with data: {data}")
        response = requests.post(f"{self.url}{endpoint}", json=data)
        self.logger.debug(f"Received response from {endpoint}: [{response.status_code}] {response.text}")
        return response

    def send_get_request(self, endpoint: str) -> requests.Response:
        self.logger.debug(f"Sending GET request to {endpoint}")
        response = requests.get(f"{self.url}{endpoint}")
        self.logger.debug(f"Received response from {endpoint}: [{response.status_code}] {response.text}")
        return response

    def send_put_request(self, endpoint: str, data: Dict) -> requests.Response:
        self.logger.debug(f"Sending PUT request to {endpoint} with data: {data}")
        response = requests.put(f"{self.url}{endpoint}", json=data)
        self.logger.debug(f"Received response from {endpoint}: [{response.status_code}] {response.text}")
        return response

    def checkin(self) -> List[Test]:
        self.logger.info(f"Checking in with controller")
        response = self.send_post_request(f"knockers/{self.identity}/checkin", {})
        if response.status_code != 200:
            self.logger.error(f"Failed to check in with controller: [{response.status_code}] {response.text}")
            return []
        else:
            self.logger.debug(f"Successfully checked in with controller")
            return [Test(**test) for test in response.json()]

    def get_test_by_id(self, test_id: UUID) -> Test:
        self.logger.info(f"Getting test by ID {test_id}")
        response = self.send_get_request(f"tests/{test_id}")
        if response.status_code != 200:
            self.logger.error(f"Failed to get test by ID {test_id}: [{response.status_code}] {response.text}")
            return None
        else:
            self.logger.debug(f"Successfully got test by ID {test_id}")
            return Test(**response.json())

    ## TODO: Optimize as server-side method   
    def get_test_config_by_test_id(self, test_id: UUID) -> TestConfiguration:
        self.logger.info(f"Getting test configuration for test ID {test_id}")
        test = self.get_test_by_id(test_id)
        if not test:
            self.logger.error(f"Failed to get test ID {test_id}")
            return None
        else:
            test_config = self.get_test_config_by_id(test.configuration_id)
            self.logger.debug(f"Successfully got test configuration for test ID {test_id}")
            return test_config

    def get_test_config_by_id(self, config_id: UUID) -> TestConfiguration:
        self.logger.info(f"Getting test configuration for test ID {config_id}")
        response = self.send_get_request(f"test-configurations/{config_id}")
        if response.status_code != 200:
            self.logger.error(f"Failed to get test configuration for test ID {config_id}: [{response.status_code}] {response.text}")
            return None
        else:
            self.logger.debug(f"Successfully got test configuration for test ID {config_id}")
            return TestConfiguration(**response.json())
        
    def get_knock_by_id(self, knock_id: UUID) -> Knock:
        self.logger.info(f"Getting knock by ID {knock_id}")
        response = self.send_get_request(f"knocks/{knock_id}")
        if response.status_code != 200:
            self.logger.error(f"Failed to get knock by ID {knock_id}: [{response.status_code}] {response.text}")
            return None
        else:
            self.logger.debug(f"Successfully got knock by ID {knock_id}")
            return Knock(**response.json())

    def get_runner_by_id(self, runner_id: UUID) -> Runner:
        self.logger.info(f"Getting runner by ID {runner_id}")
        response = self.send_get_request(f"runners/{runner_id}")
        if response.status_code != 200:
            self.logger.error(f"Failed to get runner by ID {runner_id}: [{response.status_code}] {response.text}")
            return None
        else:
            self.logger.debug(f"Successfully got runner by ID {runner_id}")
            return Runner(**response.json())

    def get_test_component_status_by_id(self, status_id: UUID) -> TestComponentStatus:
        self.logger.info(f"Getting test component status by ID {status_id}")
        response = self.send_get_request(f"test-component-statuses/{status_id}")
        if response.status_code != 200:
            self.logger.error(f"Failed to get test component status by ID {status_id}: [{response.status_code}] {response.text}")
            return None
        else:
            self.logger.debug(f"Successfully got test component status by ID {status_id}")
            return TestComponentStatus(**response.json())

    def create_new_test_component_status(self, component_id: UUID, component_type: str, status: TestStatus) -> TestComponentStatus:
        self.logger.info(f"Creating new test component status for component ID {component_id}")
        response = self.send_post_request(f"test-component-statuses", asdict(NewTestComponentStatus(component_id, component_type, status)))
        if response.status_code != 200:
            self.logger.error(f"Failed to create new test component status for component ID {component_id}: [{response.status_code}] {response.text}")
        else:
            self.logger.debug(f"Successfully created new test component status for component ID {component_id}")
            return TestComponentStatus(**response.json())

    def add_test_component_status_to_test(self, test_id: UUID, status_id: UUID):
        self.logger.info(f"Adding test component status with ID {status_id} to test with ID {test_id}")
        response = self.send_put_request(f"tests/{test_id}/add_component_status/{status_id}", data = {})
        if response.status_code != 200:
            self.logger.error(f"Failed to add test component status with ID {status_id} to test with ID {test_id}: [{response.status_code}] {response.text}")
        else:
            self.logger.debug(f"Successfully added test component status with ID {status_id} to test with ID {test_id}")

    def update_test_component_status(self, status_id: UUID, status: TestStatus):
        self.logger.info(f"Updating test component status with ID {status_id}")
        response = self.send_put_request(f"test-component-statuses/{status_id}", {"status": status.status.value})
        if response.status_code != 200:
            self.logger.error(f"Failed to update test component status with ID {status_id}: [{response.status_code}] {response.text}")
        else:
            self.logger.debug(f"Successfully updated test component status with ID {status_id}")

    def create_or_update_test_component_status(self, test_id: UUID, component_id: UUID, status: TestStatus):
        self.logger.info(f"Creating or updating test component status for test ID {test_id} and component ID {component_id}")
        test = self.get_test_by_id(test_id)
        if not test:
            self.logger.error(f"Failed Creating or updating test component status for test ID {test_id} and component ID {component_id}")
            return
        else:
            for component_status_id in test.component_status_ids:
                component_status = self.get_test_component_status_by_id(component_status_id)
                if component_status.component_id == component_id:
                    self.update_test_component_status(component_status.id, UpdatedTestComponentStatus(status))
                    return
            test_component_status = self.create_new_test_component_status(component_id, ComponentType.KNOCK, status)
            self.add_test_component_status_to_test(test_id, test_component_status.id)

    def get_result_by_id(self, result_id: UUID) -> Result:
        self.logger.info(f"Getting result by ID {result_id}")
        response = self.send_get_request(f"results/{result_id}")
        if response.status_code != 200:
            self.logger.error(f"Failed to get result by ID {result_id}: [{response.status_code}] {response.text}")
            return None
        else:
            self.logger.debug(f"Successfully got result by ID {result_id}")
            return Result(**response.json())

    def get_knock_expected_results(self, knock_id: UUID) -> List[Result]:
        self.logger.info(f"Getting expected results for knock with ID {knock_id}")
        knock = self.get_knock_by_id(knock_id)
        expected_results = []
        if knock is None:
            self.logger.error(f"Failed to get knock by ID {knock_id}")
            return []
        for result_id in knock.result_ids:
            response = self.get_result_by_id(result_id)
            if response is None:
                self.logger.error(f"Failed to get result by ID {result_id}")
                return None
            expected_results.append(response)
        return expected_results
            
            
            

class KnockerService:
    def __init__(self, config: KnockerConfig):
        self.config = config
        self.scheduler = sched.scheduler()
        self.knocks: Dict[UUID, ActiveKnock] = {}
        self.logger = getLogger("KnockerService")
        self.logger.info("Initialized knocker service")
        self.logger.debug(f"Config: {self.config}")
        self._api_interactor = v1ControllerAPIInteractor(self.config.controller, self.config.port, self.config.identity)

    def run(self):
        self.logger.info("Running knocker service")
        self.checkin()
        self.scheduler.enter(self.config.interval, 1, self.progress_active_knocks)
        self.scheduler.run()
        

        
    def checkin(self):
        self.logger.info("Checking in with controller")
        try:
            tests = self._api_interactor.checkin()
            self.scheduler.enter(0, 1, self.update_active_state, (tests,))
        except Exception as e:
            self.logger.error(f"Failed to check in with controller: {e}")
        finally:
            self.logger.debug(f"Checkin successful. Scheduling next checkin in {self.config.interval} seconds")
            self.scheduler.enter(self.config.interval, 1, self.checkin)
        

    def update_active_state(self, tests: List[Test]):
        for test in tests:
            if test.status >= TestStatus.CHECKING:
                self.logger.debug(f"Test with ID {test.id} done knocking. Cleaning up knocks")
                cleanup_targets = []
                for knock_test_id in self.knocks:
                    if knock_test_id.startswith(str(test.id)):
                        cleanup_targets.append(knock_test_id)
                for target in cleanup_targets:
                    self.knocks.pop(target)
                continue
            configuration = self._api_interactor.get_test_config_by_id(test.configuration_id)
            if configuration is None:
                self.logger.error(f"Failed to get test configuration for test ID {test.id}")
                continue
            for knock_id in configuration.knock_ids:
                knock_test_id = f'{test.id}.{knock_id}'
                if knock_test_id not in self.knocks:
                    knock = self._api_interactor.get_knock_by_id(knock_id)
                    if knock is None:
                        self.logger.error(f"Failed to get knock by ID {knock_id}")
                        continue
                    runner = self._api_interactor.get_runner_by_id(knock.runner_id)
                    self.knocks[knock_test_id] = ActiveKnock(knock=knock, runner=runner, test=test)
                    self.logger.debug(f"Added test-knock with ID {knock_test_id} to active state")

    def progress_active_knocks(self):
        try:
            for knock_id, knock in self.knocks.items():
                if not knock.current_state.final:
                    self.logger.debug(f"Cycling knock with id {knock_id}")
                    knock.cycle()
                    self._api_interactor.create_or_update_test_component_status(knock.test.id, knock.knock.id, ComponentStatus.PENDING if knock.current_state in [ActiveKnock.pending, ActiveKnock.pulling] else ComponentStatus.RUNNING)
                else:
                    self.logger.debug(f"Knock with ID {knock_id} is already complete")
                    self.scheduler.enter(0, 1, self.check_knock_results, (knock,))        
                    
        finally:
            self.scheduler.enter(self.config.interval, 1, self.progress_active_knocks)

    def check_knock_results(self, knock:ActiveKnock):
        self.logger.debug(f"Checking result for knock with ID {knock.knock.id}")
        expected_results = self._api_interactor.get_knock_expected_results(knock.knock.id)
        actual_results = [result.check_result(exit_code=knock.exit_code, output=knock.output) for result in expected_results]
        if all(actual_results):
            self._api_interactor.create_or_update_test_component_status(knock.test.id, knock.knock.id, ComponentStatus.SUCCESS)
        else:
            self._api_interactor.create_or_update_test_component_status(knock.test.id, knock.knock.id, ComponentStatus.FAILURE)
    
