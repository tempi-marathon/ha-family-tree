"""Constants for the Family Tree integration."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Final

DOMAIN: Final = "family_tree"

_MANIFEST = json.loads((Path(__file__).parent / "manifest.json").read_text(encoding="utf-8"))
VERSION: Final = str(_MANIFEST["version"])

# Config / options
CONF_NAME: Final = "name"
CONF_GAZETTEER_COUNTRIES: Final = "gazetteer_countries"
CONF_FAMILY_SHORTCUTS: Final = "family_shortcuts"
META_FAMILY_SHORTCUTS: Final = "family_shortcuts"
META_SURNAME_PREFIX_DEDUPE: Final = "surname_prefix_dedupe_v1"
MAX_FAMILY_SHORTCUTS: Final = 50

DEFAULT_PROFILE_NAME: Final = "Family Tree"
DEFAULT_GAZETTEER_COUNTRIES: Final = []
DEFAULT_FAMILY_SHORTCUTS: Final = []

# Suggested ISO codes shown in setup/options selectors (custom values still allowed).
SUGGESTED_GAZETTEER_COUNTRIES: Final = [
    "NL",
    "BE",
    "DE",
    "FR",
    "GB",
    "IE",
    "US",
    "CA",
    "AU",
    "ID",
    "SR",
    "CW",
]

ATTR_CONFIG_ENTRY_ID: Final = "config_entry_id"

# Caps (authenticated DoS guard)
MAX_PERSONS: Final = 5000
MAX_UNIONS: Final = 5000
MAX_PLACES: Final = 10000
MAX_SOURCES: Final = 10000
MAX_IMPORT_BYTES: Final = 20 * 1024 * 1024  # 20 MiB
MAX_NAME: Final = 200
MAX_NOTES: Final = 10000
MAX_URL: Final = 2000
MAX_SEARCH: Final = 100
MAX_PHOTO_BYTES: Final = 5 * 1024 * 1024  # 5 MiB
MAX_PHOTOS_PER_PERSON: Final = 50
MAX_CAPTION: Final = 500
MAX_MEDIA_TOTAL_BYTES: Final = 500 * 1024 * 1024  # 500 MiB per tree
MAX_PHOTO_PIXELS: Final = 20_000_000
MAX_PHOTO_DIMENSION: Final = 8000
# Biological lineage walks (and parent-cycle checks) never exceed this depth.
MAX_LINEAGE_GENERATIONS: Final = 64
MEDIA_DIR_NAME: Final = "media"
ENTITY_ID_HEX_LEN: Final = 32

# Storage paths relative to HA config
DATA_DIR_NAME: Final = "family_tree"
DB_FILENAME: Final = "family_tree.db"
GAZETTEER_DB_FILENAME: Final = "gazetteer.db"
SCHEMA_VERSION: Final = 4

# Events
EVENT_BIRTHDAY: Final = f"{DOMAIN}_birthday"
EVENT_ANNIVERSARY: Final = f"{DOMAIN}_anniversary"
EVENT_MEMORIAL: Final = f"{DOMAIN}_memorial"

# Platforms
PLATFORMS: Final = ["sensor", "calendar"]

# Sidebar panel
PANEL_URL_PATH: Final = DOMAIN
PANEL_WEBCOMPONENT: Final = "family-tree-panel"
PANEL_FILENAME: Final = "family-tree-panel.js"
PANEL_MODULE_URL: Final = f"/api/panel_custom/{DOMAIN}"
# The bundle's relative ``sourceMappingURL`` resolves next to PANEL_MODULE_URL.
PANEL_SOURCEMAP_URL: Final = f"/api/panel_custom/{PANEL_FILENAME}.map"
BRAND_URL_PATH: Final = f"/api/{DOMAIN}/brand"
PANEL_ICON: Final = "mdi:family-tree"
PANEL_TITLE: Final = "Family Tree"

# GeoNames
GEONAMES_BASE_URL: Final = "https://download.geonames.org/export/dump"
GEONAMES_ADMIN1_URL: Final = f"{GEONAMES_BASE_URL}/admin1CodesASCII.txt"
