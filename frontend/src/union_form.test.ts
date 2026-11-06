import { describe, expect, it } from "vitest";
import {
  UNION_TYPES,
  isManualPersonEvent,
  pickStartEvent,
  resolveUnionDateText,
  startEventLabelKey,
  unionDateFields,
  unionStartEventType,
  unionStartLabelKey,
} from "./union_form";

describe("isManualPersonEvent", () => {
  it("is false for events owned by the person dialog", () => {
    for (const type of ["birth", "baptism", "death", "burial"]) {
      expect(isManualPersonEvent({ subject_type: "person", type })).toBe(false);
    }
  });

  it("is true for manually added person events", () => {
    for (const type of ["occupation", "residence"]) {
      expect(isManualPersonEvent({ subject_type: "person", type })).toBe(true);
    }
  });

  it("is false for union events", () => {
    expect(isManualPersonEvent({ subject_type: "union", type: "marriage" })).toBe(false);
  });
});

describe("unionStartEventType / unionStartLabelKey", () => {
  it("maps every relationship type to its start event kind and label", () => {
    expect(UNION_TYPES.map((t) => [t, unionStartEventType(t), unionStartLabelKey(t)])).toEqual([
      ["marriage", "marriage", "event_marriage"],
      ["registered_partnership", "partnership", "event_partnership"],
      ["cohabitation", "cohabitation", "event_start_cohabitation"],
      ["engagement", "engagement", "event_engagement"],
      ["unknown", "marriage", "event_marriage"],
    ]);
  });

  it("falls back to marriage for unexpected types", () => {
    expect(unionStartEventType("something")).toBe("marriage");
  });
});

describe("startEventLabelKey", () => {
  it("labels every start event kind", () => {
    expect(
      ["marriage", "partnership", "cohabitation", "engagement"].map(startEventLabelKey),
    ).toEqual([
      "event_marriage",
      "event_partnership",
      "event_start_cohabitation",
      "event_engagement",
    ]);
  });
});

describe("unionDateFields", () => {
  it("shows the end date only for divorced and separated", () => {
    expect(unionDateFields("ongoing").end).toBe(false);
    expect(unionDateFields("widowed").end).toBe(false);
    expect(unionDateFields("divorced").end).toBe(true);
    expect(unionDateFields("separated").end).toBe(true);
  });
});

describe("pickStartEvent", () => {
  const events = [{ type: "divorce" }, { type: "partnership" }, { type: "cohabitation" }];

  it("prefers the event of the type's own kind", () => {
    expect(pickStartEvent(events, "cohabitation")).toBe(events[2]);
    expect(pickStartEvent(events, "registered_partnership")).toBe(events[1]);
  });

  it("falls back to another start kind so the date stays editable", () => {
    expect(pickStartEvent(events, "unknown")).toBe(events[1]);
    expect(pickStartEvent([{ type: "marriage" }], "cohabitation")).toEqual({ type: "marriage" });
  });

  it("never picks the end event and returns undefined when no start exists", () => {
    expect(pickStartEvent([{ type: "divorce" }], "marriage")).toBeUndefined();
    expect(pickStartEvent([], "marriage")).toBeUndefined();
  });
});

describe("resolveUnionDateText", () => {
  const failed = { text: "", error: true };
  const untouched = { mode: "advanced", qualifier: "exact", first: "winter 1998" };

  it("keeps an untouched legacy free-text date verbatim", () => {
    expect(resolveUnionDateText(failed, untouched, "winter 1998")).toEqual({
      text: "winter 1998",
      error: false,
    });
  });

  it("still reports an error when the legacy text was edited", () => {
    expect(resolveUnionDateText(failed, { ...untouched, first: "summer" }, "winter 1998")).toEqual(
      failed,
    );
  });

  it("still reports an error for invalid new input or a changed qualifier", () => {
    expect(resolveUnionDateText(failed, untouched, "")).toEqual(failed);
    expect(resolveUnionDateText(failed, { ...untouched, qualifier: "about" }, "winter 1998")).toEqual(
      failed,
    );
  });

  it("passes successfully built dates through", () => {
    const ok = { text: "ABT 1990", error: false };
    expect(resolveUnionDateText(ok, untouched, "winter 1998")).toBe(ok);
  });
});

describe("start event mapping (shared with tests/test_websocket_handlers.py)", () => {
  it("matches the contract table", () => {
    expect(Object.fromEntries(UNION_TYPES.map((t) => [t, unionStartEventType(t)]))).toEqual({
      marriage: "marriage",
      registered_partnership: "partnership",
      cohabitation: "cohabitation",
      engagement: "engagement",
      unknown: "marriage",
    });
  });
});
