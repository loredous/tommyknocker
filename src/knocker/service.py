import asyncio
from dataclasses import dataclass
from logging import getLogger
import sched

import requests


@dataclass
class KnockerConfig:
    controller: str
    port: int
    interval: int
    identity: str

    def __str__(self) -> str:
        return str(vars(self))

class KnockerService:
    def __init__(self, config: KnockerConfig):
        self.config = config
        self.scheduler = sched.scheduler()
        self.logger = getLogger("KnockerService")
        self.logger.info("Initialized knocker service")
        self.logger.debug(f"Config: {self.config}")

    def run(self):
        self.logger.info("Running knocker service")
        self.checkin()
        self.scheduler.run()

        
    def checkin(self):
        self.logger.info("Checking in with controller")
        try:
            response = requests.post(f"http://{self.config.controller}:{self.config.port}/api/v1/knockers/{self.config.identity}/checkin")
            if response.status_code != 200:
                self.logger.error(f"Failed to check in with controller: [{response.status_code}] {response.text}")
            else:
                self.logger.debug(f"Successfully checked in with controller")
        except Exception as e:
            self.logger.error(f"Failed to check in with controller: {e}")
        finally:
            self.scheduler.enter(self.config.interval, 1, self.checkin)
        