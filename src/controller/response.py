from dataclasses import dataclass
from typing import Optional
from shared.models.objects import Response, Monitor, ResponseExpectation
from controller.monitor import MockMonitor, ElasticsearchMonitor

class ExpectedResponse():
    response: ResponseExpectation

    def __init__(self, expectation: ResponseExpectation):
        self.expectation = expectation


    def check_response(self) -> bool:
        response = Response.from_db(self.expectation.response_id)
        monitor = Monitor.from_db(response.monitor_id)
        if monitor.type == "elasticsearch":
            monitor = ElasticsearchMonitor(monitor)
        elif monitor.type == "mock":
            monitor = MockMonitor(monitor)
        else:
            raise ValueError(f"Monitor type {monitor.type} is not supported")
        results = monitor.query_monitor(**self.response.monitor_parameters)
        return bool(results) == self.expectation.expected
        
        