# 4. GEDCOM

Import and export use GEDCOM 5.5.1.

## Supported tags

- `INDI`: `NAME` / `GIVN` / `SURN` / `SPFX` / `NICK`, `SEX`, `NOTE`, `OCCU`
- Events: `BIRT`, `BAPM`/`CHR`, `DEAT` (incl. `DEAT Y`), `BURI`, `RESI`
- `FAM`: `HUSB`/`WIFE` (stored as unordered partners), `CHIL`+`PEDI`, `NCHI`,
  `MARR`, `DIV`
- Places: `PLAC` + `MAP`/`LATI`/`LONG`
- Sources: `SOUR` with `TITL`, `WWW`, `AUTH`, `PUBL`; citations with `PAGE`
- Dates: `ABT`, `BEF`, `AFT`, `EST`, `CAL`, `BET`/`AND`, `FROM`/`TO`
- Photos: `OBJE` with `FILE` when `FILE` is an `http://` or `https://` URL (downloaded into local storage). Relative file paths are skipped with an import warning.

## Import modes

- Empty database → full import
- Re-import same file → merge by xref (`external_refs`)
- Replace all → wipe first (confirmation required)

Max upload size: 20 MiB.

## Privacy export

Default export is a full backup (real names, dates, notes).

**Anonymize living people** (Settings checkbox, service field `anonymize_living`, or
`GET /api/family_tree/export_gedcom?anonymize_living=1`):

- Living `INDI` records keep structure (`SEX`, `FAMS`/`FAMC`) but the name becomes
  `Living //`, `RESN privacy` is set, and personal events / notes / citations are
  omitted.
- Deceased people export normally.
- `FAM` partner/child links stay so the tree shape is preserved. Union events
  (`MARR`, `DIV`, …) are omitted if **any** partner is living.
- Download filename is `family_tree_private.ged` when anonymizing.

`RESN` is only a hint — many importers ignore it. This mode redacts content in the
file itself. The result is still plain text; share with care. Omitting living
people entirely is not supported yet.
