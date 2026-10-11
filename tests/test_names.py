"""Tests for Dutch-aware name helpers."""

from custom_components.family_tree.models import Person
from custom_components.family_tree.names import (
    display_name,
    formal_subtitle,
    full_name,
    matches_family_shortcut,
    normalize_imported_names,
    sort_key,
    split_surname,
)


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
