import { describe, expect, it } from "vitest";
import {
  filterAndSortPeople,
  matchesDateRange,
  matchesFamilyShortcut,
  matchesPlace,
  personDisplayName,
  placeOptionsFromPeople,
} from "./people_view";
import type { LifeEventDto, PersonDto } from "./api";

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
    life_events: partial.life_events,
  };
}

function ev(partial: Partial<LifeEventDto>): LifeEventDto {
  return {
    type: partial.type || "birth",
    sort_date: partial.sort_date ?? null,
    place_id: partial.place_id ?? null,
    place_name: partial.place_name ?? null,
  };
}

const baseFilters = {
  search: "",
  filterLiving: "all",
  filterSex: "",
  sort: "surname" as const,
  familyShortcut: "",
  filterPlace: "",
  dateFrom: "",
  dateTo: "",
};

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

describe("matchesPlace / matchesDateRange", () => {
  const p = person({
    id: "a",
    life_events: [
      ev({
        type: "birth",
        sort_date: "1823-01-01",
        place_id: "pl1",
        place_name: "Tilburg",
      }),
      ev({
        type: "marriage",
        sort_date: "1850-06-15",
        place_id: "pl2",
        place_name: "Amsterdam",
      }),
    ],
  });

  it("matches any life-event place", () => {
    expect(matchesPlace(p, "")).toBe(true);
    expect(matchesPlace(p, "pl1")).toBe(true);
    expect(matchesPlace(p, "pl2")).toBe(true);
    expect(matchesPlace(p, "other")).toBe(false);
  });

  it("matches date range on any sort_date (year-only Jan 1)", () => {
    expect(matchesDateRange(p, "", "")).toBe(true);
    expect(matchesDateRange(p, "1820-01-01", "1830-12-31")).toBe(true);
    expect(matchesDateRange(p, "1840-01-01", "1860-01-01")).toBe(true);
    expect(matchesDateRange(p, "1900-01-01", "1910-01-01")).toBe(false);
    expect(matchesDateRange(p, "1850-06-15", "")).toBe(true);
    expect(matchesDateRange(p, "", "1823-01-01")).toBe(true);
  });

  it("excludes people with no sort_date when a range is set", () => {
    const bare = person({ id: "x", life_events: [ev({ sort_date: null })] });
    expect(matchesDateRange(bare, "1800-01-01", "1900-01-01")).toBe(false);
  });
});

describe("placeOptionsFromPeople", () => {
  it("dedupes and sorts by label", () => {
    const people = [
      person({
        life_events: [
          ev({ place_id: "b", place_name: "Breda" }),
          ev({ place_id: "a", place_name: "Amsterdam" }),
        ],
      }),
      person({
        life_events: [ev({ place_id: "a", place_name: "Amsterdam" })],
      }),
    ];
    expect(placeOptionsFromPeople(people)).toEqual([
      { id: "a", label: "Amsterdam" },
      { id: "b", label: "Breda" },
    ]);
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
      life_events: [
        ev({
          type: "birth",
          sort_date: "1990-05-01",
          place_id: "pl1",
          place_name: "Utrecht",
        }),
      ],
    }),
    person({
      id: "b",
      given_names: "Bart",
      surname_prefix: "de",
      surname: "Vries",
      is_living: false,
      sex: "male",
      updated_at: "2025-01-01",
      life_events: [
        ev({
          type: "death",
          sort_date: "1880-03-20",
          place_id: "pl2",
          place_name: "Rotterdam",
        }),
      ],
    }),
  ];

  it("filters living and searches", () => {
    const living = filterAndSortPeople(people, {
      ...baseFilters,
      filterLiving: "living",
    });
    expect(living.map((p) => p.id)).toEqual(["a"]);

    const search = filterAndSortPeople(people, {
      ...baseFilters,
      search: "vries",
    });
    expect(search.map((p) => p.id)).toEqual(["b"]);
  });

  it("filters by family, place, and date together", () => {
    const byFamily = filterAndSortPeople(people, {
      ...baseFilters,
      familyShortcut: "vries",
    });
    expect(byFamily.map((p) => p.id)).toEqual(["b"]);

    const byPlace = filterAndSortPeople(people, {
      ...baseFilters,
      filterPlace: "pl1",
    });
    expect(byPlace.map((p) => p.id)).toEqual(["a"]);

    const byDate = filterAndSortPeople(people, {
      ...baseFilters,
      dateFrom: "1870-01-01",
      dateTo: "1890-12-31",
    });
    expect(byDate.map((p) => p.id)).toEqual(["b"]);
  });

  it("sorts by surname then updated", () => {
    const bySurname = filterAndSortPeople(people, {
      ...baseFilters,
      sort: "surname",
    });
    expect(bySurname.map((p) => p.surname)).toEqual(["Jansen", "Vries"]);

    const byUpdated = filterAndSortPeople(people, {
      ...baseFilters,
      sort: "updated",
    });
    expect(byUpdated.map((p) => p.id)).toEqual(["b", "a"]);
  });
});
