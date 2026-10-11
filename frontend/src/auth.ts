/** Home Assistant Bearer token for authenticated HTTP requests. */

import type { HomeAssistant } from "./types";

export function hassAuthHeaders(hass: HomeAssistant | undefined): Record<string, string> {
  const headers: Record<string, string> = {};
  if (!hass) return headers;
  const access =
    (hass as unknown as { connection?: { options?: { auth?: { accessToken?: string } } } })
      ?.connection?.options?.auth?.accessToken;
  const authData = (hass as unknown as { auth?: { data?: { access_token?: string } } }).auth
    ?.data?.access_token;
  const bearer = authData || access;
  if (bearer) headers.Authorization = `Bearer ${bearer}`;
  return headers;
}
