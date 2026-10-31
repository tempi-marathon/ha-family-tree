import { describe, expect, it } from "vitest";
import {
  flattenChildren,
  flattenParents,
  flattenSiblings,
  generationLabel,
  nodeName,
  partnerNames,
  type TreeNodeSummary,
} from "./tree_view";

describe("nodeName", () => {
  it("prefers name / display_name / parts", () => {
    expect(nodeName({ name: "Ada" })).toBe("Ada");
    expect(nodeName({ display_name: "Bob" })).toBe("Bob");
    expect(
      nodeName({ given_names: "Cara", surname_prefix: "de", surname: "Jong" }),
    ).toBe("Cara de Jong");
  });
});

describe("flattenParents / children", () => {
  it("maps summaries", () => {
    expect(
      flattenParents([{ id: "1", name: "Parent", sex: "female", is_living: true }]),
    ).toEqual([
      {
        id: "1",
        name: "Parent",
        sex: "female",
        is_living: true,
        profile_media_id: null,
        birth_sort_date: null,
      },
    ]);
    expect(flattenChildren([{ id: "2", given_names: "Kid", surname: "X" }])).toEqual([
      {
        id: "2",
        name: "Kid X",
        sex: undefined,
        is_living: false,
        profile_media_id: null,
        birth_sort_date: null,
      },
    ]);
  });
});

describe("flattenSiblings", () => {
  const focus: TreeNodeSummary = {
    id: "f",
    name: "Focus",
    birth_sort_date: "1980-05-01",
  };

  it("orders focus + siblings by birth date, oldest first", () => {
    const result = flattenSiblings(focus, [
      { id: "s1", name: "Older", birth_sort_date: "1978-01-01" },
      { id: "s2", name: "Younger", birth_sort_date: "1985-01-01" },
    ]);
    expect(result.map((s) => s.id)).toEqual(["s1", "f", "s2"]);
  });

  it("places people without a birth date last, tiebroken by name", () => {
    const result = flattenSiblings(focus, [
      { id: "s1", name: "Zoe" },
      { id: "s2", name: "Amy" },
    ]);
    // Focus (dated) first, then undated by name.
    expect(result.map((s) => s.id)).toEqual(["f", "s2", "s1"]);
  });

  it("returns only the focus when there are no siblings", () => {
    expect(flattenSiblings(focus, []).map((s) => s.id)).toEqual(["f"]);
    expect(flattenSiblings(focus, undefined).map((s) => s.id)).toEqual(["f"]);
  });
});

describe("partnerNames", () => {
  it("collects nested partner names", () => {
    expect(
      partnerNames([
        {
          partners: [{ name: "Alex" }, { given_names: "Sam", surname: "Lee" }],
        },
      ]),
    ).toEqual(["Alex", "Sam Lee"]);
  });
});

describe("generationLabel", () => {
  it("labels up and down", () => {
    expect(generationLabel(1, "up")).toBe("parents");
    expect(generationLabel(2, "down")).toBe("grandchildren");
    expect(generationLabel(0, "up")).toBe("self");
  });
});
