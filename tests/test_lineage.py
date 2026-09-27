"""Tests for biological lineage helpers."""

from pathlib import Path

from custom_components.family_tree.db import Database
from custom_components.family_tree.lineage import ancestors, descendants, lineage_relation
from custom_components.family_tree.models import ParentChild, ParentChildType, Person
from custom_components.family_tree.repository import Repository


def _repo(tmp_path: Path) -> Repository:
    db = Database(tmp_path / "tree.db")
    db.open()
    return Repository(db)


def test_ancestors_and_descendants(tmp_path: Path):
    repo = _repo(tmp_path)
    grand = repo.add_person(Person(given_names="Grand", surname="A"))
    parent = repo.add_person(Person(given_names="Parent", surname="A"))
    child = repo.add_person(Person(given_names="Child", surname="A"))
    repo.add_parent_child(
        ParentChild(
            parent_id=grand.id,
            child_id=parent.id,
            type=ParentChildType.BIOLOGICAL,
        )
    )
    repo.add_parent_child(
        ParentChild(
            parent_id=parent.id,
            child_id=child.id,
            type=ParentChildType.BIOLOGICAL,
        )
    )

    ups = ancestors(repo.db, child.id)
    assert [r["id"] for r in ups] == [parent.id, grand.id]
    assert ups[0]["generation"] == 1
    assert ups[1]["generation"] == 2

    downs = descendants(repo.db, grand.id)
    assert {r["id"] for r in downs} == {parent.id, child.id}

    rel = lineage_relation(repo.db, child.id, grand.id)
    assert rel is not None
    assert rel["type"] == "ancestor"
    assert rel["generation"] == 2

    repo.db.close()
