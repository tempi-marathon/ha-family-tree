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


def test_preview_gedcom_counts():
    from custom_components.family_tree.gedcom_import import preview_gedcom

    text = FIXTURE.read_text(encoding="utf-8")
    report = preview_gedcom(text)
    assert report.persons == 3
    assert report.unions == 1
    assert report.events >= 4
    assert report.sources >= 1
    assert report.places >= 1


def test_import_quoted_nick_and_level1_givn(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    text = """0 HEAD
1 SOUR Test
1 GEDC
2 VERS 5.5.1
1 CHAR UTF-8
0 @I1@ INDI
1 NAME Marinus Theodorus "Rien" /Molenschot/
2 GIVN Marinus Theodorus
2 SURN Molenschot
2 NICK Rien
1 SEX M
0 @I2@ INDI
1 NAME Adrianus Marinus /Molenschot/
1 GIVN Adrianus Marinus
1 SURN Molenschot
1 NICK Ad
1 SEX M
0 TRLR
"""
    report = GedcomImporter(repo).import_text(text)
    assert report.persons == 2
    people, _ = repo.list_persons(limit=50)
    by_call = {p.call_name: p for p in people}
    assert "Rien" in by_call
    assert by_call["Rien"].given_names == "Marinus Theodorus"
    assert "Ad" in by_call
    assert by_call["Ad"].given_names == "Adrianus Marinus"
    db.close()


def test_import_spfx_surn_does_not_duplicate_prefix(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    text = """0 HEAD
1 SOUR Test
1 GEDC
2 VERS 5.5.1
1 CHAR UTF-8
0 @I1@ INDI
1 NAME Ada /de Vries/
2 GIVN Ada
2 SPFX de
2 SURN de Vries
1 SEX F
0 TRLR
"""
    GedcomImporter(repo).import_text(text)
    people, _ = repo.list_persons(limit=10)
    assert len(people) == 1
    p = people[0]
    assert p.surname_prefix == "de"
    assert p.surname == "Vries"
    db.close()


def test_import_nick_with_parens(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    text = """0 HEAD
1 SOUR Test
1 GEDC
2 VERS 5.5.1
1 CHAR UTF-8
0 @I9@ INDI
1 NAME Marinus Theodorus /Molenschot/
2 GIVN Marinus Theodorus
2 NICK Marinus (Rien)
2 SURN Molenschot
1 SEX M
0 TRLR
"""
    GedcomImporter(repo).import_text(text)
    people, _ = repo.list_persons(limit=10)
    assert len(people) == 1
    p = people[0]
    assert p.call_name == "Rien"
    assert p.given_names == "Marinus Theodorus"
    db.close()


def test_import_batch_single_revision(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    rev0 = repo.get_revision()
    notifications = []
    repo.add_listener(lambda: notifications.append(repo.get_revision()))
    text = FIXTURE.read_text(encoding="utf-8")
    GedcomImporter(repo).import_text(text)
    assert repo.get_revision() == rev0 + 1
    assert len(notifications) == 1
    db.close()


def test_export_anonymize_living(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    GedcomImporter(repo).import_text(FIXTURE.read_text(encoding="utf-8"))

    full = export_gedcom(db)
    assert "Johannes" in full
    assert "Anna" in full
    assert "Maria" in full
    assert "1 MARR" in full
    assert "Living //" not in full
    assert "1 RESN privacy" not in full

    private = export_gedcom(db, anonymize_living=True)
    assert private.count("1 NAME Living //") == 2
    assert private.count("1 RESN privacy") == 2
    assert "Johannes" not in private
    assert "Anna" not in private
    assert "Maria" in private
    assert "1 BIRT" in private  # deceased still has birth
    assert "DEAT" in private
    # Living INDIs must not carry personal events/notes.
    living_blocks = []
    current: list[str] = []
    for line in private.splitlines():
        if line.startswith("0 @") and " INDI" in line:
            if current:
                living_blocks.append(current)
            current = [line]
        elif line.startswith("0 "):
            if current:
                living_blocks.append(current)
            current = []
        elif current:
            current.append(line)
    if current:
        living_blocks.append(current)
    anonymized = [b for b in living_blocks if any("NAME Living //" in ln for ln in b)]
    assert len(anonymized) == 2
    for block in anonymized:
        joined = "\n".join(block)
        assert "1 SEX " in joined
        assert "1 RESN privacy" in joined
        assert "BIRT" not in joined
        assert "NOTE" not in joined
        assert "2 GIVN" not in joined
        assert "2 SURN" not in joined
        # Structure preserved
        assert "FAMS" in joined or "FAMC" in joined

    # FAM with a living partner omits marriage detail; links remain.
    assert "1 HUSB" in private
    assert "1 WIFE" in private
    assert "1 CHIL" in private
    assert "1 MARR" not in private

    db.close()


def test_export_anonymize_all_deceased_fam_keeps_marriage(tmp_path: Path):
    """When every partner is deceased, union events stay in the export."""
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    text = """0 HEAD
1 SOUR Test
1 GEDC
2 VERS 5.5.1
1 CHAR UTF-8
0 @I1@ INDI
1 NAME Adam /Deceased/
1 SEX M
1 DEAT
2 DATE 1 JAN 1900
0 @I2@ INDI
1 NAME Eve /Deceased/
1 SEX F
1 DEAT
2 DATE 1 JAN 1901
0 @F1@ FAM
1 HUSB @I1@
1 WIFE @I2@
1 MARR
2 DATE 1 JUN 1870
0 TRLR
"""
    GedcomImporter(repo).import_text(text)
    private = export_gedcom(db, anonymize_living=True)
    assert "Living //" not in private
    assert "Adam" in private
    assert "Eve" in private
    assert "1 MARR" in private
    db.close()
