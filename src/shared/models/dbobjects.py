from datetime import datetime
import sqlalchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Dict, List, Optional
from uuid import UUID

from shared.models.enums import MonitorType, ResultType, TestStatus
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from shared.models.objects import Knock, Knocker, Monitor, Response, ResponseExpectation, Result, Runner, TestComponentStatus, TestConfiguration

class Base(DeclarativeBase):
    pass

## Knock Objects

class DBKnocker(Base):
    __tablename__ = 'knockers'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Mapped[Optional[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    last_seen: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)


knock_results = sqlalchemy.Table(
    'knock_results',
    Base.metadata,
    sqlalchemy.Column('knock_id', sqlalchemy.String, sqlalchemy.ForeignKey('knocks.id')),
    sqlalchemy.Column('result_id', sqlalchemy.String, sqlalchemy.ForeignKey('results.id'))
)
class DBKnock(Base):
    __tablename__ = 'knocks'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Mapped[Optional[str]] = mapped_column(sqlalchemy.String)
    runner_id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, sqlalchemy.ForeignKey('runners.id'))
    runner: Mapped["Runner"] = relationship("DBRunner")
    command: Mapped[str] = mapped_column(sqlalchemy.String)
    results: Mapped[List["Result"]] = relationship("DBResult", secondary="knock_results")

class DBRunner(Base):
    __tablename__ = 'runners'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Mapped[Optional[str]] = mapped_column(sqlalchemy.String)
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
    description: Mapped[Optional[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    type: Mapped[MonitorType] = mapped_column(sqlalchemy.Enum(MonitorType))

class DBResponse(Base):
    __tablename__ = 'responses'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Mapped[Optional[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    monitor_id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, sqlalchemy.ForeignKey('monitors.id'))
    monitor: Mapped["Monitor"] = relationship("DBMonitor")
    monitor_parameters: Mapped[Dict[str, str]] = mapped_column(sqlalchemy.JSON)

class DBResponseExpectation(Base):
    __tablename__ = 'response_expectations'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    type: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    value: Mapped[str] = mapped_column(sqlalchemy.String)

## Test Objects
    
test_knocks = sqlalchemy.Table(
    'test_knocks',
    Base.metadata,
    sqlalchemy.Column('test_configuration_id', sqlalchemy.String, sqlalchemy.ForeignKey('test_configurations.id')),
    sqlalchemy.Column('knock_id', sqlalchemy.String, sqlalchemy.ForeignKey('knocks.id'))
)
test_response_expectations = sqlalchemy.Table(
    'test_response_expectations',
    Base.metadata,
    sqlalchemy.Column('test_configuration_id', sqlalchemy.String, sqlalchemy.ForeignKey('test_configurations.id')),
    sqlalchemy.Column('response_expectation_id', sqlalchemy.String, sqlalchemy.ForeignKey('response_expectations.id'))
)
    
class DBTestConfiguration(Base):
    __tablename__ = 'test_configurations'

    name: Mapped[str] = mapped_column(sqlalchemy.String)
    description: Mapped[Optional[str]] = mapped_column(sqlalchemy.String)
    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    knocks: Mapped[List["Knock"]] = relationship("DBKnock", secondary="test_knocks")
    response_expectations: Mapped[List["ResponseExpectation"]] = relationship("DBResponseExpectation", secondary="test_response_expectations")

class DBTestKnockStatus(Base):
    __tablename__ = 'test_knock_statuses'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    status: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    knock_id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, sqlalchemy.ForeignKey('knocks.id'))
    knock: Mapped["Knock"] = relationship("DBKnock")
    updated: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)

class DBTestResponseStatus(Base):
    __tablename__ = 'test_response_statuses'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    status: Mapped[ResultType] = mapped_column(sqlalchemy.Enum(ResultType))
    response_id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, sqlalchemy.ForeignKey('responses.id'))
    response: Mapped["Response"] = relationship("DBResponse")
    updated: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)
    

test_knock_statuses = sqlalchemy.Table(
    'test_knock_status_relationships',
    Base.metadata,
    sqlalchemy.Column('test_id', sqlalchemy.String, sqlalchemy.ForeignKey('tests.id')),
    sqlalchemy.Column('knock_status_id', sqlalchemy.String, sqlalchemy.ForeignKey('test_knock_statuses.id'))
)
test_response_statuses = sqlalchemy.Table(
    'test_response_status_relationships',
    Base.metadata,
    sqlalchemy.Column('test_id', sqlalchemy.String, sqlalchemy.ForeignKey('tests.id')),
    sqlalchemy.Column('response_status_id', sqlalchemy.String, sqlalchemy.ForeignKey('test_response_statuses.id'))
)
class DBTest(Base):
    __tablename__ = 'tests'

    id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, primary_key=True)
    configuration_id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, sqlalchemy.ForeignKey('test_configurations.id'))
    configuration: Mapped["TestConfiguration"] = relationship("DBTestConfiguration")
    knocker_id: Mapped[UUID] = mapped_column(sqlalchemy.UUID, sqlalchemy.ForeignKey('knockers.id'))
    knocker: Mapped["Knocker"] = relationship("DBKnocker")
    started: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)
    ended: Mapped[datetime] = mapped_column(sqlalchemy.DateTime)
    status: Mapped[TestStatus] = mapped_column(sqlalchemy.Enum(TestStatus))
    knock_statuses: Mapped[List["TestComponentStatus"]] = relationship("DBTestKnockStatus", secondary="test_knock_status_relationships")
    response_statuses: Mapped[List["TestComponentStatus"]] = relationship("DBTestResponseStatus", secondary="test_response_status_relationships")