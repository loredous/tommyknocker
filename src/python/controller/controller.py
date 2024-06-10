import asyncio
from datetime import datetime
import logging
from uuid import UUID
from fastapi import FastAPI, APIRouter
from fastapi.concurrency import asynccontextmanager
from controller.state import ControllerStateFactory, InMemoryState, PersistentInMemoryState
from controller.v1api import v1APIRouter
from shared.models.objects import Knocker, Monitor, ResponseExpectation, Runner, Result, ResultType, Knock, TestConfiguration, Test, TestConfiguration, ResultType, Response

from fastapi_utils.tasks import repeat_every

from controller.dependency import ActiveStateMachinesFactory
from controller.settings import app_settings

def seed_data():
    controller_state = ControllerStateFactory.get_state()
    active_state_machines = ActiveStateMachinesFactory.get_active_state_machines()
    knocker = controller_state.create_knocker(Knocker(name="Test Knocker", description="A pre-seeded knocker for testing", last_seen=datetime.now(), id=UUID("00000000-0000-0000-0000-000000000001")))
    runner = controller_state.create_runner(Runner(name="Debian Test Runner", description="A runner for testing, based on the latest Debian image", image_name="debian", image_tag="latest"))
    result_exit_code = controller_state.create_result(Result(type=ResultType.EXIT_CODE, value="0"))
    result_output = controller_state.create_result(Result(type=ResultType.PRESENT_IN_OUTPUT, value="Hello World!"))
    knock = controller_state.create_knock(Knock(name="Test Knock", runner_id=runner.id, command="echo 'Hello World!'", description="A pre-seeded knock for testing", result_ids=[result_exit_code.id, result_output.id]))
    monitor = controller_state.create_monitor(Monitor(name="Test Monitor", description="A pre-seeded monitor for testing", type="mock"))
    response = controller_state.create_response(Response(name="Test Response", description="A pre-seeded response for testing", monitor_id=monitor.id, monitor_parameters={"response": True}))
    response_expectation = controller_state.create_response_expectation(ResponseExpectation(response_id=response.id, expected=True, timeout=90))
    test_configuration = controller_state.create_test_configuration(TestConfiguration(name="Test Configuration", description="A pre-seeded test configuration for testing", knock_ids=[knock.id], response_expectation_ids=[response_expectation.id]))
    test = controller_state.create_test(Test(configuration_id=test_configuration.id, knocker_id=knocker.id))
    active_state_machines.add_state_machine_for_test(test)

if app_settings.debug:
    logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

active_state_machines = ActiveStateMachinesFactory.get_active_state_machines()

async def update_statemachines():
    await asyncio.sleep(5)
    while True:
        logger.debug("Cycling state machines")
        await active_state_machines.cycle_state_machines()
        await asyncio.sleep(5)

@asynccontextmanager
async def lifespan(app: FastAPI):
    update_task = asyncio.get_running_loop().create_task(update_statemachines())
    set_state_type(app_settings.state_type)
    controller_state = ControllerStateFactory.get_state()
    if controller_state.list_knockers == {} and app_settings.seed_for_testing:
        seed_data()
    yield
    update_task.cancel()

def set_state_type(state_type: str):
    match app_settings.state_type:
        case "memory":
            ControllerStateFactory.set_state_type(InMemoryState)
        case "file":
            ControllerStateFactory.set_state_type(PersistentInMemoryState)
        case _:
            ControllerStateFactory.set_state_type(InMemoryState)

api = FastAPI(lifespan=lifespan)


api.include_router(v1APIRouter)


