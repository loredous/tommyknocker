import logging
from typing import Any
from statemachine import State, StateMachine
import docker
from shared.models.objects import Knock, Runner


class ActiveKnock(StateMachine):
    """A state machine for tracking the status of knocks and updating their status with the controller"""
    pending = State(initial=True)
    pulling = State()
    running = State()
    complete = State(final=True)
    errored = State(final=True)

    cycle = pending.to(pulling) | pulling.to(running, cond="pull_complete") | running.to(complete, cond="run_complete")
    fail = pending.to(errored) | pulling.to(errored) | running.to(errored)

    pull_complete = False
    container = None
    

    def __init__(self, knock: Knock, runner: Runner, state_field: str = "state", start_value: Any = None, rtc: bool = True, allow_event_without_transition: bool = False):
        super().__init__(None, state_field, start_value, rtc, allow_event_without_transition)
        self.logger = logging.getLogger("ActiveKnock")
        self._docker_client = docker.from_env()
        self.knock = knock
        self.runner = runner
        self.state_message = ""

    def before_cycle(self, event: str, source: State, target: State, message: str = ""):
        self.logger.debug(f"Transitioning {self.knock.id} from {source.name} to {target.name} with message {message}")

    def on_enter_pulling(self, event: str, source: State, target: State, message: str = ""):
        try:
            self._docker_client.images.pull(self.runner.image_name, self.runner.image_tag)
            self.pull_complete = True
        except docker.errors.APIError as err:
            self.logger.error(f"Failed to pull image for knock {self.knock.id}: {err}")
            self.state_message = f"Failed to pull image for knock {self.knock.id}: {err}"
            self.fail()

    def on_enter_running(self, event: str, source: State, target: State, message: str = ""):
        try:
            self.container = self._docker_client.containers.run(self.runner.image_name, self.knock.command, detach=True)
        except docker.errors.APIError as err:
            self.logger.error(f"Failed to run image for knock {self.knock.id}: {err}")
            self.state_message = f"Failed to run image for knock {self.knock.id}: {err}"
            self.fail()

    def run_complete(self) -> bool:
        self.container.reload()
        return self.container.status == "exited"
    
    def on_enter_complete(self, event: str, source: State, target: State, message: str = ""):
        self.logger.info(f"Knock {self.knock.id} complete")
        self.state_message = f"Knock {self.knock.id} complete"
        result = self.container.wait()
        status_code = result.pop("StatusCode")
        stdout = self.container.logs(stdout=True, stderr=False)
        self.container.remove()