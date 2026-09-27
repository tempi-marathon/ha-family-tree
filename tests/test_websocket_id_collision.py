"""Regression: websocket command schemas must not redeclare message id as str."""

from __future__ import annotations

import voluptuous as vol


def test_optional_entity_id_must_not_collide_with_ws_message_id() -> None:
    """HA always sends integer ``id``; entity ids must use a different key."""
    bad = vol.Schema(
        {
            vol.Required("type"): str,
            vol.Optional("id"): str,
        },
        extra=vol.ALLOW_EXTRA,
    )
    # This is the failure users hit: message id 54 vs Optional(id): str
    try:
        bad({"type": "family_tree/persons/save", "id": 54, "surname": "Molenschot"})
        raised = False
    except vol.Invalid:
        raised = True
    assert raised

    good = vol.Schema(
        {
            vol.Required("type"): str,
            vol.Required("id"): int,
            vol.Optional("person_id"): str,
        },
        extra=vol.ALLOW_EXTRA,
    )
    assert good(
        {"type": "family_tree/persons/save", "id": 54, "surname": "Molenschot"}
    )["id"] == 54
    assert (
        good(
            {
                "type": "family_tree/persons/save",
                "id": 55,
                "person_id": "abc",
                "surname": "X",
            }
        )["person_id"]
        == "abc"
    )
