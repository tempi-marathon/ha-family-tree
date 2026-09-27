"""Constants for the Family Tree integration."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "family_tree"
VERSION: Final = "0.1.0"

# Config / options
CONF_NAME: Final = "name"
CONF_GAZETTEER_COUNTRIES: Final = "gazetteer_countries"
CONF_FAMILY_SHORTCUTS: Final = "family_shortcuts"

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

# Storage paths relative to HA config
DATA_DIR_NAME: Final = "family_tree"
DB_FILENAME: Final = "family_tree.db"
GAZETTEER_DB_FILENAME: Final = "gazetteer.db"
SCHEMA_VERSION: Final = 1

# Events
EVENT_BIRTHDAY: Final = f"{DOMAIN}_birthday"
EVENT_ANNIVERSARY: Final = f"{DOMAIN}_anniversary"

# Platforms
PLATFORMS: Final = ["sensor", "calendar"]

# Sidebar panel
PANEL_URL_PATH: Final = DOMAIN
PANEL_WEBCOMPONENT: Final = "family-tree-panel"
PANEL_FILENAME: Final = "family-tree-panel.js"
PANEL_MODULE_URL: Final = f"/api/panel_custom/{DOMAIN}"
BRAND_URL_PATH: Final = f"/api/{DOMAIN}/brand"
PANEL_ICON: Final = "mdi:family-tree"
PANEL_TITLE: Final = "Family Tree"

# GeoNames
GEONAMES_BASE_URL: Final = "https://download.geonames.org/export/dump"
GEONAMES_ADMIN1_URL: Final = f"{GEONAMES_BASE_URL}/admin1CodesASCII.txt"
