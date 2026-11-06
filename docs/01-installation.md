# 1. Installation

## Requirements

- Home Assistant OS / Supervised / Container (2024.12+)
- **Settings → Marketplace** (Home Assistant 2026.11+), or [HACS](https://hacs.xyz/) on 2024.12–2026.10

Family Tree is **not** in the default catalog. Install by adding this GitHub
repo as a **custom repository**.

## Custom repository (recommended)

On Home Assistant 2026.11+:

[![Add this custom repository in the Marketplace](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=tempi-marathon&repository=ha-family-tree&category=integration)

1. Click the badge above, or open **Settings → Marketplace** and add
   `https://github.com/tempi-marathon/ha-family-tree` as a custom repository
   (category **Integration**)
2. Install **Family Tree**
3. Restart Home Assistant
4. Settings → Devices & Services → **Add Integration** → Family Tree
5. Enter a display name (e.g. Family Tree)

### Home Assistant 2026.10 and older (HACS)

1. HACS → Integrations → three-dot menu → **Custom repositories**
2. Repository: `https://github.com/tempi-marathon/ha-family-tree`
3. Category: **Integration**
4. Search for **Family Tree** and install, then continue from step 3 above

[![Add this custom repository in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=tempi-marathon&repository=ha-family-tree&category=integration)

After install and restart, open the config flow:

[![Start config flow](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=family_tree)

The sidebar shows **Family Tree** (`mdi:family-tree`).

## Manual install

Copy `custom_components/family_tree` into your HA `config/custom_components/`
directory, restart, then add the integration as above.
