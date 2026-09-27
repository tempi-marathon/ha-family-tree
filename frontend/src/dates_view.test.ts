import { describe, expect, it } from "vitest";
import {
  ageFromSortDates,
  daysUntilLabel,
  formatGedcomDate,
  parseSortDateParts,
} from "./dates_view";

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
