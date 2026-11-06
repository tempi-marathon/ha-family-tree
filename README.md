# Family Tree for Home Assistant

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white)](https://hacs.xyz/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.12%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Policy-green?style=for-the-badge&logo=github&logoColor=white)](SECURITY.md)
[![Buy me a coffee](https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-red?style=for-the-badge&logo=kofi)]([https://www.buymeacoffee.com/clooos](https://ko-fi.com/tempi_marathon/tip))


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

Family Tree is **not** in the default catalog. Add this GitHub repo as a
**custom repository** in **Settings → Marketplace** (Home Assistant 2026.11+),
then install it.

[![Add this custom repository in the Marketplace](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=tempi-marathon&repository=ha-family-tree&category=integration)

1. Click the badge above (or add `https://github.com/tempi-marathon/ha-family-tree`
   as a custom repository, category **Integration**)
2. Install **Family Tree**, restart Home Assistant
3. Settings → Devices & Services → Add Integration → **Family Tree**

On Home Assistant 2026.10 or older, use HACS instead: HACS → Integrations → ⋮ →
**Custom repositories**, or [this link](https://my.home-assistant.io/redirect/hacs_repository/?owner=tempi-marathon&repository=ha-family-tree&category=integration).

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


## Donate

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Z6A229BZSN)

## License

[MIT](LICENSE)
