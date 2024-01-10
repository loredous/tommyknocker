import datetime
from uuid import uuid4
from shared.models.objects import Knocker, Knock
from shared.models.dbobjects import DBKnocker, DBKnock

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

