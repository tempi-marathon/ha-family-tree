"""Tests for person media repository and files."""

from __future__ import annotations

from pathlib import Path

import pytest

from custom_components.family_tree.db import Database
from custom_components.family_tree.media_files import (
    assert_under_media_root,
    is_valid_entity_id,
    process_image_data,
    sniff_image_type,
)
from custom_components.family_tree.media_service import remove_media, upload_person_media
from custom_components.family_tree.models import Person
from custom_components.family_tree.repository import Repository


def _tiny_jpeg() -> bytes:
    import io

    from PIL import Image

    img = Image.new("RGB", (8, 8), color=(120, 80, 200))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return buf.getvalue()


@pytest.fixture
def media_repo(tmp_path: Path) -> tuple[Repository, Path]:
    db_path = tmp_path / "test.db"
    database = Database(db_path)
    database.open()
    repo = Repository(database)
    media_root = tmp_path / "media"
    media_root.mkdir()
    return repo, media_root


def test_entity_id_validation() -> None:
    assert is_valid_entity_id("a" * 32)
    assert not is_valid_entity_id("short")
    assert not is_valid_entity_id("../" + "a" * 28)


def test_sniff_jpeg() -> None:
    jpeg = _tiny_jpeg()
    assert sniff_image_type(jpeg) == "image/jpeg"
    assert sniff_image_type(b"not an image") is None


def test_upload_does_not_auto_set_profile(media_repo: tuple[Repository, Path]) -> None:
    repo, root = media_repo
    person = Person(given_names="Test", surname="User")
    repo.add_person(person)
    media = upload_person_media(
        repo, root, person.id, _tiny_jpeg(), original_filename="x.jpg"
    )
    assert media.id
    loaded = repo.get_person(person.id)
    assert loaded is not None
    assert loaded.profile_media_id is None
    assert repo.count_person_media(person.id) == 1


def test_upload_set_profile_explicit(media_repo: tuple[Repository, Path]) -> None:
    repo, root = media_repo
    person = Person(given_names="Test", surname="User")
    repo.add_person(person)
    media = upload_person_media(
        repo, root, person.id, _tiny_jpeg(), original_filename="x.jpg"
    )
    assert repo.set_profile_media(person.id, media.id)
    loaded = repo.get_person(person.id)
    assert loaded is not None
    assert loaded.profile_media_id == media.id


def test_set_profile_wrong_person(media_repo: tuple[Repository, Path]) -> None:
    repo, root = media_repo
    p1 = Person(given_names="A", surname="One")
    p2 = Person(given_names="B", surname="Two")
    repo.add_person(p1)
    repo.add_person(p2)
    m1 = upload_person_media(repo, root, p1.id, _tiny_jpeg())
    assert not repo.set_profile_media(p2.id, m1.id)


def test_remove_media(media_repo: tuple[Repository, Path]) -> None:
    repo, root = media_repo
    person = Person(given_names="Del", surname="Me")
    repo.add_person(person)
    media = upload_person_media(repo, root, person.id, _tiny_jpeg())
    assert remove_media(repo, root, media.id)
    assert repo.get_person_media(media.id) is None


def test_path_containment(media_repo: tuple[Repository, Path]) -> None:
    repo, root = media_repo
    person = Person(given_names="P", surname="Q")
    repo.add_person(person)
    media = upload_person_media(repo, root, person.id, _tiny_jpeg())
    from custom_components.family_tree.media_files import media_file_path

    path = media_file_path(root, person.id, media.id, media.content_type)
    assert_under_media_root(root, path)
    with pytest.raises(ValueError):
        assert_under_media_root(root, root.parent / "escape.jpg")


def test_process_image_rejects_html() -> None:
    with pytest.raises(ValueError):
        process_image_data(b"<html>not image</html>")


def test_process_image_exif_transpose() -> None:
    import io

    from PIL import Image

    img = Image.new("RGB", (4, 6), color=(200, 100, 50))
    exif = img.getexif()
    exif[274] = 6
    buf = io.BytesIO()
    img.save(buf, format="JPEG", exif=exif.tobytes())
    processed = process_image_data(buf.getvalue())
    assert processed.width == 6
    assert processed.height == 4
