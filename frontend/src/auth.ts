/** Home Assistant Bearer token for authenticated HTTP requests. */

import type { HomeAssistant } from "./types";

type HassAuth = {
  accessToken?: string;
  expired?: boolean;
  refreshAccessToken?: () => Promise<void>;
  data?: { access_token?: string };
};

type HassWithAuth = HomeAssistant & {
  auth?: HassAuth;
  connection?: {
    options?: { auth?: { accessToken?: string } };
  };
};

/** Resolve the current access token from common hass shapes. */
export function hassAccessToken(hass: HomeAssistant | undefined): string {
  if (!hass) return "";
  const h = hass as HassWithAuth;
  const fromAuthGetter = h.auth?.accessToken;
  const fromAuthData = h.auth?.data?.access_token;
  const fromConnection = h.connection?.options?.auth?.accessToken;
  return (fromAuthGetter || fromAuthData || fromConnection || "").trim();
}

export function hassAuthHeaders(hass: HomeAssistant | undefined): Record<string, string> {
  const headers: Record<string, string> = {};
  const bearer = hassAccessToken(hass);
  if (bearer) headers.Authorization = `Bearer ${bearer}`;
  return headers;
}

/**
 * Refresh expired tokens when possible, then return Authorization headers.
 * Returns empty headers when no token is available (caller must not fetch).
 */
export async function ensureHassAuthHeaders(
  hass: HomeAssistant | undefined,
): Promise<Record<string, string>> {
  if (!hass) return {};
  const auth = (hass as HassWithAuth).auth;
  if (auth?.expired && typeof auth.refreshAccessToken === "function") {
    try {
      await auth.refreshAccessToken();
    } catch {
      /* fall through; may still have a usable token */
    }
  }
  return hassAuthHeaders(hass);
}
