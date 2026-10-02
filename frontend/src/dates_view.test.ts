import { describe, expect, it } from "vitest";
import {
  ageFromSortDates,
  daysUntilLabel,
  formatGedcomDate,
  formatLifespanLine,
  gedcomToIsoDate,
  isoToGedcomDate,
  parseSortDateParts,
} from "./dates_view";

describe("isoToGedcomDate", () => {
  it("converts ISO to GEDCOM", () => {
    expect(isoToGedcomDate("1980-01-12")).toBe("12 JAN 1980");
    expect(isoToGedcomDate("2000-09-27")).toBe("27 SEP 2000");
  });

  it("returns empty for invalid input", () => {
    expect(isoToGedcomDate("")).toBe("");
    expect(isoToGedcomDate("not-a-date")).toBe("");
  });
});

describe("gedcomToIsoDate", () => {
  it("converts exact GEDCOM dates to ISO", () => {
    expect(gedcomToIsoDate("12 JAN 1980")).toBe("1980-01-12");
    expect(gedcomToIsoDate(" 27 sep 2000 ")).toBe("2000-09-27");
  });

  it("returns null for qualifiers and ranges", () => {
    expect(gedcomToIsoDate("ABT 1900")).toBeNull();
    expect(gedcomToIsoDate("BET 1 JAN 1910 AND 5 MAR 1912")).toBeNull();
    expect(gedcomToIsoDate("1900")).toBeNull();
  });

  it("round-trips with isoToGedcomDate", () => {
    const iso = "1980-03-15";
    expect(gedcomToIsoDate(isoToGedcomDate(iso))).toBe(iso);
  });
});

describe("formatGedcomDate", () => {
  it("returns em dash for empty", () => {
    expect(formatGedcomDate("")).toBe("—");
    expect(formatGedcomDate(null)).toBe("—");
  });

  it("returns trimmed text", () => {
    expect(formatGedcomDate(" 12 JAN 1980 ")).toBe("12 JAN 1980");
  });
});

describe("daysUntilLabel", () => {
  it("handles today / tomorrow / later", () => {
    expect(daysUntilLabel(0)).toBe("today");
    expect(daysUntilLabel(1)).toBe("tomorrow");
    expect(daysUntilLabel(5, "dagen")).toBe("in 5 dagen");
  });
});

describe("parseSortDateParts", () => {
  it("parses full and partial ISO", () => {
    expect(parseSortDateParts("1980-03-15")).toEqual({
      year: 1980,
      month: 3,
      day: 15,
    });
    expect(parseSortDateParts("1980-03")).toEqual({
      year: 1980,
      month: 3,
      day: undefined,
    });
    expect(parseSortDateParts("1980")).toEqual({
      year: 1980,
      month: undefined,
      day: undefined,
    });
  });
});

describe("ageFromSortDates", () => {
  it("computes living age", () => {
    const today = new Date(2026, 8, 27); // Sep 27 2026
    expect(ageFromSortDates("2000-09-27", null, true, today)).toBe(26);
    expect(ageFromSortDates("2000-09-28", null, true, today)).toBe(25);
  });

  it("computes deceased age", () => {
    expect(ageFromSortDates("1900-01-01", "1950-06-01", false)).toBe(50);
  });
});

describe("formatLifespanLine", () => {
  it("formats living birth with age", () => {
    const today = new Date(2026, 8, 27);
    expect(
      formatLifespanLine({
        birth_date_text: "26 APR 1941",
        birth_sort_date: "1941-04-26",
        is_living: true,
        today,
      }),
    ).toBe("Apr 26, 1941 (85)");
  });

  it("formats deceased year range", () => {
    expect(
      formatLifespanLine({
        birth_date_text: "1905",
        birth_sort_date: "1905",
        death_date_text: "ABT 1995",
        death_sort_date: "1995",
        is_living: false,
      }),
    ).toBe("1905 - about 1995 (±90)");
  });
});
