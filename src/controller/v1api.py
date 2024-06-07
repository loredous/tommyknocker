from dataclasses import asdict
import datetime
from typing import List
from uuid import UUID
from fastapi import APIRouter, BackgroundTasks

from controller.state import ControllerState, ControllerStateFactory
import shared.models.objects as StateObjects
import shared.models.apiobjects as APIObjects
from shared.models.enums import ComponentStatus, TestStatus
from controller.dependency import ActiveStateMachinesDependency, ControllerStateDependency

v1APIRouter = APIRouter(prefix="/api/v1")
#controller_state: ControllerState = ControllerStateFactory.get_state()

#region Knocker Management

@v1APIRouter.get("/knockers", tags=["Knockers"])
def list_knockers(controller_state: ControllerStateDependency) -> List[StateObjects.Knocker]:
    return controller_state.list_knockers()

@v1APIRouter.get("/knockers/{id}", tags=["Knockers"])
def get_knocker_by_id(id: UUID, controller_state: ControllerStateDependency) -> StateObjects.Knocker:
    return controller_state.get_knocker_by_id(id)

@v1APIRouter.post("/knockers", tags=["Knockers"])
def create_knocker(knocker: APIObjects.NewKnocker, controller_state: ControllerStateDependency) -> StateObjects.Knocker:
    return controller_state.create_knocker(StateObjects.Knocker(**asdict(knocker)))

@v1APIRouter.put("/knockers/{id}", tags=["Knockers"])
def update_knocker(id: UUID, controller_state: ControllerStateDependency, knocker: APIObjects.UpdatedKnocker) -> StateObjects.Knocker:
    return controller_state.update_knocker(id, knocker)

@v1APIRouter.delete("/knockers/{id}", tags=["Knockers"])
def delete_knocker(id: UUID, controller_state: ControllerStateDependency) -> None:
    controller_state.delete_knocker(id)

@v1APIRouter.post("/knockers/{id}/checkin", tags=["Knockers"])
def knocker_checkin(id: UUID,  controller_state: ControllerStateDependency) -> List[StateObjects.Test]:
    controller_state.knocker_checkin(id)
    return controller_state.get_tests_by_knocker_id(id)
    
#endregion Knocker Management
    
#region Knock Management
@v1APIRouter.get("/knocks", tags=["Knocks"])
def list_knocks(controller_state: ControllerStateDependency) -> List[StateObjects.Knock]:
    return controller_state.list_knocks()

@v1APIRouter.get("/knocks/{id}", tags=["Knocks"])
def get_knock_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.Knock:
    return controller_state.get_knock_by_id(id)

@v1APIRouter.post("/knocks", tags=["Knocks"])
def create_knock(controller_state: ControllerStateDependency, knock: APIObjects.NewKnock) -> StateObjects.Knock:
    return controller_state.create_knock(StateObjects.Knock(**asdict(knock)))

@v1APIRouter.put("/knocks/{id}", tags=["Knocks"])
def update_knock(controller_state: ControllerStateDependency, id: UUID, knock: APIObjects.UpdatedKnock) -> StateObjects.Knock:
    return controller_state.update_knock(id, knock)

@v1APIRouter.delete("/knocks/{id}", tags=["Knocks"])
def delete_knock(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_knock(id)

#endregion Knock Management
    
#region Runner Management

@v1APIRouter.get("/runners", tags=["Runners"])
def list_runners(controller_state: ControllerStateDependency, ) -> List[StateObjects.Runner]:
    return controller_state.list_runners()

@v1APIRouter.get("/runners/{id}", tags=["Runners"])
def get_runner_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.Runner:
    return controller_state.get_runner_by_id(id)

@v1APIRouter.post("/runners", tags=["Runners"])
def create_runner(controller_state: ControllerStateDependency, runner: APIObjects.NewRunner) -> StateObjects.Runner:
    return controller_state.create_runner(StateObjects.Runner(**asdict(runner)))

@v1APIRouter.put("/runners/{id}", tags=["Runners"])
def update_runner(controller_state: ControllerStateDependency, id: UUID, runner: APIObjects.UpdatedRunner) -> StateObjects.Runner:
    return controller_state.update_runner(id, runner)

@v1APIRouter.delete("/runners/{id}", tags=["Runners"])
def delete_runner(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_runner(id)

#endregion Runner Management
    
#region Result Management

@v1APIRouter.get("/results", tags=["Results"])
def list_results(controller_state: ControllerStateDependency, ) -> List[StateObjects.Result]:
    return controller_state.list_results()

@v1APIRouter.get("/results/{id}", tags=["Results"])
def get_result_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.Result:
    return controller_state.get_result_by_id(id)

@v1APIRouter.post("/results", tags=["Results"])
def create_result(controller_state: ControllerStateDependency, result: APIObjects.NewResult) -> StateObjects.Result:
    return controller_state.create_result(StateObjects.Result(**asdict(result)))

@v1APIRouter.put("/results/{id}", tags=["Results"])
def update_result(controller_state: ControllerStateDependency, id: UUID, result: APIObjects.UpdatedResult) -> StateObjects.Result:
    return controller_state.update_result(id, result)

@v1APIRouter.delete("/results/{id}", tags=["Results"])
def delete_result(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_result(id)

#endregion Result Management

#region Monitor Management

@v1APIRouter.get("/monitors", tags=["Monitors"])
def list_monitors(controller_state: ControllerStateDependency, ) -> List[StateObjects.Monitor]:
    return controller_state.list_monitors()

@v1APIRouter.get("/monitors/{id}", tags=["Monitors"])
def get_monitor_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.Monitor:
    return controller_state.get_monitor_by_id(id)

@v1APIRouter.post("/monitors", tags=["Monitors"])
def create_monitor(controller_state: ControllerStateDependency, monitor: APIObjects.NewMonitor) -> StateObjects.Monitor:
    return controller_state.create_monitor(StateObjects.Monitor(**asdict(monitor)))

@v1APIRouter.put("/monitors/{id}", tags=["Monitors"])
def update_monitor(controller_state: ControllerStateDependency, id: UUID, monitor: APIObjects.UpdatedMonitor) -> StateObjects.Monitor:
    return controller_state.update_monitor(id, monitor)

@v1APIRouter.delete("/monitors/{id}", tags=["Monitors"])
def delete_monitor(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_monitor(id)

#endregion Monitor Management

#region Response Management

@v1APIRouter.get("/responses", tags=["Responses"])
def list_responses(controller_state: ControllerStateDependency, ) -> List[StateObjects.Response]:
    return controller_state.list_responses()

@v1APIRouter.get("/responses/{id}", tags=["Responses"])
def get_response_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.Response:
    return controller_state.get_response_by_id(id)

@v1APIRouter.post("/responses", tags=["Responses"])
def create_response(controller_state: ControllerStateDependency, response: APIObjects.NewResponse) -> StateObjects.Response:
    return controller_state.create_response(StateObjects.Response(**asdict(response)))

@v1APIRouter.put("/responses/{id}", tags=["Responses"])
def update_response(controller_state: ControllerStateDependency, id: UUID, response: APIObjects.UpdatedResponse) -> StateObjects.Response:
    return controller_state.update_response(id, response)

@v1APIRouter.delete("/responses/{id}", tags=["Responses"])
def delete_response(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_response(id)

#endregion Response Management

#region ResponseExpectation Management

@v1APIRouter.get("/response-expectations", tags=["ResponseExpectations"])
def list_response_expectations(controller_state: ControllerStateDependency, ) -> List[StateObjects.ResponseExpectation]:
    return controller_state.list_response_expectations()

@v1APIRouter.get("/response-expectations/{id}", tags=["ResponseExpectations"])
def get_response_expectation_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.ResponseExpectation:
    return controller_state.get_response_expectation_by_id(id)

@v1APIRouter.post("/response-expectations", tags=["ResponseExpectations"])
def create_response_expectation(controller_state: ControllerStateDependency, response_expectation: APIObjects.NewResponseExpectation) -> StateObjects.ResponseExpectation:
    return controller_state.create_response_expectation(StateObjects.ResponseExpectation(**asdict(response_expectation)))

@v1APIRouter.put("/response-expectations/{id}", tags=["ResponseExpectations"])
def update_response_expectation(controller_state: ControllerStateDependency, id: UUID, response_expectation: APIObjects.UpdatedResponseExpectation) -> StateObjects.ResponseExpectation:
    return controller_state.update_response_expectation(id, response_expectation)

@v1APIRouter.delete("/response-expectations/{id}", tags=["ResponseExpectations"])
def delete_response_expectation(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_response_expectation(id)

#endregion ResponseExpectation Management

#region TestConfiguration Management

@v1APIRouter.get("/test-configurations", tags=["TestConfigurations"])
def list_test_configurations(controller_state: ControllerStateDependency, ) -> List[StateObjects.TestConfiguration]:
    return controller_state.list_test_configurations()

@v1APIRouter.get("/test-configurations/{id}", tags=["TestConfigurations"])
def get_test_configuration_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.TestConfiguration:
    return controller_state.get_test_configuration_by_id(id)

@v1APIRouter.post("/test-configurations", tags=["TestConfigurations"])
def create_test_configuration(controller_state: ControllerStateDependency, test_configuration: APIObjects.NewTestConfiguration) -> StateObjects.TestConfiguration:
    return controller_state.create_test_configuration(StateObjects.TestConfiguration(**asdict(test_configuration)))

@v1APIRouter.put("/test-configurations/{id}", tags=["TestConfigurations"])
def update_test_configuration(controller_state: ControllerStateDependency, id: UUID, test_configuration: APIObjects.UpdatedTestConfiguration) -> StateObjects.TestConfiguration:
    return controller_state.update_test_configuration(id, test_configuration)

@v1APIRouter.delete("/test-configurations/{id}", tags=["TestConfigurations"])
def delete_test_configuration(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_test_configuration(id)

#endregion TestConfiguration Management

#region TestComponentStatus Management

@v1APIRouter.get("/test-component-statuses", tags=["TestComponentStatuses"])
def list_test_component_statuses(controller_state: ControllerStateDependency, ) -> List[StateObjects.TestComponentStatus]:
    return controller_state.list_test_component_statuses()

@v1APIRouter.get("/test-component-statuses/{id}", tags=["TestComponentStatuses"])
def get_test_component_status_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.TestComponentStatus:
    return controller_state.get_test_component_status_by_id(id)

@v1APIRouter.post("/test-component-statuses", tags=["TestComponentStatuses"])
def create_test_component_status(controller_state: ControllerStateDependency, test_component_status: APIObjects.NewTestComponentStatus) -> StateObjects.TestComponentStatus:
    return controller_state.create_test_component_status(StateObjects.TestComponentStatus(**asdict(test_component_status)))

@v1APIRouter.put("/test-component-statuses/{id}", tags=["TestComponentStatuses"])
def update_test_component_status(controller_state: ControllerStateDependency, id: UUID, test_component_status: APIObjects.UpdatedTestComponentStatus) -> StateObjects.TestComponentStatus:
    return controller_state.update_test_component_status(id, test_component_status)

@v1APIRouter.delete("/test-component-statuses/{id}", tags=["TestComponentStatuses"])
def delete_test_component_status(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_test_component_status(id)

@v1APIRouter.get("/test-component-statuses/by_test/{test_id}", tags=["TestComponentStatuses"])
def get_test_component_statuses_by_test_id(controller_state: ControllerStateDependency, test_id: UUID) -> List[StateObjects.TestComponentStatus]:
    return controller_state.get_test_component_statuses_by_test_id(test_id)

#endregion TestComponentStatus Management

#region Test Management

@v1APIRouter.get("/tests", tags=["Tests"])
def list_tests(controller_state: ControllerStateDependency, ) -> List[StateObjects.Test]:
    return controller_state.list_tests()

@v1APIRouter.get("/tests/{id}", tags=["Tests"])
def get_test_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.Test:
    return controller_state.get_test_by_id(id)

@v1APIRouter.post("/tests", tags=["Tests"])
def create_test(controller_state: ControllerStateDependency, active_state_machines: ActiveStateMachinesDependency, test: APIObjects.NewTest) -> StateObjects.Test:
    new_test = controller_state.create_test(StateObjects.Test(**asdict(test)))
    active_state_machines.add_state_machine_for_test(new_test)
    return new_test

@v1APIRouter.delete("/tests/{id}", tags=["Tests"])
def delete_test(controller_state: ControllerStateDependency, active_state_machines: ActiveStateMachinesDependency, id: UUID) -> None:
    controller_state.delete_test(id)
    active_state_machines.remove_state_machine(id)

@v1APIRouter.put("/tests/{id}/add_component_status/{status_id}", tags=["Tests"])
def add_test_component_status(controller_state: ControllerStateDependency, id: UUID, status_id: UUID) -> StateObjects.Test:
    return controller_state.add_test_component_status(id, status_id)

@v1APIRouter.get("/tests/by_status/{status}", tags=["Tests"])
def get_tests_by_status(controller_state: ControllerStateDependency, status: TestStatus) -> List[StateObjects.Test]:
    return controller_state.get_tests_by_status(status)

@v1APIRouter.get("/tests/running/", tags=["Tests"])
def get_running_tests(controller_state: ControllerStateDependency) -> List[StateObjects.Test]:
    return controller_state.get_running_tests()

@v1APIRouter.get("/tests/complete/", tags=["Tests"])
def get_complete_tests(controller_state: ControllerStateDependency) -> List[StateObjects.Test]:
    return controller_state.get_completed_tests()
#endregion Test Management

#region TestSuite Management

@v1APIRouter.get("/test-suites", tags=["TestSuites"])
def list_test_suites(controller_state: ControllerStateDependency, ) -> List[StateObjects.TestSuite]:
    return controller_state.list_test_suites()

@v1APIRouter.get("/test-suites/{id}", tags=["TestSuites"])
def get_test_suite_by_id(controller_state: ControllerStateDependency, id: UUID) -> StateObjects.TestSuite:
    return controller_state.get_test_suite_by_id(id)

@v1APIRouter.post("/test-suites", tags=["TestSuites"])
def create_test_suite(controller_state: ControllerStateDependency, test_suite: APIObjects.NewTestSuite) -> StateObjects.TestSuite:
    return controller_state.create_test_suite(StateObjects.TestSuite(**asdict(test_suite)))

@v1APIRouter.put("/test-suites/{id}", tags=["TestSuites"])
def update_test_suite(controller_state: ControllerStateDependency, id: UUID, test_suite: APIObjects.UpdatedTestSuite) -> StateObjects.TestSuite:
    return controller_state.update_test_suite(id, test_suite)

@v1APIRouter.delete("/test-suites/{id}", tags=["TestSuites"])
def delete_test_suite(controller_state: ControllerStateDependency, id: UUID) -> None:
    controller_state.delete_test_suite(id)

#endregion TestSuite Management
