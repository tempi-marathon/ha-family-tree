"""Tests for Dutch-aware name helpers."""

from custom_components.family_tree.models import Person
from custom_components.family_tree.names import (
    display_name,
    full_name,
    matches_family_shortcut,
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
