import { describe, expect, it } from "vitest";
import {
  collectOnThisDay,
  collectUpcoming,
  daysLabel,
  findSensorEntity,
  kindClass,
  kindLabel,
  onThisDayMeta,
  upcomingMeta,
} from "./common";
import type { HomeAssistant } from "../types";

function hassStub(language = "en"): HomeAssistant {
  return {
    language,
    states: {
      "sensor.family_tree_upcoming_events": {
        entity_id: "sensor.family_tree_upcoming_events",
        state: "3",
        attributes: {},
      },
      "sensor.other": {
        entity_id: "sensor.other",
        state: "1",
        attributes: {},
      },
    },
    callService: async () => ({}),
    connection: {
      sendMessagePromise: async <T = unknown>() => ({}) as T,
      subscribeMessage: async () => () => undefined,
    },
    localize: (k) => k,
  };
}

describe("collectUpcoming", () => {
  it("merges and sorts by days_until", () => {
    const en = hassStub("en");
    const items = collectUpcoming(
      {
        birthdays: [{ name: "Ada", days_until: 5, age: 30, person_id: "p1" }],
        anniversaries: [
          {
            names: ["A", "B"],
            days_until: 2,
            years: 10,
            person_ids: ["p2", "p3"],
          },
        ],
        memorials: [{ name: "Sam", days_until: 2, years: 20, person_id: "p4" }],
      },
      8,
      en,
    );
    expect(items).toHaveLength(3);
    expect(items[0].kind).toBe("anniversary");
    expect(items[0].label).toBe("A & B");
    expect(items[0].detail).toBe("10 years");
    expect(items[0].person_ids).toEqual(["p2", "p3"]);
    expect(items[1].kind).toBe("memorial");
    expect(items[1].detail).toBe("20 years");
    expect(items[2].kind).toBe("birthday");
    expect(items[2].detail).toBe("turns 30");
    expect(items[2].person_id).toBe("p1");
  });

  it("formats Dutch turns/years", () => {
    const nl = hassStub("nl");
    const items = collectUpcoming(
      {
        birthdays: [{ name: "Ada", days_until: 1, age: 52 }],
        anniversaries: [],
        memorials: [],
      },
      8,
      nl,
    );
    expect(items[0].detail).toBe("wordt 52");
  });
});

describe("upcomingMeta", () => {
  it("joins detail and days", () => {
    const en = hassStub("en");
    expect(upcomingMeta(en, { days_until: 4, detail: "turns 52" })).toBe(
      "turns 52 · in 4 days",
    );
    expect(upcomingMeta(en, { days_until: 0, detail: undefined })).toBe("today");
  });
});

describe("collectOnThisDay", () => {
  it("maps kinds and names", () => {
    const items = collectOnThisDay({
      events: [
        {
          kind: "baptism",
          name: "Jan",
          year: 1800,
          years_ago: 226,
          person_id: "j1",
        },
        { kind: "partnership", names: ["Alex", "Blake"], year: 2015 },
      ],
    });
    expect(items[0]).toMatchObject({
      kind: "baptism",
      label: "Jan",
      year: 1800,
      person_id: "j1",
    });
    expect(items[1].label).toBe("Alex & Blake");
  });
});

describe("i18n helpers", () => {
  it("labels days and kinds in en/nl", () => {
    const en = hassStub("en");
    const nl = hassStub("nl");
    expect(daysLabel(en, 0)).toBe("today");
    expect(daysLabel(nl, 1)).toBe("morgen");
    expect(kindLabel(en, "memorial")).toBe("Memorial");
    expect(kindLabel(nl, "baptism")).toBe("Gedoopt");
    expect(kindClass("birthday")).toBe("kind--birthday");
  });

  it("formats on-this-day meta with years ago preferred", () => {
    const en = hassStub("en");
    expect(onThisDayMeta(en, { kind: "birth", label: "Ada", years_ago: 6, year: 2020 })).toBe(
      "6 years ago",
    );
    expect(onThisDayMeta(en, { kind: "birth", label: "Ada", year: 2020 })).toBe("2020");
  });
});

describe("findSensorEntity", () => {
  it("finds by suffix", () => {
    const hass = hassStub();
    expect(findSensorEntity(hass, "upcoming_events")?.entity_id).toBe(
      "sensor.family_tree_upcoming_events",
    );
    expect(findSensorEntity(hass, "missing")).toBeNull();
  });
});
