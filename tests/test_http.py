"""HTTP view helper and authz tests (HA view base is stubbed in conftest)."""

from __future__ import annotations

from http import HTTPStatus
from types import SimpleNamespace
from typing import Any
from unittest.mock import MagicMock

import pytest

from custom_components.family_tree import http as http_mod
from custom_components.family_tree.const import MAX_IMPORT_BYTES
from custom_components.family_tree.http import (
    FamilyTreeImportGedcomView,
    FamilyTreeMediaView,
    _read_stream_with_limit,
)


class _FakeStream:
    def __init__(self, data: bytes, chunk_size: int = 1024) -> None:
        self._data = data
        self._offset = 0
        self._chunk_size = chunk_size

    def at_eof(self) -> bool:
        return self._offset >= len(self._data)

    async def read(self, n: int = -1) -> bytes:
        if self.at_eof():
            return b""
        size = self._chunk_size if n < 0 else min(n, self._chunk_size)
        chunk = self._data[self._offset : self._offset + size]
        self._offset += len(chunk)
        return chunk


@pytest.mark.asyncio
async def test_read_stream_with_limit_accepts_under_cap() -> None:
    data = b"hello world"
    assert await _read_stream_with_limit(_FakeStream(data), 100) == data


@pytest.mark.asyncio
async def test_read_stream_with_limit_rejects_over_cap() -> None:
    data = b"x" * 50
    assert await _read_stream_with_limit(_FakeStream(data, chunk_size=16), 40) is None


class _FakeRequest(dict):
    """Minimal aiohttp-like request for view unit tests."""

    def __init__(self, **kwargs: Any) -> None:
        super().__init__()
        self.app = kwargs.pop("app", {"hass": MagicMock()})
        self.content_type = kwargs.pop("content_type", "text/plain")
        self.content_length = kwargs.pop("content_length", None)
        self.query = kwargs.pop("query", {})
        self.headers = kwargs.pop("headers", {})
        self.content = kwargs.pop("content", None)
        for key, value in kwargs.items():
            self[key] = value


@pytest.mark.asyncio
async def test_import_gedcom_rejects_non_admin() -> None:
    view = FamilyTreeImportGedcomView()
    request = _FakeRequest(hass_user=SimpleNamespace(is_admin=False))
    result = await view.post(request)
    assert result == {"message": "Unauthorized", "status": HTTPStatus.UNAUTHORIZED}


@pytest.mark.asyncio
async def test_import_gedcom_rejects_large_content_length() -> None:
    view = FamilyTreeImportGedcomView()
    request = _FakeRequest(
        hass_user=SimpleNamespace(is_admin=True),
        content_length=MAX_IMPORT_BYTES + 1,
    )
    with pytest.MonkeyPatch.context() as mp:
        mp.setattr(
            http_mod,
            "get_coordinator",
            lambda _hass: SimpleNamespace(repo=MagicMock()),
        )
        result = await view.post(request)
    assert result["status"] == HTTPStatus.REQUEST_ENTITY_TOO_LARGE


@pytest.mark.asyncio
async def test_media_get_returns_not_found_for_invalid_id() -> None:
    view = FamilyTreeMediaView()
    request = MagicMock()
    request.app = {"hass": MagicMock()}
    result = await view.get(request, media_id="not-hex")
    assert result == {"message": "Not found", "status": HTTPStatus.NOT_FOUND}


@pytest.mark.asyncio
async def test_media_get_returns_not_found_when_not_visible(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    view = FamilyTreeMediaView()
    request = MagicMock()
    hass = MagicMock()
    request.app = {"hass": hass}
    request.query = {"variant": "thumb"}
    request.headers = {}

    repo = MagicMock()
    repo.get_visible_person_media.return_value = None
    monkeypatch.setattr(http_mod, "get_coordinator", lambda _hass: SimpleNamespace(repo=repo))
    monkeypatch.setattr(http_mod, "media_dir", lambda _hass: MagicMock())

    async def _run(fn: Any, *args: Any) -> Any:
        return fn(*args)

    hass.async_add_executor_job = _run
    media_id = "a" * 32
    result = await view.get(request, media_id=media_id)
    assert result == {"message": "Not found", "status": HTTPStatus.NOT_FOUND}
    repo.get_visible_person_media.assert_called_once_with(media_id)
