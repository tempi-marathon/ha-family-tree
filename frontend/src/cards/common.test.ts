import { describe, expect, it } from "vitest";
import {
  collectOnThisDay,
  collectUpcoming,
  daysLabel,
  findSensorEntity,
  kindLabel,
  onThisDayMeta,
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
    const items = collectUpcoming(
      {
        birthdays: [{ name: "Ada", days_until: 5, age: 30 }],
        anniversaries: [{ names: ["A", "B"], days_until: 2, years: 10 }],
        memorials: [{ name: "Sam", days_until: 2, years: 20 }],
      },
      8,
    );
    expect(items).toHaveLength(3);
    expect(items[0].kind).toBe("anniversary");
    expect(items[0].label).toBe("A & B");
    expect(items[1].kind).toBe("memorial");
    expect(items[2].kind).toBe("birthday");
  });
});

describe("collectOnThisDay", () => {
  it("maps kinds and names", () => {
    const items = collectOnThisDay({
      events: [
        { kind: "baptism", name: "Jan", year: 1800, years_ago: 226 },
        { kind: "partnership", names: ["Alex", "Blake"], year: 2015 },
      ],
    });
    expect(items[0]).toMatchObject({ kind: "baptism", label: "Jan", year: 1800 });
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
