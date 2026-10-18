import { describe, expect, it, vi } from "vitest";
import { ensureHassAuthHeaders, hassAccessToken, hassAuthHeaders } from "./auth";
import type { HomeAssistant } from "./types";

function baseHass(partial: Record<string, unknown> = {}): HomeAssistant {
  return {
    states: {},
    callService: async () => undefined,
    connection: {
      sendMessagePromise: async () => ({}),
      subscribeMessage: async () => () => undefined,
    },
    localize: (k: string) => k,
    ...partial,
  } as HomeAssistant;
}

describe("hassAccessToken", () => {
  it("reads auth.accessToken getter-style field", () => {
    const hass = baseHass({ auth: { accessToken: "tok-a" } });
    expect(hassAccessToken(hass)).toBe("tok-a");
  });

  it("reads auth.data.access_token", () => {
    const hass = baseHass({ auth: { data: { access_token: "tok-b" } } });
    expect(hassAccessToken(hass)).toBe("tok-b");
  });

  it("reads connection.options.auth.accessToken", () => {
    const hass = baseHass({
      connection: {
        sendMessagePromise: async () => ({}),
        subscribeMessage: async () => () => undefined,
        options: { auth: { accessToken: "tok-c" } },
      },
    });
    expect(hassAccessToken(hass)).toBe("tok-c");
  });

  it("prefers auth.accessToken over data", () => {
    const hass = baseHass({
      auth: { accessToken: "tok-a", data: { access_token: "tok-b" } },
    });
    expect(hassAccessToken(hass)).toBe("tok-a");
  });
});

describe("hassAuthHeaders", () => {
  it("returns empty when no token", () => {
    expect(hassAuthHeaders(undefined)).toEqual({});
    expect(hassAuthHeaders(baseHass())).toEqual({});
  });

  it("sets Authorization Bearer", () => {
    const hass = baseHass({ auth: { accessToken: "abc" } });
    expect(hassAuthHeaders(hass)).toEqual({ Authorization: "Bearer abc" });
  });
});

describe("ensureHassAuthHeaders", () => {
  it("refreshes when expired then returns token", async () => {
    const auth = {
      accessToken: "fresh",
      expired: true,
      refreshAccessToken: vi.fn(async () => {
        auth.accessToken = "fresh";
      }),
    };
    const hass = baseHass({ auth });
    const headers = await ensureHassAuthHeaders(hass);
    expect(auth.refreshAccessToken).toHaveBeenCalledOnce();
    expect(headers).toEqual({ Authorization: "Bearer fresh" });
  });

  it("returns empty when still no token after refresh failure", async () => {
    const hass = baseHass({
      auth: {
        expired: true,
        refreshAccessToken: vi.fn(async () => {
          throw new Error("nope");
        }),
      },
    });
    expect(await ensureHassAuthHeaders(hass)).toEqual({});
  });
});
