# 1. Installation

## Requirements

- Home Assistant OS / Supervised / Container (2024.12+)
- [HACS](https://hacs.xyz/) (or **Settings → Marketplace** on Home Assistant 2026.11+)

Family Tree is **not** in the default HACS / Marketplace catalog. Install by
adding this GitHub repo as a **custom repository**.

## Custom repository (recommended)

1. HACS → Integrations → three-dot menu → **Custom repositories**
2. Repository: `https://github.com/tempi-marathon/ha-family-tree`
3. Category: **Integration**
4. Search for **Family Tree** and install
5. Restart Home Assistant
6. Settings → Devices & Services → **Add Integration** → Family Tree
7. Enter a display name (e.g. Family Tree)

[![Add this custom repository in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=tempi-marathon&repository=ha-family-tree&category=integration)

From **2026.11**, you can add the same custom repository under
**Settings → Marketplace** (the HACS custom-repo UI still works after upgrade).

After install and restart, open the config flow:

[![Start config flow](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=family_tree)

The sidebar shows **Family Tree** (`mdi:family-tree`).

## Manual install

Copy `custom_components/family_tree` into your HA `config/custom_components/`
directory, restart, then add the integration as above.
