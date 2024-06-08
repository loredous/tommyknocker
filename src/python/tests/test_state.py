import pytest
from controller.state import ControllerStateFactory, ControllerState, InMemoryState
import pytest
from uuid import UUID

from controller.errors import NotFoundException
from shared.models.objects import Knocker, Knock, Runner

def test_controller_state_factory_get_state():
    state = ControllerStateFactory.get_state()
    assert isinstance(state, ControllerState)
    assert state is ControllerStateFactory.get_state()
    assert state is ControllerStateFactory.get_state()

def test_controller_state_is_abstract():
    with pytest.raises(TypeError):
        ControllerState()

class TestInMemoryState:
    @pytest.fixture()
    def in_memory_state(self):
        state = InMemoryState()
        state._knockers[UUID("00000000-0000-0000-0000-000000000001")] = Knocker(id=UUID("00000000-0000-0000-0000-000000000001"), name="test_knocker", description="test_description")
        state._knockers[UUID("00000000-0000-0000-0000-000000000002")] = Knocker(id=UUID("00000000-0000-0000-0000-000000000002"), name="test_knocker_for_delete", description="test_description")
        state._knockers[UUID("00000000-0000-0000-0000-000000000003")] = Knocker(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_knocker_for_update", description="test_description")
        state._knocks[UUID("00000000-0000-0000-0000-000000000001")] = Knock(id=UUID("00000000-0000-0000-0000-000000000001"), name="test_knock", runner_id=UUID("00000000-0000-0000-0000-000000000001"), command="test_command")
        state._knocks[UUID("00000000-0000-0000-0000-000000000002")] = Knock(id=UUID("00000000-0000-0000-0000-000000000002"), name="test_knock_for_delete", runner_id=UUID("00000000-0000-0000-0000-000000000001"), command="test_command")
        state._knocks[UUID("00000000-0000-0000-0000-000000000003")] = Knock(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_knock_for_update", runner_id=UUID("00000000-0000-0000-0000-000000000001"), command="test_command")
        state._runners[UUID("00000000-0000-0000-0000-000000000001")] = Runner(id=UUID("00000000-0000-0000-0000-000000000001"), name="test_runner", description="test_description", image_name="test_image_name", image_tag="test_image_tag")
        state._runners[UUID("00000000-0000-0000-0000-000000000002")] = Runner(id=UUID("00000000-0000-0000-0000-000000000002"), name="test_runner_for_delete", description="test_description", image_name="test_image_name", image_tag="test_image_tag")    
        state._runners[UUID("00000000-0000-0000-0000-000000000003")] = Runner(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_runner_for_update", description="test_description", image_name="test_image_name", image_tag="test_image_tag")    
        yield state
        del state

    def test_in_memory_state_is_controller_state(self, in_memory_state):
        assert isinstance(in_memory_state, ControllerState)
    
    def test_list_knockers(self, in_memory_state):
        state = InMemoryState()
        assert isinstance(in_memory_state.list_knockers(), list)

        knocker_id = UUID("00000000-0000-0000-0000-000000000001")
        assert isinstance(in_memory_state.get_knocker_by_id(knocker_id), Knocker)
        assert in_memory_state.get_knocker_by_id(knocker_id).id == knocker_id

    def test_create_knocker(self, in_memory_state):
        knocker = Knocker(id=UUID("00000000-0000-0000-0000-000000000004"), name="test_knocker_for_create", description="test_description")
        assert isinstance(in_memory_state.create_knocker(knocker), Knocker)
        assert isinstance(in_memory_state.get_knocker_by_id(knocker.id), Knocker)
        assert in_memory_state.get_knocker_by_id(knocker.id) == knocker

    def test_update_knocker(self, in_memory_state):
        updated_knocker = Knocker(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_knocker_for_update", description="UPDATED")
        assert isinstance(in_memory_state.update_knocker(updated_knocker.id, updated_knocker), Knocker)
        assert in_memory_state.get_knocker_by_id(updated_knocker.id) == updated_knocker

    def test_delete_knocker(self, in_memory_state):
        knocker_id = UUID("00000000-0000-0000-0000-000000000002")
        in_memory_state.delete_knocker(knocker_id)
        with pytest.raises(NotFoundException):
            in_memory_state.get_knocker_by_id(knocker_id)

    def test_knocker_checkin(self, in_memory_state):
        knocker_id = UUID("00000000-0000-0000-0000-000000000001")
        in_memory_state.knocker_checkin(knocker_id)
        assert in_memory_state.get_knocker_by_id(knocker_id).last_seen is not None

    def test_list_knocks(self, in_memory_state):
        assert isinstance(in_memory_state.list_knocks(), list)

    def test_get_knock_by_id(self, in_memory_state):
        knock_id = UUID("00000000-0000-0000-0000-000000000001")
        assert isinstance(in_memory_state.get_knock_by_id(knock_id), Knock)
        assert in_memory_state.get_knock_by_id(knock_id).id == knock_id

    def test_create_knock(self, in_memory_state):
        knock = Knock(id=UUID("00000000-0000-0000-0000-000000000004"), name="test_knock_for_create", runner_id=UUID("00000000-0000-0000-0000-000000000001"), command="test_command")
        assert isinstance(in_memory_state.create_knock(knock), Knock)
        assert in_memory_state.get_knock_by_id(knock.id) == knock

    def test_update_knock(self, in_memory_state):
        knock = Knock(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_knock_for_update UPDATED", runner_id=UUID("00000000-0000-0000-0000-000000000001"), command="test_command")
        assert isinstance(in_memory_state.update_knock(knock), Knock)
        assert in_memory_state.get_knock_by_id(knock.id) == knock

    def test_delete_knock(self, in_memory_state):
        knock_id = UUID("00000000-0000-0000-0000-000000000002")
        in_memory_state.delete_knock(knock_id)
        with pytest.raises(NotFoundException):
            in_memory_state.get_knock_by_id(knock_id)

    def test_list_runners(self, in_memory_state):
                    assert isinstance(in_memory_state.list_runners(), list)

    def test_get_runner_by_id(self, in_memory_state):
        runner_id = UUID("00000000-0000-0000-0000-000000000001")
        assert isinstance(in_memory_state.get_runner_by_id(runner_id), Runner)
        assert in_memory_state.get_runner_by_id(runner_id).id == runner_id

    def test_create_runner(self, in_memory_state):
        runner = Runner(id=UUID("00000000-0000-0000-0000-000000000004"), name="test_runner_for_create", description="test_description", image_name="test_image_name", image_tag="test_image_tag")
        assert isinstance(in_memory_state.create_runner(runner), Runner)
        assert in_memory_state.get_runner_by_id(runner.id) == runner

    def test_update_runner(self, in_memory_state):
        updated_runner = Runner(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_runner_for_update", description="UPDATED", image_name="test_image_name", image_tag="test_image_tag")
        assert isinstance(in_memory_state.update_runner(updated_runner), Runner)
        assert in_memory_state.get_runner_by_id(updated_runner.id) == updated_runner

    def test_delete_runner(self, in_memory_state):
        runner_id = UUID("00000000-0000-0000-0000-000000000002")
        in_memory_state.delete_runner(runner_id)
        with pytest.raises(NotFoundException):
            in_memory_state.get_runner_by_id(runner_id)