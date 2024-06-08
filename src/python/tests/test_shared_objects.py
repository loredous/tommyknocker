import datetime
from uuid import uuid4
from shared.models.objects import Knocker, Knock, Runner
from shared.models.dbobjects import DBKnocker, DBKnock, DBRunner

def test_knocker_from_db():
    db_knocker = DBKnocker(
        name="test_knocker",
        description="test_description",
        id=uuid4(),
        last_seen=datetime.datetime.now()
    )
    knocker = Knocker.from_db(db_knocker)
    assert isinstance(knocker, Knocker)
    assert knocker.name == db_knocker.name
    assert knocker.description == db_knocker.description
    assert knocker.id == db_knocker.id
    assert knocker.last_seen == db_knocker.last_seen

def test_runner_from_db():
    db_runner = DBRunner(
        name="test_runner",
        description="test_description",
        id=uuid4(),
        image_name="test_image_name",
        image_tag="test_image_tag"
    )
    runner = Runner.from_db(db_runner)
    assert isinstance(runner, Runner)
    assert runner.name == db_runner.name
    assert runner.description == db_runner.description
    assert runner.id == db_runner.id
    assert runner.image_name == db_runner.image_name
    assert runner.image_tag == db_runner.image_tag