import logging
from typing import Annotated, Dict
from uuid import UUID

from statemachine.exceptions import TransitionNotAllowed
from fastapi import Depends
from controller.statemachines import TestStateMachine
from controller.state import ControllerState, ControllerStateFactory
from shared.models.objects import Test
import warnings

class ActiveStateMachines:
    _active_state_machines: Dict[UUID, TestStateMachine] = {}

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def add_state_machine_for_test(self, test: Test) -> TestStateMachine:
        self.logger.debug(f"Adding state machine for test {test.id}")
        state_machine = TestStateMachine(test)
        self._active_state_machines[test.id] = state_machine
        return state_machine

    def get_state_machine(self, test_id: UUID) -> TestStateMachine:
        return self._active_state_machines.get(test_id, None)
    
    def remove_state_machine(self, test_id: UUID) -> None:
        self.logger.debug(f"Removing state machine for test {test_id}")
        self._active_state_machines.pop(test_id, None)

    async def cycle_state_machines(self) -> None:
        to_remove = []
        for test_id, state_machine in self._active_state_machines.items():
            self.logger.debug(f"Cycling state machine for test {test_id}")
            try:
                await state_machine.cycle()
                self.logger.debug(f"Cycled state machine for test {test_id} to {state_machine.current_state}")
            except TransitionNotAllowed as e:
                self.logger.debug(f"Cycle not allowed for {test_id} in {state_machine.current_state}")
                continue
            except Exception as ex:
                self.logger.exception(f"Error cycling state machine for test {test_id}: {ex}")
            if state_machine.current_state.final:
                to_remove.append(test_id)
        for test_id in to_remove:
            try:
                self.logger.debug(f"Removing state machine for test {test_id} as it is in a final state: {self._active_state_machines[test_id].current_state}")
                self.remove_state_machine(test_id)
            except Exception as ex:
                self.logger.exception(f"Error removing state machine for test {test_id}: {ex}")


class ActiveStateMachinesFactory:
    _active_state_machines: ActiveStateMachines = None

    @classmethod
    def get_active_state_machines(cls) -> ActiveStateMachines:
        if not cls._active_state_machines:
            cls._active_state_machines = ActiveStateMachines()
        return cls._active_state_machines
    
ActiveStateMachinesDependency = Annotated[ActiveStateMachines, Depends(ActiveStateMachinesFactory.get_active_state_machines)]
ControllerStateDependency = Annotated[ControllerState, Depends(ControllerStateFactory.get_state)]