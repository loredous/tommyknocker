from typing import Any
from statemachine import State, StateMachine

from shared.models.objects import Test
from shared.models.enums import TestStatus

class TestStateMachine(StateMachine):
    pending = State(initial=True)
    knocking = State()
    checking = State()
    success = State(final=True)
    failure = State(final=True)
    error = State(final=True)

    test: Test = None

    cycle = pending.to(knocking, cond="picked_up") | knocking.to(checking, cond="knocking_complete") | checking.to(success, cond="check_complete") | checking.to(failure, cond="check_failed")
    fail = pending.to(error) | knocking.to(error) | checking.to(error)

    def __init__(self, test: Test, model: Any = None, state_field: str = "state", start_value: Any = None, rtc: bool = True, allow_event_without_transition: bool = False):
        super().__init__(model, state_field, start_value, rtc, allow_event_without_transition)
        self.test = test

    def picked_up(self) -> bool:
        self.test = Test.from_db(self.test.id)
        return self.test.status == TestStatus.KNOCKING
    
    def knocking_complete(self) -> bool:
        self.test = Test.from_db(self.test.id)
        return self.test.status == TestStatus.CHECKING
    
    