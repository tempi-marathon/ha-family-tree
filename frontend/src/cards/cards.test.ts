/** UI smoke tests for Lovelace card custom elements. */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { HomeAssistant } from "../types";

vi.mock("../api", () => ({
  getMyLineage: vi.fn(),
  getTree: vi.fn(),
  getPerson: vi.fn(),
  listPersons: vi.fn(),
}));

import { getMyLineage, getPerson, getTree, listPersons } from "../api";
import "./upcoming-card";
import "./on-this-day-card";
import "./mini-tree-card";
import "./editor";
import type { FamilyTreeUpcomingCard } from "./upcoming-card";
import type { FamilyTreeOnThisDayCard } from "./on-this-day-card";
import type { FamilyTreeMiniTreeCard } from "./mini-tree-card";
import type { FamilyTreeCardEditorForm } from "./editor";
import { PersonDialogController } from "./person-dialog";

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
    expect(text).toContain("10 years ago");
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

  it("orders rows as parents → focus → partner → children", async () => {
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() => {
      expect(el.shadowRoot?.querySelector(".tree-row--focus")).toBeTruthy();
    });

    const rows = [
      ...(el.shadowRoot?.querySelectorAll(".tree-row") || []),
    ] as HTMLElement[];
    expect(rows.map((r) => r.className)).toEqual([
      expect.stringContaining("tree-row--parents"),
      expect.stringContaining("tree-row--focus"),
      expect.stringContaining("tree-row--partner"),
      expect.stringContaining("tree-row--children"),
    ]);
    expect(el.shadowRoot?.querySelectorAll(".tree-card-wrap").length).toBeGreaterThanOrEqual(4);
    expect(el.shadowRoot?.querySelector(".node--focus")).toBeTruthy();
  });

  // US1: reliable linked-user resolution
  it("recovers after a transient lineage failure without re-config", async () => {
    vi.mocked(getMyLineage)
      .mockRejectedValueOnce(new Error("connection not ready"))
      .mockResolvedValue({
        person_id: "p1",
        person_name: "Focus Person",
        relatives: {},
      });
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() => expect(getMyLineage).toHaveBeenCalled());
    // First lookup failed → nothing cached, nothing loaded yet.
    expect(getTree).not.toHaveBeenCalled();

    // A later hass/connection-ready update retries automatically.
    el.hass = { ...emptyHass(), language: "nl" };
    await el.updateComplete;
    await vi.waitFor(() => {
      expect(el.shadowRoot?.textContent).toContain("Focus Person");
    });
    expect(getTree).toHaveBeenCalledWith(expect.anything(), "p1");
  });

  it("loads once hass arrives after the first render", async () => {
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    await el.updateComplete; // first render, hass not set yet
    expect(getTree).not.toHaveBeenCalled();

    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() =>
      expect(getTree).toHaveBeenCalledWith(expect.anything(), "p1"),
    );
  });

  it("shows a not-linked message when the linked user has no person", async () => {
    vi.mocked(getMyLineage).mockResolvedValue({
      person_id: "",
      person_name: "",
      relatives: {},
    } as never);
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() => {
      expect(el.shadowRoot?.textContent).toContain("not linked");
    });
    expect(getTree).not.toHaveBeenCalled();
  });

  it("renders the focal person when the linked person has no relatives", async () => {
    vi.mocked(getTree).mockResolvedValue({
      person: { id: "p1", name: "Lonely Person", sex: "unknown", is_living: true },
      parents: [],
      grandparents: {},
      partners: [],
      children: [],
      siblings: [],
    } as never);
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() =>
      expect(el.shadowRoot?.querySelector(".node--focus")).toBeTruthy(),
    );
    expect(el.shadowRoot?.textContent).toContain("Lonely Person");
    expect(el.shadowRoot?.textContent).not.toContain("not linked");
  });

  // US2: siblings on the focus row
  it("renders siblings on the focus row ordered by birth date", async () => {
    vi.mocked(getTree).mockResolvedValue({
      person: {
        id: "p1",
        name: "Focus Person",
        sex: "unknown",
        is_living: true,
        birth_sort_date: "1980-01-01",
      },
      parents: [],
      grandparents: {},
      partners: [],
      children: [],
      siblings: [
        { id: "s1", name: "Sib A", birth_sort_date: "1978-01-01" },
        { id: "s2", name: "Sib B", birth_sort_date: "1982-01-01" },
        { id: "s3", name: "Sib C", birth_sort_date: "1984-01-01" },
      ],
    } as never);
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() =>
      expect(el.shadowRoot?.querySelector(".tree-group--focus")).toBeTruthy(),
    );
    const group = el.shadowRoot!.querySelector(".tree-group--focus")!;
    const names = [...group.querySelectorAll(".node-name")].map(
      (n) => n.textContent?.trim() || "",
    );
    // Focus (1980) sits between Sib A (1978) and Sib B (1982).
    expect(names).toEqual(["Sib A", "Focus Person", "Sib B", "Sib C"]);
    expect(group.querySelectorAll(".tree-card-wrap").length).toBe(4);
  });

  it("opens the quick-view when a sibling is clicked", async () => {
    vi.mocked(getTree).mockResolvedValue({
      person: {
        id: "p1",
        name: "Focus Person",
        sex: "unknown",
        is_living: true,
        birth_sort_date: "1980-01-01",
      },
      parents: [],
      grandparents: {},
      partners: [],
      children: [],
      siblings: [{ id: "s1", name: "Sib A", birth_sort_date: "1978-01-01" }],
    } as never);
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() => {
      expect(el.shadowRoot?.textContent).toContain("Sib A");
    });
    const group = el.shadowRoot!.querySelector(".tree-group--focus")!;
    const sibBtn = [...group.querySelectorAll("button.node")].find((b) =>
      b.textContent?.includes("Sib A"),
    ) as HTMLButtonElement;
    sibBtn.click();
    await vi.waitFor(() =>
      expect(getPerson).toHaveBeenCalledWith(expect.anything(), "s1"),
    );
  });

  it("renders only the focus when there are no siblings", async () => {
    const el = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    el.setConfig({ use_linked_user: true });
    el.hass = emptyHass();
    await el.updateComplete;
    await vi.waitFor(() =>
      expect(el.shadowRoot?.querySelector(".tree-group--focus")).toBeTruthy(),
    );
    const group = el.shadowRoot!.querySelector(".tree-group--focus")!;
    expect(group.querySelectorAll(".tree-card-wrap").length).toBe(1);
  });
});

describe("family-tree-card-editor-form", () => {
  beforeEach(() => {
    vi.mocked(listPersons).mockResolvedValue({
      persons: [
        {
          id: "p1",
          given_names: "Ada",
          call_name: "",
          surname_prefix: "",
          surname: "Lovelace",
          sex: "female",
          is_living: false,
          notes: "",
          display_name: "Ada Lovelace",
        },
        {
          id: "p2",
          given_names: "Charles",
          call_name: "",
          surname_prefix: "",
          surname: "Babbage",
          sex: "male",
          is_living: false,
          notes: "",
          display_name: "Charles Babbage",
        },
      ],
      total: 2,
    });
  });

  it("hides person combo when linked user is on", async () => {
    const el = await mount<FamilyTreeCardEditorForm>("family-tree-card-editor-form");
    el.hass = emptyHass();
    el.showPersonPicker = true;
    el.showLinkedUser = true;
    el.config = { use_linked_user: true };
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Use linked Home Assistant user");
    expect(el.shadowRoot?.querySelector('input[type="search"]')).toBeNull();
  });

  it("shows searchable person combo when linked user is off", async () => {
    const el = await mount<FamilyTreeCardEditorForm>("family-tree-card-editor-form");
    el.hass = emptyHass();
    el.showPersonPicker = true;
    el.showLinkedUser = true;
    el.config = { use_linked_user: false };
    await el.updateComplete;
    await vi.waitFor(() => expect(listPersons).toHaveBeenCalled());

    const search = el.shadowRoot?.querySelector(
      'input[type="search"]',
    ) as HTMLInputElement | null;
    expect(search).toBeTruthy();
    expect(el.shadowRoot?.querySelector("#ft-card-title")).toBeTruthy();

    search!.value = "Ada";
    search!.dispatchEvent(new Event("input", { bubbles: true }));
    search!.dispatchEvent(new Event("focus", { bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Ada Lovelace");
  });
});

describe("PersonDialogController", () => {
  it("renders avatar + name once in the header and hides empty fields", async () => {
    vi.mocked(getPerson).mockResolvedValue({
      person: {
        id: "p1",
        given_names: "Maarten Kees",
        call_name: "",
        surname_prefix: "",
        surname: "Molenschot",
        sex: "male",
        is_living: true,
        notes: "",
        display_name: "Maarten Molenschot",
        birth: { date_text: "26 NOV 1982", sort_date: "1982-11-26" },
        death: null,
      },
      parents: [],
      grandparents: {},
      partners: [],
      children: [],
      siblings: [],
      citations: [],
      media: [],
      tree: null,
    } as never);

    const host = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    host.hass = emptyHass();
    const dialog = new PersonDialogController(host);
    dialog.open("p1");
    await vi.waitFor(() => expect(getPerson).toHaveBeenCalled());
    host.requestUpdate();
    await host.updateComplete;

    // Render via controller into a throwaway container for assertions.
    const wrap = document.createElement("div");
    const litRender = await import("lit");
    litRender.render(dialog.render(), wrap);
    await vi.waitFor(() => {
      expect(wrap.querySelector(".ft-modal-title")?.textContent).toContain(
        "Maarten Molenschot",
      );
    });

    expect(wrap.querySelectorAll(".ft-modal-title").length).toBe(1);
    expect(wrap.querySelector(".ft-person-name")).toBeNull();
    expect(wrap.querySelector(".ft-modal-head .person-avatar")).toBeTruthy();
    const text = wrap.textContent || "";
    expect(text).toContain("First name(s)");
    expect(text).toContain("Maarten Kees");
    expect(text).toContain("Last name");
    expect(text).toContain("Molenschot");
    expect(text).toContain("Male");
    expect(text).not.toContain("Preferred name");
    expect(text).not.toContain("Notes");
  });
});

describe("PersonDialogController tree section", () => {
  const basePerson = {
    id: "p1",
    given_names: "Focus",
    call_name: "",
    surname_prefix: "",
    surname: "Person",
    sex: "unknown",
    is_living: true,
    notes: "",
    display_name: "Focus Person",
  };

  function detailWithTree() {
    return {
      person: basePerson,
      events: [],
      citations: [],
      media: [],
      tree: {
        person: { id: "p1", name: "Focus Person" },
        parents: [{ id: "par1", name: "Parent One" }],
        grandparents: {},
        partners: [
          { partners: [{ id: "pt1", name: "Partner A" }] },
          { partners: [{ id: "pt2", name: "Partner B" }] },
        ],
        children: [{ id: "c1", name: "Child One" }],
        siblings: [],
      },
    } as never;
  }

  async function openDialog(detail: unknown) {
    vi.mocked(getPerson).mockResolvedValue(detail as never);
    const host = await mount<FamilyTreeMiniTreeCard>("family-tree-mini-tree-card");
    host.hass = emptyHass();
    const dialog = new PersonDialogController(host);
    dialog.open("p1");
    await vi.waitFor(() => expect(getPerson).toHaveBeenCalled());
    const wrap = document.createElement("div");
    const litRender = await import("lit");
    const rerender = () => litRender.render(dialog.render(), wrap);
    await vi.waitFor(() => {
      rerender();
      expect(wrap.querySelector(".ft-modal-title")?.textContent).toContain(
        "Focus Person",
      );
    });
    return { dialog, wrap, rerender };
  }

  // US3: both the Upcoming and On This Day cards share this controller, so the
  // tree section proven here is what both cards display.
  it("shows parents, all partners, and children below the details", async () => {
    const { wrap } = await openDialog(detailWithTree());
    const text = wrap.textContent || "";
    expect(text).toContain("Parent One");
    expect(text).toContain("Partner A");
    expect(text).toContain("Partner B");
    expect(text).toContain("Child One");
    expect(wrap.querySelectorAll(".ft-tree-group").length).toBe(3);
  });

  it("re-roots the dialog to a relative when clicked", async () => {
    const { dialog, wrap } = await openDialog(detailWithTree());
    vi.mocked(getPerson).mockClear();
    const relBtn = [...wrap.querySelectorAll("button.ft-tree-person")].find((b) =>
      b.textContent?.includes("Child One"),
    ) as HTMLButtonElement;
    relBtn.click();
    expect(dialog.openId).toBe("c1");
    await vi.waitFor(() =>
      expect(getPerson).toHaveBeenCalledWith(expect.anything(), "c1"),
    );
  });

  it("omits the tree section when the person has no relatives", async () => {
    const { wrap } = await openDialog({
      person: basePerson,
      events: [],
      citations: [],
      media: [],
      tree: {
        person: { id: "p1", name: "Focus Person" },
        parents: [],
        grandparents: {},
        partners: [],
        children: [],
        siblings: [],
      },
    });
    expect(wrap.querySelector(".ft-tree")).toBeNull();
    // Details still render.
    expect(wrap.textContent).toContain("Focus Person");
  });

  it("renders unchanged when tree is null", async () => {
    const { wrap } = await openDialog({
      person: basePerson,
      events: [],
      citations: [],
      media: [],
      tree: null,
    });
    expect(wrap.querySelector(".ft-tree")).toBeNull();
  });
});
