from uuid import UUID
from fastapi.testclient import TestClient
from controller.controller import api
import pytest

from controller.state import ControllerStateFactory
from shared.models.objects import Knocker

@pytest.fixture()
def client():
    with TestClient(api) as client:
        yield client

class TestV1API:
    @classmethod
    def setup_class(cls):
        state = ControllerStateFactory.get_state()
        state._knockers[UUID("00000000-0000-0000-0000-000000000001")] = Knocker(id=UUID("00000000-0000-0000-0000-000000000001"), name="test_knocker", description="test_description")
        state._knockers[UUID("00000000-0000-0000-0000-000000000002")] = Knocker(id=UUID("00000000-0000-0000-0000-000000000002"), name="test_knocker_for_delete", description="test_description")
        state._knockers[UUID("00000000-0000-0000-0000-000000000003")] = Knocker(id=UUID("00000000-0000-0000-0000-000000000003"), name="test_knocker_for_update", description="test_description")


    def test_list_knockers(self, client):
        response = client.get("/api/v1/knockers")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    def test_get_knocker_by_id(self, client):
        response = client.get("/api/v1/knockers/00000000-0000-0000-0000-000000000001")
        assert response.status_code == 200
        assert response.json()["id"] == "00000000-0000-0000-0000-000000000001"

    def test_create_knocker(self, client):
        response = client.post("/api/v1/knockers", json={"name": "test_knocker_for_create", "description": "test_description"})
        assert response.status_code == 200
        assert response.json()["name"] == "test_knocker_for_create"
        assert response.json()["description"] == "test_description"

    def test_update_knocker(self, client):
        response = client.put("/api/v1/knockers/00000000-0000-0000-0000-000000000003", json={"id": "00000000-0000-0000-0000-000000000003", "name": "test_knocker_for_update", "description": "UPDATED"})
        assert response.status_code == 200
        assert response.json()["description"] == "UPDATED"

    def test_delete_knocker(self, client):
        response = client.delete("/api/v1/knockers/00000000-0000-0000-0000-000000000002")
        assert response.status_code == 200
        get_response = client.get("/v1/knockers/00000000-0000-0000-0000-000000000002")
        assert get_response.status_code == 404

    def test_knocker_checkin(self, client):
        response = client.post("/api/v1/knockers/00000000-0000-0000-0000-000000000001/checkin")
        assert response.status_code == 200
        get_response = client.get("/api/v1/knockers/00000000-0000-0000-0000-000000000001")
        assert get_response.json()["last_seen"] is not None