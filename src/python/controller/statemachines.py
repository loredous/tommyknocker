import datetime
from typing import Any, List
from statemachine import State, StateMachine

from controller.state import ControllerStateFactory
from shared.models.objects import Test, TestConfiguration, ResponseExpectation, TestComponentStatus
from shared.models.enums import ComponentStatus, ComponentType, TestStatus
from controller.response import ExpectedResponse
from shared.models.apiobjects import UpdatedTestComponentStatus
from logging import getLogger

class TestStateMachine(StateMachine):
    pending = State(initial=True)
    knocking = State()
    checking = State()
    success = State(final=True)
    failure = State(final=True)
    error = State(final=True)

    test: Test = None

    expected_responses: List[ExpectedResponse]

    cycle = (pending.to(knocking, cond="picked_up") | knocking.to(checking, cond="knocking_complete") | checking.to(success, cond="check_successful"))
    failed = (checking.to(failure),)
    errored = (pending.to(error) | knocking.to(error) | checking.to(error))

    def __init__(self, test: Test, model: Any = None, state_field: str = "state", start_value: Any = None, rtc: bool = True, allow_event_without_transition: bool = False):
        super().__init__(model, state_field, start_value, rtc, allow_event_without_transition)
        self.logger = getLogger(__name__)
        self.expected_responses = []
        self.test = test
        self.controller_state = ControllerStateFactory.get_state()

    def picked_up(self) -> bool:
        config = self.controller_state.get_test_configuration_by_id(self.test.configuration_id)
        tc_statuses = [self.controller_state.get_test_component_status_by_id(component_id) for component_id in self.test.component_status_ids]
        if len(tc_statuses) == len(config.knock_ids):
            return True
        
    def on_enter_knocking(self):

        self.test = self.controller_state.get_test_by_id(self.test.id)
        self.test.started = datetime.datetime.utcnow()
        self.test.status = TestStatus.KNOCKING
        self.controller_state.update_test(self.test.id, self.test)
    
    def knocking_complete(self) -> bool:
        tc_statuses = [self.controller_state.get_test_component_status_by_id(component_id) for component_id in self.test.component_status_ids]
        test_config = self.controller_state.get_test_configuration_by_id(self.test.configuration_id)
        if len(tc_statuses) == len(test_config.knock_ids):
            return all(tc_status.status == ComponentStatus.SUCCESS for tc_status in tc_statuses)
        
    def on_enter_checking(self):
        self.test = self.controller_state.get_test_by_id(self.test.id)
        self.test.status = TestStatus.CHECKING
        self.controller_state.update_test(self.test.id, self.test)
        self.populate_response_testcomponents()
    
    def populate_response_testcomponents(self):
        self.test = self.controller_state.get_test_by_id(self.test.id)
        config = self.controller_state.get_test_configuration_by_id(self.test.configuration_id)
        response_expectations = [self.controller_state.get_response_expectation_by_id(response_expectation) for response_expectation in config.response_expectation_ids]
        for expectation in response_expectations:
            component_status = TestComponentStatus(component_id=expectation.response_id, component_type=ComponentType.RESPONSE, status=ComponentStatus.PENDING)
            self.controller_state.create_test_component_status(component_status)
            self.controller_state.add_test_component_status(self.test.id, component_status.id)
            self.expected_responses.append(ExpectedResponse(expectation))

    def check_successful(self) -> bool:
        self.check_responses()
        self.test = self.controller_state.get_test_by_id(self.test.id)
        tc_statuses = [self.controller_state.get_test_component_status_by_id(component_id) for component_id in self.test.component_status_ids]
        if all(tc_status.status == ComponentStatus.SUCCESS for tc_status in tc_statuses):
            self.test.ended = datetime.datetime.utcnow()
            self.test.status = TestStatus.SUCCESS
        elif any(tc_status.status == ComponentStatus.ERROR for tc_status in tc_statuses):
            self.send("errored")
            self.test.ended = datetime.datetime.utcnow()
            self.test.status = TestStatus.ERROR
        elif any(tc_status.status == ComponentStatus.FAILURE for tc_status in tc_statuses):
            self.send("failed")
            self.test.ended = datetime.datetime.utcnow()
            self.test.status = TestStatus.FAILURE
        self.controller_state.update_test(self.test.id, self.test)
        return self.test.status == TestStatus.SUCCESS
    
    def check_responses(self):
        component_statuses = self.controller_state.get_test_component_statuses_by_test_id(self.test.id)
        for expected_response in self.expected_responses:
            try:
                component_status = [status for status in component_statuses if status.component_id == expected_response.expectation.response_id].pop()
                if component_status.status not in [ComponentStatus.FAILURE, ComponentStatus.SUCCESS, ComponentStatus.ERROR]:
                    status = UpdatedTestComponentStatus(status=ComponentStatus.ERROR)
                    try:
                        if expected_response.check_response():
                            status.status = ComponentStatus.SUCCESS
                        elif expected_response.response.timeout < (datetime.datetime.utcnow() - self.test.started).seconds:
                            status.status = ComponentStatus.FAILURE
                    except Exception as e:
                        self.logger.exception("Exception occurred while checking response", e)
                        status.status = ComponentStatus.ERROR
                    self.controller_state.update_test_component_status(component_status.id, status)
            except IndexError:
                self.logger.error(f"Expected response {expected_response.response.id} not found in component statuses")
                pass