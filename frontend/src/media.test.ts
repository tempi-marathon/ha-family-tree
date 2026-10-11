import { describe, expect, it } from "vitest";
import { personMediaUrl } from "./media";

describe("personMediaUrl", () => {
  it("builds thumb URL for valid id", () => {
    const id = "a".repeat(32);
    expect(personMediaUrl(id, "thumb")).toBe(`/api/family_tree/media/${id}?variant=thumb`);
  });

  it("rejects invalid ids", () => {
    expect(personMediaUrl("not-valid", "full")).toBe("");
  });
});
