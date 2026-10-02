import { describe, expect, it } from "vitest";
import {
  buildGedcomDate,
  computeAge,
  formatAge,
  formatDeathCell,
  formatEventDate,
  formatLifespan,
  gedcomToForm,
  toGedcomToken,
} from "./date_format";

const today = new Date(2026, 9, 2); // Oct 2 2026

describe("formatEventDate", () => {
  it("formats exact, partial and qualified dates", () => {
    expect(formatEventDate({ date_text: "26 APR 1941" })).toBe("Apr 26, 1941");
    expect(formatEventDate({ date_text: "APR 1941" })).toBe("Apr 1941");
    expect(formatEventDate({ date_text: "1623" })).toBe("1623");
    expect(formatEventDate({ date_text: "ABT 1784" })).toBe("about 1784");
    expect(formatEventDate({ date_text: "BEF 1 JAN 1800" })).toBe("before Jan 1, 1800");
    expect(formatEventDate({ date_text: "BET 1820 AND 1825" })).toBe(
      "between 1820 and 1825",
    );
    expect(formatEventDate({ date_text: "FROM 1900 TO 1910" })).toBe("1900 – 1910");
  });

  it("localizes to Dutch", () => {
    expect(formatEventDate({ date_text: "26 APR 1941" }, "nl")).toBe("26 apr 1941");
    expect(formatEventDate({ date_text: "ABT 1784" }, "nl")).toBe("ca. 1784");
  });

  it("falls back to sort_date or raw text", () => {
    expect(formatEventDate({ date_text: "", sort_date: "1950-06-01" })).toBe("Jun 1, 1950");
    expect(formatEventDate({ date_text: "spring of 1950" })).toBe("spring of 1950");
    expect(formatEventDate(null)).toBe("");
  });
});

describe("computeAge / formatAge", () => {
  it("is exact when both dates have day precision", () => {
    const birth = { date_text: "18 OCT 1651", sort_date: "1651-10-18" };
    const death = { date_text: "5 OCT 1728", sort_date: "1728-10-05" };
    expect(computeAge(birth, death, false)).toEqual({ years: 76, approx: false });
    expect(formatAge(birth, death, false)).toBe("(76)");
  });

  it("is approximate with year-only or qualified dates", () => {
    const birth = { date_text: "ABT 1784", sort_date: "1784-01-01" };
    const death = { date_text: "19 FEB 1863", sort_date: "1863-02-19" };
    expect(formatAge(birth, death, false)).toBe("(±79)");
  });

  it("computes living age against today", () => {
    expect(formatAge({ date_text: "26 APR 1941" }, null, true, today)).toBe("(85)");
    expect(formatAge({ date_text: "26 NOV 1982" }, null, true, today)).toBe("(43)");
  });

  it("returns empty for unknown birth or deceased without death date", () => {
    expect(formatAge(null, null, true, today)).toBe("");
    expect(formatAge({ date_text: "1900" }, null, false, today)).toBe("");
  });
});

describe("formatDeathCell", () => {
  it("shows date with age, Deceased, or nothing", () => {
    const birth = { date_text: "1623" };
    expect(formatDeathCell(birth, { date_text: "5 MAY 1663" }, false)).toBe(
      "May 5, 1663 (±40)",
    );
    expect(formatDeathCell(birth, null, false)).toBe("Deceased");
    expect(formatDeathCell(birth, null, false, "nl")).toBe("Overleden");
    expect(formatDeathCell(birth, null, true)).toBe("");
  });
});

describe("formatLifespan", () => {
  it("formats living and deceased lifespans", () => {
    expect(formatLifespan({ date_text: "26 APR 1941" }, null, true, "en", today)).toBe(
      "Apr 26, 1941 (85)",
    );
    expect(
      formatLifespan({ date_text: "1905" }, { date_text: "ABT 1995" }, false, "en"),
    ).toBe("1905 - about 1995 (±90)");
    expect(formatLifespan({ date_text: "1905" }, null, false, "en")).toBe("1905 -");
  });
});

describe("toGedcomToken", () => {
  it("normalizes common inputs", () => {
    expect(toGedcomToken("1941-04-26")).toBe("26 APR 1941");
    expect(toGedcomToken("26-04-1941")).toBe("26 APR 1941");
    expect(toGedcomToken("26/4/1941")).toBe("26 APR 1941");
    expect(toGedcomToken("26 apr 1941")).toBe("26 APR 1941");
    expect(toGedcomToken("April 26, 1941")).toBe("26 APR 1941");
    expect(toGedcomToken("26 mei 1941")).toBe("26 MAY 1941");
    expect(toGedcomToken("okt 1941")).toBe("OCT 1941");
    expect(toGedcomToken("1941")).toBe("1941");
  });

  it("rejects invalid input", () => {
    expect(toGedcomToken("26 1941")).toBeNull();
    expect(toGedcomToken("1941-13-01")).toBeNull();
    expect(toGedcomToken("someday")).toBeNull();
  });
});

describe("buildGedcomDate / gedcomToForm", () => {
  it("builds qualified GEDCOM strings", () => {
    expect(buildGedcomDate("exact", "1941-04-26")).toEqual({ value: "26 APR 1941", error: false });
    expect(buildGedcomDate("about", "1784")).toEqual({ value: "ABT 1784", error: false });
    expect(buildGedcomDate("between", "1820", "1825")).toEqual({
      value: "BET 1820 AND 1825",
      error: false,
    });
    expect(buildGedcomDate("between", "1820", "").error).toBe(true);
    expect(buildGedcomDate("exact", "nonsense").error).toBe(true);
    expect(buildGedcomDate("exact", "")).toEqual({ value: "", error: false });
  });

  it("round-trips stored dates into form fields", () => {
    expect(gedcomToForm("ABT 1784")).toEqual({ qualifier: "about", first: "1784", second: "" });
    expect(gedcomToForm("BET 1820 AND 1825")).toEqual({
      qualifier: "between",
      first: "1820",
      second: "1825",
    });
    expect(gedcomToForm("26 APR 1941")).toEqual({
      qualifier: "exact",
      first: "26 APR 1941",
      second: "",
    });
    expect(gedcomToForm("spring 1950").first).toBe("spring 1950");
  });
});
