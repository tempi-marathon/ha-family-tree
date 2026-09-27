import { describe, expect, it } from "vitest";
import {
  flattenChildren,
  flattenParents,
  generationLabel,
  nodeName,
  partnerNames,
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
    ).toEqual([{ id: "1", name: "Parent", sex: "female", is_living: true }]);
    expect(flattenChildren([{ id: "2", given_names: "Kid", surname: "X" }])).toEqual([
      { id: "2", name: "Kid X", sex: undefined, is_living: false },
    ]);
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
