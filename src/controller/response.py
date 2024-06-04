from dataclasses import dataclass
from typing import Optional
from shared.models.objects import Response, Monitor, ResponseExpectation
from controller.monitor import MockMonitor, ElasticsearchMonitor
from controller.state import ControllerStateFactory

class ExpectedResponse():
    response: ResponseExpectation

    def __init__(self, expectation: ResponseExpectation):
        self.expectation = expectation
        self.state = ControllerStateFactory.get_state()


    def check_response(self) -> bool:
        response = self.state.get_response_by_id(self.expectation.response_id)
        monitor = self.state.get_monitor_by_id(response.monitor_id)
        if monitor.type == "elasticsearch":
            monitor = ElasticsearchMonitor(monitor)
        elif monitor.type == "mock":
            monitor = MockMonitor(monitor)
        else:
            raise ValueError(f"Monitor type {monitor.type} is not supported")
        results = monitor.query_monitor(**response.monitor_parameters)
        return bool(results) == self.expectation.expected
        
        