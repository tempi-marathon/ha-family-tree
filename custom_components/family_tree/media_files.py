"""Filesystem paths and image processing for person media."""

from __future__ import annotations

import io
import logging
import re
from dataclasses import dataclass
from pathlib import Path

from .const import (
    ENTITY_ID_HEX_LEN,
    MAX_PHOTO_BYTES,
    MAX_PHOTO_DIMENSION,
    MAX_PHOTO_PIXELS,
)

_LOGGER = logging.getLogger(__name__)

_ENTITY_ID_RE = re.compile(rf"^[0-9a-f]{{{ENTITY_ID_HEX_LEN}}}$")

_EXT_BY_TYPE = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


@dataclass(frozen=True, slots=True)
class ProcessedImage:
    """Normalized full image and thumbnail bytes."""

    content_type: str
    full_data: bytes
    thumb_data: bytes
    width: int
    height: int
    byte_size: int


def is_valid_entity_id(value: str) -> bool:
    """Return True when value is a 32-char hex entity id."""
    return bool(_ENTITY_ID_RE.match(value))


def safe_display_filename(name: str) -> str:
    """Strip path components and control chars from an upload filename."""
    base = Path(name).name
    return "".join(c for c in base if c.isprintable() and c not in "\x00\\/")[:200]


def person_media_dir(media_root: Path, person_id: str) -> Path:
    """Directory for one person's media files."""
    if not is_valid_entity_id(person_id):
        raise ValueError("Invalid person id")
    return media_root / person_id


def media_file_path(
    media_root: Path,
    person_id: str,
    media_id: str,
    content_type: str,
    *,
    thumb: bool = False,
) -> Path:
    """Resolve an on-disk path for full or thumb variant."""
    if not is_valid_entity_id(person_id) or not is_valid_entity_id(media_id):
        raise ValueError("Invalid media or person id")
    directory = person_media_dir(media_root, person_id)
    if thumb:
        return directory / f"{media_id}_thumb.webp"
    ext = _EXT_BY_TYPE.get(content_type, ".bin")
    return directory / f"{media_id}{ext}"


def assert_under_media_root(media_root: Path, path: Path) -> Path:
    """Resolve path and ensure it stays under media_root."""
    root = media_root.resolve()
    resolved = path.resolve()
    if not resolved.is_relative_to(root):
        raise ValueError("Path escapes media root")
    return resolved


def sniff_image_type(data: bytes) -> str | None:
    """Return content type from magic bytes, or None if unsupported."""
    if len(data) < 12:
        return None
    if data[:3] == b"\xff\xd8\xff":
        return "image/jpeg"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None


def process_image_data(data: bytes) -> ProcessedImage:
    """Validate, re-encode (strip EXIF), and build a thumbnail."""
    if len(data) > MAX_PHOTO_BYTES:
        raise ValueError("Image exceeds maximum size")
    content_type = sniff_image_type(data)
    if content_type is None:
        raise ValueError("Unsupported image format")

    from PIL import Image, ImageOps

    try:
        img = Image.open(io.BytesIO(data))
        img.load()
    except OSError as err:
        raise ValueError("Invalid image data") from err

    img = ImageOps.exif_transpose(img)
    width, height = img.size
    if width <= 0 or height <= 0:
        raise ValueError("Invalid image dimensions")
    if width > MAX_PHOTO_DIMENSION or height > MAX_PHOTO_DIMENSION:
        raise ValueError("Image dimensions too large")
    if width * height > MAX_PHOTO_PIXELS:
        raise ValueError("Image pixel count too large")

    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    full_buf = io.BytesIO()
    save_format = "JPEG" if content_type == "image/jpeg" else content_type.split("/")[1].upper()
    if save_format == "JPG":
        save_format = "JPEG"
    if save_format == "JPEG":
        img.save(full_buf, format="JPEG", quality=88, optimize=True)
        out_type = "image/jpeg"
    elif save_format == "PNG":
        img.save(full_buf, format="PNG", optimize=True)
        out_type = "image/png"
    else:
        img.save(full_buf, format="WEBP", quality=85, method=4)
        out_type = "image/webp"

    full_data = full_buf.getvalue()
    if len(full_data) > MAX_PHOTO_BYTES:
        raise ValueError("Processed image exceeds maximum size")

    thumb = img.copy()
    thumb.thumbnail((256, 256), Image.Resampling.LANCZOS)
    thumb_buf = io.BytesIO()
    thumb.save(thumb_buf, format="WEBP", quality=80, method=4)
    thumb_data = thumb_buf.getvalue()

    return ProcessedImage(
        content_type=out_type,
        full_data=full_data,
        thumb_data=thumb_data,
        width=width,
        height=height,
        byte_size=len(full_data),
    )


def write_media_files(
    media_root: Path,
    person_id: str,
    media_id: str,
    processed: ProcessedImage,
) -> None:
    """Write full and thumbnail files to disk."""
    directory = person_media_dir(media_root, person_id)
    directory.mkdir(parents=True, exist_ok=True)
    full_path = media_file_path(
        media_root, person_id, media_id, processed.content_type, thumb=False
    )
    thumb_path = media_file_path(
        media_root, person_id, media_id, processed.content_type, thumb=True
    )
    assert_under_media_root(media_root, full_path)
    assert_under_media_root(media_root, thumb_path)
    full_path.write_bytes(processed.full_data)
    thumb_path.write_bytes(processed.thumb_data)


def delete_media_files(
    media_root: Path,
    person_id: str,
    media_id: str,
    content_type: str,
) -> None:
    """Remove full and thumb files if present."""
    for thumb in (False, True):
        try:
            path = media_file_path(media_root, person_id, media_id, content_type, thumb=thumb)
            if path.is_file():
                path.unlink()
        except ValueError:
            continue


def remove_person_media_dir(media_root: Path, person_id: str) -> None:
    """Remove all media files for a person."""
    if not is_valid_entity_id(person_id):
        return
    directory = person_media_dir(media_root, person_id)
    if not directory.is_dir():
        return
    try:
        assert_under_media_root(media_root, directory)
    except ValueError:
        return
    for child in directory.iterdir():
        if child.is_file():
            child.unlink()
    directory.rmdir()


def read_media_file(
    media_root: Path,
    person_id: str,
    media_id: str,
    content_type: str,
    *,
    thumb: bool,
) -> bytes | None:
    """Read bytes for a stored media variant."""
    try:
        path = media_file_path(media_root, person_id, media_id, content_type, thumb=thumb)
        path = assert_under_media_root(media_root, path)
    except ValueError:
        return None
    if not path.is_file():
        return None
    return path.read_bytes()
