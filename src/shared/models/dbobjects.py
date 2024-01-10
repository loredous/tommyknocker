from datetime import datetime
import sqlalchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Dict, List, Optional
from uuid import UUID

from shared.models.enums import MonitorType, ResultType, TestStatus
from shared.models.objects import Knock, Knocker, Monitor, Response, ResponseExpectation, Result, Runner, TestComponentStatus, TestConfiguration

class Base(DeclarativeBase):
    pass

## Knock Objects

class DBKnocker(Base):
    __tablename__ = 'knockers'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Optional[Mapped[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    last_seen: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)

class DBKnock(Base):
    __tablename__ = 'knocks'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Optional[Mapped[str]] = mapped_column(sqlalchemy.String)
    runner: Mapped[Runner] = relationship("DBRunner")
    command: Mapped[str] = mapped_column(sqlalchemy.String)
    results: Mapped[List[Result]] = relationship("DBResult")

class DBRunner(Base):
    __tablename__ = 'runners'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Optional[Mapped[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    image_name: Mapped[str] = mapped_column(sqlalchemy.String)
    image_tag: Mapped[str] = mapped_column(sqlalchemy.String)

class DBResult(Base):
    __tablename__ = 'results'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    type: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    value: Mapped[str] = mapped_column(sqlalchemy.String)

## Response Objects
    
class DBMonitor(Base):
    __tablename__ = 'monitors'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Optional[Mapped[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    type: Mapped[MonitorType] = mapped_column(sqlalchemy.Enum(MonitorType))

class DBResponse(Base):
    __tablename__ = 'responses'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Optional[Mapped[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    monitor: Mapped[Monitor] = relationship("DBMonitor")
    monitor_parameters: Mapped[Dict[str, str]] = mapped_column(sqlalchemy.JSON)

class DBResponseExpectation(Base):
    __tablename__ = 'response_expectations'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    type: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    value: Mapped[str] = mapped_column(sqlalchemy.String)

## Test Objects
    
class DBTestConfiguration(Base):
    __tablename__ = 'test_configurations'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Optional[Mapped[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    runner: Mapped[Runner] = relationship("DBRunner")
    knocks: Mapped[List[Knock]] = relationship("DBKnock")
    response_expectations: Mapped[List[ResponseExpectation]] = relationship("DBResponseExpectation")

class DBTestKnockStatus(Base):
    __tablename__ = 'test_knock_statuses'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    status: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    knock: Mapped[Knock] = relationship("DBKnock")
    updated: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)

class DBTestResponseStatus(Base):
    __tablename__ = 'test_response_statuses'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    status: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    response: Mapped[Response] = relationship("DBResponse")
    updated: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)
    
class DBTest(Base):
    __tablename__ = 'tests'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    configuration: Mapped[TestConfiguration] = relationship("DBTestConfgiuration")
    knocker: Mapped[Knocker] = relationship("DBKnocker")
    started: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)
    ended: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)
    status: Mapped[TestStatus] = mapped_column(sqlalchemy.Enum(TestStatus))
    knock_statuses: Mapped[List[TestComponentStatus]] = relationship("DBTestKnockStatus")
    response_statuses: Mapped[List[TestComponentStatus]] = relationship("DBTestResponseStatus")