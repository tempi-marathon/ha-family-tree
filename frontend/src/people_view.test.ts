import { describe, expect, it } from "vitest";
import {
  filterAndSortPeople,
  matchesFamilyShortcut,
  personDisplayName,
} from "./people_view";
import type { PersonDto } from "./api";

function person(partial: Partial<PersonDto>): PersonDto {
  return {
    id: partial.id || "1",
    given_names: partial.given_names || "",
    call_name: partial.call_name || "",
    surname_prefix: partial.surname_prefix || "",
    surname: partial.surname || "",
    sex: partial.sex || "unknown",
    is_living: partial.is_living ?? true,
    notes: partial.notes || "",
    display_name: partial.display_name,
    updated_at: partial.updated_at,
  };
}

describe("personDisplayName", () => {
  it("uses call name and Dutch prefix", () => {
    expect(
      personDisplayName(
        person({
          given_names: "Johannes Petrus",
          call_name: "Jan",
          surname_prefix: "van",
          surname: "Berg",
        }),
      ),
    ).toBe("Jan van Berg");
  });

  it("falls back to first given name", () => {
    expect(
      personDisplayName(
        person({ given_names: "Anna Maria", surname: "Jansen" }),
      ),
    ).toBe("Anna Jansen");
  });
});

describe("matchesFamilyShortcut", () => {
  it("matches bare and prefixed surnames", () => {
    const p = person({ surname_prefix: "van", surname: "Iersel" });
    expect(matchesFamilyShortcut(p, "van iersel")).toBe(true);
    expect(matchesFamilyShortcut(p, "iersel")).toBe(true);
    expect(matchesFamilyShortcut(p, "smith")).toBe(false);
  });
});

describe("filterAndSortPeople", () => {
  const people = [
    person({
      id: "a",
      given_names: "Anna",
      surname: "Jansen",
      is_living: true,
      sex: "female",
      updated_at: "2024-01-01",
    }),
    person({
      id: "b",
      given_names: "Bart",
      surname_prefix: "de",
      surname: "Vries",
      is_living: false,
      sex: "male",
      updated_at: "2025-01-01",
    }),
  ];

  it("filters living and searches", () => {
    const living = filterAndSortPeople(people, {
      search: "",
      filterLiving: "living",
      filterSex: "",
      sort: "surname",
      familyShortcut: "",
    });
    expect(living.map((p) => p.id)).toEqual(["a"]);

    const search = filterAndSortPeople(people, {
      search: "vries",
      filterLiving: "all",
      filterSex: "",
      sort: "surname",
      familyShortcut: "",
    });
    expect(search.map((p) => p.id)).toEqual(["b"]);
  });

  it("sorts by surname then updated", () => {
    const bySurname = filterAndSortPeople(people, {
      search: "",
      filterLiving: "all",
      filterSex: "",
      sort: "surname",
      familyShortcut: "",
    });
    expect(bySurname.map((p) => p.surname)).toEqual(["Jansen", "Vries"]);

    const byUpdated = filterAndSortPeople(people, {
      search: "",
      filterLiving: "all",
      filterSex: "",
      sort: "updated",
      familyShortcut: "",
    });
    expect(byUpdated.map((p) => p.id)).toEqual(["b", "a"]);
  });
});
