"""Orchestrate person media uploads and deletes (DB + filesystem)."""

from __future__ import annotations

import logging
from pathlib import Path

from .media_files import (
    delete_media_files,
    process_image_data,
    remove_person_media_dir,
    safe_display_filename,
    write_media_files,
)
from .models import PersonMedia, new_id
from .repository import Repository

_LOGGER = logging.getLogger(__name__)


def upload_person_media(
    repo: Repository,
    media_root: Path,
    person_id: str,
    data: bytes,
    *,
    original_filename: str = "",
    caption: str = "",
    source_url: str = "",
    set_profile_if_empty: bool = False,
) -> PersonMedia:
    """Process bytes, write files, and insert metadata."""
    processed = process_image_data(data)
    media_id = new_id()
    from datetime import UTC, datetime

    now = datetime.now(UTC).replace(microsecond=0).isoformat()
    media = PersonMedia(
        id=media_id,
        person_id=person_id,
        content_type=processed.content_type,
        original_filename=safe_display_filename(original_filename),
        caption=caption,
        byte_size=processed.byte_size,
        width=processed.width,
        height=processed.height,
        source_url=source_url,
        created_at=now,
        updated_at=now,
    )
    try:
        write_media_files(media_root, person_id, media_id, processed)
        saved = repo.add_person_media(media, set_profile_if_empty=set_profile_if_empty)
    except Exception:
        delete_media_files(media_root, person_id, media_id, processed.content_type)
        raise
    _LOGGER.info(
        "Stored person media (person_id=%s media_id=%s bytes=%s)",
        person_id,
        saved.id,
        saved.byte_size,
    )
    return saved


def remove_media(
    repo: Repository,
    media_root: Path,
    media_id: str,
) -> bool:
    """Delete media row and files."""
    removed = repo.delete_person_media(media_id)
    if removed is None:
        return False
    delete_media_files(media_root, removed.person_id, removed.id, removed.content_type)
    return True


def purge_person_media_files(media_root: Path, person_id: str) -> None:
    """Remove on-disk media for a person (after DB purge)."""
    remove_person_media_dir(media_root, person_id)
