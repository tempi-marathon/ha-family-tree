import { describe, expect, it } from "vitest";
import { apiUrl, personMediaApiPath, personMediaUrl } from "./media";
import type { HomeAssistant } from "./types";

describe("personMediaApiPath", () => {
  it("builds thumb path for valid id", () => {
    const id = "a".repeat(32);
    expect(personMediaApiPath(id, "thumb")).toBe(`/api/family_tree/media/${id}?variant=thumb`);
  });

  it("rejects invalid ids", () => {
    expect(personMediaApiPath("not-valid", "full")).toBe("");
  });
});

describe("personMediaUrl", () => {
  it("builds thumb URL for valid id", () => {
    const id = "a".repeat(32);
    expect(personMediaUrl(id, "thumb")).toBe(`/api/family_tree/media/${id}?variant=thumb`);
  });

  it("uses hassUrl when provided", () => {
    const id = "b".repeat(32);
    const hass = {
      hassUrl: (p: string) => `/signed${p}`,
    } as HomeAssistant;
    expect(personMediaUrl(id, "thumb", hass)).toBe(
      `/signed/api/family_tree/media/${id}?variant=thumb`,
    );
  });
});

describe("apiUrl", () => {
  it("returns path unchanged without hass", () => {
    expect(apiUrl(undefined, "/api/foo")).toBe("/api/foo");
  });
});
