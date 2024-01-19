from fastapi import FastAPI, APIRouter
from controller.state import ControllerStateFactory, ControllerState
from controller.v1api import v1APIRouter

api = FastAPI()
controller_state: ControllerState = ControllerStateFactory.get_state()
api.include_router(v1APIRouter)