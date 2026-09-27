"""Tests for GEDCOM import/export with fictional fixture."""

from pathlib import Path

from custom_components.family_tree.db import Database
from custom_components.family_tree.gedcom_export import export_gedcom
from custom_components.family_tree.gedcom_import import GedcomImporter
from custom_components.family_tree.repository import Repository

FIXTURE = Path(__file__).parent / "fixtures" / "sample.ged"


def test_import_sample_gedcom(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    text = FIXTURE.read_text(encoding="utf-8")
    report = GedcomImporter(repo).import_text(text)

    assert report.persons == 3
    assert report.unions == 1
    assert report.events >= 4
    assert report.places >= 1
    assert report.sources >= 1
    assert report.parent_child >= 1

    persons, total = repo.list_persons(limit=50)
    assert total == 3
    surnames = {p.surname for p in persons}
    assert "Iersel" in surnames
    assert "Vries" in surnames

    prefixes = {p.surname_prefix for p in persons if p.surname_prefix}
    assert "van" in prefixes or "de" in prefixes

    living = [p for p in persons if p.is_living]
    deceased = [p for p in persons if not p.is_living]
    assert len(deceased) == 1
    assert len(living) == 2

    exported = export_gedcom(db)
    assert "0 HEAD" in exported
    assert "INDI" in exported
    assert "FAM" in exported
    assert "BIRT" in exported
    assert "MARR" in exported
    assert "van Iersel" in exported or "Iersel" in exported

    # Round-trip replace import
    report2 = GedcomImporter(repo).import_text(exported, replace=True)
    assert report2.persons >= 3
    db.close()
