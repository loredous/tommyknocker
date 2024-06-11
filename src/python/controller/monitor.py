from dataclasses import dataclass
import json
import logging
from typing import List, Optional
from shared.models.objects import Monitor, Response
from shared.models.enums import MonitorType
from abc import ABC, abstractmethod
from elasticsearch import Elasticsearch

class MonitorBase(ABC):
    monitor: Monitor

    def initialize_logging(self):
        self.logger = logging.getLogger(f"{self.monitor.name} Monitor")

    @abstractmethod
    def check_monitor_status(self) -> bool:
        pass

    @abstractmethod
    def query_monitor(self, **kwargs) -> List:
        pass

class MockMonitor(MonitorBase):
    def __init__(self, monitor: Monitor):
        if monitor.type != MonitorType.MOCK:
            raise ValueError("Monitor type must be 'mock' to create MockMonitor")
        self.monitor = monitor
        
    def check_monitor_status(self) -> bool:
        # Mock monitor always returns True
        return self.monitor.config.get("response", True)
    
    def query_monitor(self, **kwargs):

        return json.loads(self.monitor.config.get("query_return", "['Mock return data']"))

class ElasticsearchMonitor(MonitorBase):
    def __init__(self, monitor: Monitor):
        if monitor.type != MonitorType.ELASTICSEARCH:
            raise ValueError("Monitor type must be 'elasticsearch' to create ElasticsearchMonitor")
        self.monitor = monitor
        try:
            self.host = monitor.config["host"]
            self.port = monitor.config.get("port", 9200)
            self.username = monitor.config["username"]
            self.password = monitor.config["password"]
            self.verify_certs = monitor.config.get("verify_certs", True)
            self.elasticsearch = Elasticsearch([f"{self.host}:{self.port}"], http_auth=(self.username, self.password), verify_certs=self.verify_certs) ## TODO: Add API key support
        except KeyError as e:
            raise ValueError(f"Monitor is missing required field {e}")
        
    def check_monitor_status(self) -> bool:
        # Check if Elasticsearch is running
        return self.elasticsearch.ping()
    
    def query_monitor(self, **kwargs):
        try:
            index = kwargs["index"]
            query = kwargs["query"]
            result = self.elasticsearch.search(index=index, body=query)
            if result.get("hits", {}).get('total', 0) != 0:
                return result["hits"]["hits"]
            else:
                return []

        except Exception as e:
            self.logger.exception("Exception occurred while querying Elasticsearch",e)