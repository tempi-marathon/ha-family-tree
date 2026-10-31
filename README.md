# Family Tree for Home Assistant

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white)](https://hacs.xyz/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.12%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Policy-green?style=for-the-badge&logo=github&logoColor=white)](SECURITY.md)

Local genealogy for Home Assistant: people, unions, parent–child links, places,
sources, tree view, GEDCOM import/export, offline place lookup, calendar and
sensors. Family data stays on your Home Assistant box (SQLite under
`/config/family_tree/`).

## Features

- **People & relationships** — gender-neutral unions, typed parent–child links
- **Tree view** — grandparents, parents, partners, children
- **GEDCOM 5.5.1** — import and export
- **Offline gazetteer** — GeoNames country packs, searchable locally
- **Sidebar panel** — full management UI (English / Dutch)
- **Calendar & sensors** — birthdays, anniversaries, memorials; on-this-day and upcoming-events sensors
- **Dashboard cards** — upcoming events, on this day, and mini tree with siblings (bundled Lovelace cards); quick-view modals show the person's immediate family
- **Access** — admins edit; other HA users read-only

## Install

Family Tree is **not** in the default HACS catalog. Add this GitHub repo as a
**custom repository**, then install it.

1. HACS → Integrations → ⋮ → **Custom repositories**
2. Add `https://github.com/tempi-marathon/ha-family-tree`, category **Integration**
3. Install **Family Tree**, restart Home Assistant
4. Settings → Devices & Services → Add Integration → **Family Tree**

[![Add this custom repository in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=tempi-marathon&repository=ha-family-tree&category=integration)

From **2026.11**, you can add the same custom repository under
**Settings → Marketplace** (the HACS custom-repo UI still works after upgrade).

After install and restart, open the config flow:

[![Start config flow](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=family_tree)

Full guide: [1. Installation](docs/01-installation.md) ·
[2. Configuration](docs/02-configuration.md) ·
[3. Usage](docs/03-usage.md) ·
[4. GEDCOM](docs/04-gedcom.md) ·
[5. Migrating an existing tree](docs/05-migration.md)

## Privacy

- Tree data lives only in `/config/family_tree/` and HA backups.
- Do not commit `.ged` or `.db` files to git.
- Prefer HA MFA when using Nabu Casa remote access.

## License

[MIT](LICENSE)
