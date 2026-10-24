/** UI smoke tests for Lovelace card custom elements. */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { HomeAssistant } from "../types";

vi.mock("../api", () => ({
  getMyLineage: vi.fn(),
  getTree: vi.fn(),
  getPerson: vi.fn(),
  listPersons: vi.fn(),
}));

import { getMyLineage, getTree } from "../api";
import "./upcoming-card";
import "./on-this-day-card";
import "./mini-tree-card";
import type { FamilyTreeUpcomingCard } from "./upcoming-card";
import type { FamilyTreeOnThisDayCard } from "./on-this-day-card";
import type { FamilyTreeMiniTreeCard } from "./mini-tree-card";

function hassWithSensors(): HomeAssistant {
  return {
    language: "en",
    states: {
      "sensor.family_tree_upcoming_events": {
        entity_id: "sensor.family_tree_upcoming_events",
        state: "2",
        attributes: {
          birthdays: [{ name: "Ada", days_until: 3, age: 30, person_id: "ada" }],
          anniversaries: [],
          memorials: [{ name: "Sam", days_until: 1, years: 10, person_id: "sam" }],
        },
      },
      "sensor.family_tree_on_this_day": {
        entity_id: "sensor.family_tree_on_this_day",
        state: "1",
        attributes: {
          events: [
            {
              kind: "baptism",
              name: "Jan",
              year: 1800,
              years_ago: 226,
              days_until: 0,
            },
          ],
        },
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

function emptyHass(): HomeAssistant {
  return {
    language: "en",
    states: {},
    callService: async () => ({}),
    connection: {
      sendMessagePromise: async <T = unknown>() => ({}) as T,
      subscribeMessage: async () => () => undefined,
    },
    localize: (k) => k,
  };
}

async function mount<T extends HTMLElement>(tag: string): Promise<T> {
  const el = document.createElement(tag) as T;
  document.body.appendChild(el);
  return el;
}

afterEach(() => {
  document.body.replaceChildren();
  vi.clearAllMocks();
});

describe("family-tree-upcoming-card", () => {
  it("renders upcoming items from sensor attributes", async () => {
    const el = await mount<FamilyTreeUpcomingCard>("family-tree-upcoming-card");
    el.setConfig({});
    el.hass = hassWithSensors();
    await el.updateComplete;

    const text = el.shadowRoot?.textContent || "";
    expect(text).toContain("Ada");
    expect(text).toContain("Sam");
    expect(text).toMatch(/Birthday|Memorial/i);
    expect(text).toContain("turns 30");
    expect(text).toContain("10 years");
  });

  it("shows missing-entity when sensor is absent", async () => {
    const el = await mount<FamilyTreeUpcomingCard>("family-tree-upcoming-card");
    el.setConfig({});
    el.hass = emptyHass();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Family Tree sensor not found");
  });

  it("shows empty list message when attributes have no items", async () => {
    const el = await mount<FamilyTreeUpcomingCard>("family-tree-upcoming-card");
    el.setConfig({ entity: "sensor.family_tree_upcoming_events" });
    const hass = hassWithSensors();
    hass.states["sensor.family_tree_upcoming_events"].attributes = {
      birthdays: [],
      anniversaries: [],
      memorials: [],
    };
    el.hass = hass;
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("No upcoming events");
  });

  it("exposes stub config and editor element", () => {
    const stub = (
      customElements.get("family-tree-upcoming-card") as typeof FamilyTreeUpcomingCard
    ).getStubConfig();
    expect(stub).toEqual({});
    const editor = (
      customElements.get("family-tree-upcoming-card") as typeof FamilyTreeUpcomingCard
    ).getConfigElement();
    expect(editor.localName).toBe("family-tree-upcoming-card-editor");
  });
});

describe("family-tree-on-this-day-card", () => {
  it("renders today’s events with years-ago meta", async () => {
    const el = await mount<FamilyTreeOnThisDayCard>("family-tree-on-this-day-card");
    el.setConfig({});
    el.hass = hassWithSensors();
    await el.updateComplete;

    const text = el.shadowRoot?.textContent || "";
    expect(text).toContain("Jan");
    expect(text).toContain("Baptized");
    expect(text).toContain("226 years ago");
  });

  it("shows missing-entity when sensor is absent", async () => {
    const el = await mount<FamilyTreeOnThisDayCard>("family-tree-on-this-day-card");
    el.setConfig({});
    el.hass = emptyHass();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Family Tree sensor not found");
  });
});

describe("family-tree-mini-tree-card", () => {
  beforeEach(() => {
    vi.mocked(getMyLineage).mockResolvedValue({
      person_id: "p1",
      person_name: "Focus Person",
      relatives: {},
    });
    vi.mocked(getTree).mockResolvedValue({
      person: {
        id: "p1",
        given_names: "Focus",
        call_name: "",
        surname_prefix: "",
        surname: "Person",
        sex: "unknown",
        is_living: true,
        notes: "",
        name: "Focus Person",
      },
      parents: [{ id: "par1", name: "Parent One" }],
      grandparents: {},
      partners: [{ partners: [{ name: "Partner Two" }] }] as never,
      children: [{ id: "c1", name: "Child Three" }],
      siblings: [],
    });
  });

  it("loads linked-user tree once and renders relations", async () => {
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    // Allow async _maybeLoad to finish.
    await vi.waitFor(() => {
      expect(el.shadowRoot?.textContent).toContain("Focus Person");
    });

    const text = el.shadowRoot?.textContent || "";
    expect(text).toContain("Parent One");
    expect(text).toContain("Partner Two");
    expect(text).toContain("Child Three");
    expect(getMyLineage).toHaveBeenCalledTimes(1);
    expect(getTree).toHaveBeenCalledTimes(1);
    expect(getTree).toHaveBeenCalledWith(expect.anything(), "p1");
  });

  it("does not re-fetch lineage on subsequent hass updates", async () => {
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() => expect(getTree).toHaveBeenCalledTimes(1));

    el.hass = { ...emptyHass(), language: "nl" };
    await el.updateComplete;
    await Promise.resolve();

    expect(getMyLineage).toHaveBeenCalledTimes(1);
    expect(getTree).toHaveBeenCalledTimes(1);
  });

  it("uses configured person_id without lineage call", async () => {
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ person_id: "explicit-id", use_linked_user: false });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() => expect(getTree).toHaveBeenCalled());

    expect(getMyLineage).not.toHaveBeenCalled();
    expect(getTree).toHaveBeenCalledWith(expect.anything(), "explicit-id");
  });
});
