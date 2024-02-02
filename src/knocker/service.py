import asyncio
from dataclasses import dataclass, asdict
from logging import getLogger
import sched
from typing import Dict, List
from uuid import UUID

import requests

from shared.models.objects import Test, Knock, TestConfiguration, TestComponentStatus, Runner
from shared.models.apiobjects import NewTestComponentStatus, UpdatedTestComponentStatus
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

    def checkin(self) -> List[Test]:
        self.logger.info(f"Checking in with controller")
        response = self.send_post_request(f"knockers/{self.identity}/checkin", {})
        if response.status_code != 200:
            self.logger.error(f"Failed to check in with controller: [{response.status_code}] {response.text}")
            return []
        else:
            self.logger.debug(f"Successfully checked in with controller")
            return [Test(**test) for test in response.json()]
        
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

class KnockerService:
    def __init__(self, config: KnockerConfig):
        self.config = config
        self.scheduler = sched.scheduler()
        self.knocks: Dict[UUID, Knock] = {}
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
            configuration = self._api_interactor.get_test_config_by_id(test.configuration_id)
            if configuration is None:
                self.logger.error(f"Failed to get test configuration for test ID {test.id}")
                continue
            for knock_id in configuration.knock_ids:
                if knock_id not in self.knocks:
                    knock = self._api_interactor.get_knock_by_id(knock_id)
                    if knock is None:
                        self.logger.error(f"Failed to get knock by ID {knock_id}")
                        continue
                    runner = self._api_interactor.get_runner_by_id(knock.runner_id)
                    self.knocks[knock_id] = ActiveKnock(knock=knock, runner=runner)
                    self.logger.debug(f"Added knock with ID {knock_id} to active state")

    def progress_active_knocks(self):
        try:
            for knock_id, knock in self.knocks.items():
                if not knock.current_state.final:
                    knock.cycle()
                else:
                    self.logger.debug(f"Knock with ID {knock_id} is already complete")
        finally:
            self.scheduler.enter(self.config.interval, 1, self.progress_active_knocks)

    