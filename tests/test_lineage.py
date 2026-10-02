"""Tests for biological lineage helpers."""

from pathlib import Path

from custom_components.family_tree.db import Database
from custom_components.family_tree.lineage import ancestors, descendants, lineage_relation
from custom_components.family_tree.models import (
    ParentChild,
    ParentChildType,
    Person,
    Sex,
    Union,
    UnionType,
)
from custom_components.family_tree.relatives import tree_for
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


def test_tree_groups_children_per_union(tmp_path: Path):
    repo = _repo(tmp_path)
    ad = repo.add_person(Person(given_names="Ad", sex=Sex.MALE))
    nellie = repo.add_person(Person(given_names="Nellie", sex=Sex.FEMALE))
    lydie = repo.add_person(Person(given_names="Lydie", sex=Sex.FEMALE))
    maarten = repo.add_person(Person(given_names="Maarten"))
    loose = repo.add_person(Person(given_names="Loose"))
    u1 = repo.add_union(
        Union(type=UnionType.MARRIAGE, known_children_count=2),
        [(ad.id, 0), (nellie.id, 1)],
    )
    u2 = repo.add_union(Union(type=UnionType.MARRIAGE), [(ad.id, 0), (lydie.id, 1)])
    # No explicit union_id: inferred from the shared co-parent.
    repo.add_parent_child(ParentChild(parent_id=ad.id, child_id=maarten.id))
    repo.add_parent_child(ParentChild(parent_id=nellie.id, child_id=maarten.id))
    repo.add_parent_child(ParentChild(parent_id=ad.id, child_id=loose.id))

    tree = tree_for(repo, ad.id)
    by_union = {u["union_id"]: u for u in tree["partners"]}
    assert [c["id"] for c in by_union[u1.id]["children"]] == [maarten.id]
    assert by_union[u1.id]["known_children_count"] == 2
    assert by_union[u2.id]["children"] == []
    assert [c["id"] for c in tree["children_without_union"]] == [loose.id]
    repo.db.close()
