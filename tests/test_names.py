"""Tests for Dutch-aware name helpers."""

from pathlib import Path

from custom_components.family_tree.db import Database
from custom_components.family_tree.models import Person
from custom_components.family_tree.names import (
    display_name,
    formal_subtitle,
    full_name,
    matches_family_shortcut,
    normalize_imported_names,
    normalize_surname_fields,
    sort_key,
    split_surname,
)
from custom_components.family_tree.repository import Repository


def test_split_surname_prefixes():
    assert split_surname("van Iersel") == ("van", "Iersel")
    assert split_surname("van der Berg") == ("van der", "Berg")
    assert split_surname("Jansen") == ("", "Jansen")


def test_display_and_full_name():
    person = Person(
        given_names="Johannes Petrus",
        call_name="Jan",
        surname_prefix="van",
        surname="Berg",
    )
    assert display_name(person) == "Jan van Berg"
    assert full_name(person) == "Johannes Petrus van Berg"


def test_sort_key_ignores_prefix():
    a = Person(given_names="Ada", surname_prefix="de", surname="Vries")
    b = Person(given_names="Bart", surname="Jansen")
    assert sort_key(a) < sort_key(Person(given_names="Zed", surname="Vries"))
    assert sort_key(b)[0] == "jansen"


def test_family_shortcut():
    person = Person(surname_prefix="van", surname="Iersel")
    assert matches_family_shortcut(person, "van iersel")
    assert matches_family_shortcut(person, "iersel")
    assert not matches_family_shortcut(person, "smith")


def test_normalize_imported_names_nick_in_parens():
    given, call = normalize_imported_names("Marinus Theodorus", "Marinus (Rien)")
    assert call == "Rien"
    assert given == "Marinus Theodorus"


def test_normalize_surname_fields_strips_duplicate_prefix():
    assert normalize_surname_fields("de", "de Vries") == ("de", "Vries")
    assert normalize_surname_fields("van der", "van der Berg") == ("van der", "Berg")
    assert normalize_surname_fields("De", "de Vries") == ("de", "Vries")
    assert normalize_surname_fields("de", "Vries") == ("de", "Vries")
    assert normalize_surname_fields("", "van Iersel") == ("van", "Iersel")
    assert normalize_surname_fields("", "Jansen") == ("", "Jansen")


def test_dedupe_surname_prefixes_repairs_existing_rows(tmp_path: Path):
    db = Database(tmp_path / "tree.db")
    db.open()
    repo = Repository(db)
    bad = repo.add_person(Person(given_names="Ada", surname_prefix="de", surname="de Vries"))
    good = repo.add_person(Person(given_names="Bart", surname_prefix="van", surname="Iersel"))
    fixed = repo.dedupe_surname_prefixes()
    assert fixed == 1
    assert repo.get_person(bad.id).surname_prefix == "de"
    assert repo.get_person(bad.id).surname == "Vries"
    assert repo.get_person(good.id).surname == "Iersel"
    assert repo.dedupe_surname_prefixes() == 0
    db.close()


def test_formal_subtitle_dedupes_preferred_in_given():
    person = Person(
        given_names="Wilhelmina Wilhelmina Huberdina",
        call_name="Wilhelmina",
        surname="Aerts",
    )
    assert display_name(person) == "Wilhelmina Aerts"
    assert formal_subtitle(person) == "Wilhelmina Huberdina Aerts"


def test_formal_subtitle_hidden_when_same_as_display():
    person = Person(given_names="Ada", surname="Jansen")
    assert formal_subtitle(person) == ""
