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

## Import modes

- Empty database → full import
- Re-import same file → merge by xref (`external_refs`)
- Replace all → wipe first (confirmation required)

Max upload size: 20 MiB.
