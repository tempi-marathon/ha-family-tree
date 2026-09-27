# 1. Installation

## Requirements

- Home Assistant OS / Supervised / Container (2024.12+)
- [HACS](https://hacs.xyz/)

## HACS (recommended)

1. HACS → Integrations → three-dot menu → **Custom repositories**
2. Repository: `https://github.com/tempi-marathon/ha-family-tree`
3. Category: **Integration**
4. Search for **Family Tree** and install
5. Restart Home Assistant
6. Settings → Devices & Services → **Add Integration** → Family Tree
7. Enter a display name (e.g. Family Tree)

The sidebar shows **Family Tree** (`mdi:family-tree`).

## Manual install

Copy `custom_components/family_tree` into your HA `config/custom_components/`
directory, restart, then add the integration as above.
