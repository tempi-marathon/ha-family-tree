"""Tests for Lovelace card static serving helpers and resource registration."""

from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import pytest

from custom_components.family_tree import cards as cards_mod
from custom_components.family_tree.const import CARDS_URL_PATH, VERSION


def test_cards_url_under_api() -> None:
    assert CARDS_URL_PATH.startswith("/api/family_tree/")
    assert CARDS_URL_PATH.endswith("family-tree-cards.js")


def test_cards_fs_state(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    dist = tmp_path / "dist"
    dist.mkdir()
    bundle = dist / "family-tree-cards.js"
    bundle.write_text("// cards", encoding="utf-8")
    smap = dist / "family-tree-cards.js.map"
    smap.write_text("{}", encoding="utf-8")
    monkeypatch.setattr(cards_mod, "DIST_DIR", dist)

    exists, mtime, has_map = cards_mod._cards_fs_state(bundle, smap)
    assert exists is True
    assert mtime > 0
    assert has_map is True

    missing = dist / "missing.js"
    exists2, mtime2, has_map2 = cards_mod._cards_fs_state(missing, smap)
    assert exists2 is False
    assert mtime2 == 0
    assert has_map2 is False


@pytest.mark.asyncio
async def test_register_lovelace_resource_idempotent() -> None:
    existing = {"id": "res-1", "url": f"{CARDS_URL_PATH}?v=old"}
    resources = SimpleNamespace(
        loaded=True,
        async_get_info=AsyncMock(),
        async_items=MagicMock(return_value=[existing]),
        async_update_item=AsyncMock(),
        async_create_item=AsyncMock(),
    )
    lovelace = SimpleNamespace(resource_mode="storage", resources=resources)
    hass = MagicMock()
    hass.data = {"lovelace": lovelace}

    module_url = f"{CARDS_URL_PATH}?v={VERSION}&m=1"
    ok = await cards_mod._async_register_lovelace_resource(hass, module_url)
    assert ok is True
    resources.async_update_item.assert_awaited_once_with(
        "res-1", {"res_type": "module", "url": module_url}
    )
    resources.async_create_item.assert_not_called()

    # Same URL → no update.
    resources.async_update_item.reset_mock()
    existing["url"] = module_url
    ok2 = await cards_mod._async_register_lovelace_resource(hass, module_url)
    assert ok2 is True
    resources.async_update_item.assert_not_called()


@pytest.mark.asyncio
async def test_register_skips_yaml_mode() -> None:
    lovelace = SimpleNamespace(resource_mode="yaml", resources=MagicMock())
    hass = MagicMock()
    hass.data = {"lovelace": lovelace}
    ok = await cards_mod._async_register_lovelace_resource(hass, f"{CARDS_URL_PATH}?v=1")
    assert ok is True
    lovelace.resources.async_create_item.assert_not_called()


@pytest.mark.asyncio
async def test_register_returns_false_when_lovelace_missing() -> None:
    hass = MagicMock()
    hass.data = {}
    ok = await cards_mod._async_register_lovelace_resource(hass, f"{CARDS_URL_PATH}?v=1")
    assert ok is False


def _make_hass_with_storage(*, create: bool = True) -> tuple[MagicMock, SimpleNamespace]:
    resources = SimpleNamespace(
        loaded=True,
        async_get_info=AsyncMock(),
        async_items=MagicMock(return_value=[]),
        async_update_item=AsyncMock(),
        async_create_item=AsyncMock(),
    )
    lovelace = SimpleNamespace(resource_mode="storage", resources=resources)
    hass = MagicMock()
    hass.data = {"lovelace": lovelace}
    hass.is_running = True
    hass.http.async_register_static_paths = AsyncMock()
    hass.async_add_executor_job = AsyncMock(side_effect=lambda fn, *a: fn(*a))
    hass.bus.async_listen_once = MagicMock(return_value=MagicMock())
    hass.async_create_task = MagicMock()
    if not create:
        resources.async_create_item = AsyncMock(side_effect=AssertionError("should not create"))
    return hass, resources


@pytest.mark.asyncio
async def test_async_setup_cards_registers_static_and_lovelace(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    dist = tmp_path / "dist"
    dist.mkdir()
    (dist / "family-tree-cards.js").write_text("// cards", encoding="utf-8")
    (dist / "family-tree-cards.js.map").write_text("{}", encoding="utf-8")
    monkeypatch.setattr(cards_mod, "DIST_DIR", dist)
    monkeypatch.setattr(cards_mod, "_CARDS_KEY", "test_cards_registered")
    monkeypatch.setattr(cards_mod, "_CARDS_LISTENER", "test_cards_listener")

    hass, resources = _make_hass_with_storage()

    await cards_mod.async_setup_cards(hass)

    hass.http.async_register_static_paths.assert_awaited_once()
    paths = hass.http.async_register_static_paths.await_args.args[0]
    assert len(paths) == 2
    assert paths[0].url_path == CARDS_URL_PATH
    resources.async_create_item.assert_awaited_once()
    created = resources.async_create_item.await_args.args[0]
    assert created["res_type"] == "module"
    assert created["url"].startswith(CARDS_URL_PATH)
    assert f"v={VERSION}" in created["url"]
    assert hass.data["test_cards_registered"]["url"] == created["url"]

    # Idempotent second call.
    hass.http.async_register_static_paths.reset_mock()
    resources.async_create_item.reset_mock()
    await cards_mod.async_setup_cards(hass)
    hass.http.async_register_static_paths.assert_not_called()
    resources.async_create_item.assert_not_called()

    cards_mod.async_unload_cards(hass)
    assert "test_cards_registered" not in hass.data


@pytest.mark.asyncio
async def test_async_setup_cards_missing_bundle_skips(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setattr(cards_mod, "DIST_DIR", tmp_path / "empty")
    monkeypatch.setattr(cards_mod, "_CARDS_KEY", "test_cards_missing")
    hass, _resources = _make_hass_with_storage()
    hass.async_add_executor_job = AsyncMock(
        side_effect=lambda fn, *a: fn(*a) if callable(fn) else None
    )

    await cards_mod.async_setup_cards(hass)

    hass.http.async_register_static_paths.assert_not_called()
    assert "test_cards_missing" not in hass.data


@pytest.mark.asyncio
async def test_async_setup_cards_defers_when_lovelace_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    dist = tmp_path / "dist"
    dist.mkdir()
    (dist / "family-tree-cards.js").write_text("// cards", encoding="utf-8")
    monkeypatch.setattr(cards_mod, "DIST_DIR", dist)
    monkeypatch.setattr(cards_mod, "_CARDS_KEY", "test_cards_defer")
    monkeypatch.setattr(cards_mod, "_CARDS_LISTENER", "test_cards_defer_listener")

    scheduled: list[object] = []
    monkeypatch.setattr(
        cards_mod,
        "async_call_later",
        lambda _hass, _delay, action: scheduled.append(action),
    )

    hass = MagicMock()
    hass.data = {}
    hass.is_running = True
    hass.http.async_register_static_paths = AsyncMock()
    hass.async_add_executor_job = AsyncMock(side_effect=lambda fn, *a: fn(*a))

    await cards_mod.async_setup_cards(hass)

    assert "test_cards_defer" in hass.data
    assert scheduled, "expected retry scheduled when lovelace missing"
    hass.bus.async_listen_once.assert_not_called()


@pytest.mark.asyncio
async def test_async_setup_cards_listens_for_started_when_not_running(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    dist = tmp_path / "dist"
    dist.mkdir()
    (dist / "family-tree-cards.js").write_text("// cards", encoding="utf-8")
    monkeypatch.setattr(cards_mod, "DIST_DIR", dist)
    monkeypatch.setattr(cards_mod, "_CARDS_KEY", "test_cards_started")
    monkeypatch.setattr(cards_mod, "_CARDS_LISTENER", "test_cards_started_listener")

    hass = MagicMock()
    hass.data = {}
    hass.is_running = False
    hass.http.async_register_static_paths = AsyncMock()
    hass.async_add_executor_job = AsyncMock(side_effect=lambda fn, *a: fn(*a))
    unsub = MagicMock()
    hass.bus.async_listen_once = MagicMock(return_value=unsub)

    await cards_mod.async_setup_cards(hass)

    hass.bus.async_listen_once.assert_called_once()
    assert hass.data["test_cards_started_listener"] is unsub

    cards_mod.async_unload_cards(hass)
    unsub.assert_called_once()
    assert "test_cards_started" not in hass.data
    assert "test_cards_started_listener" not in hass.data
