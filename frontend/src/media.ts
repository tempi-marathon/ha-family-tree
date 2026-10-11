/** Person media URL helpers. */

import type { HomeAssistant } from "./types";

export type MediaVariant = "thumb" | "full";

/** Prefix API path with hass.hassUrl when available (required for authenticated img src). */
export function apiUrl(hass: HomeAssistant | undefined, path: string): string {
  if (hass && typeof hass.hassUrl === "function") {
    return hass.hassUrl(path);
  }
  return path;
}

export function personMediaUrl(
  mediaId: string,
  variant: MediaVariant = "thumb",
  hass?: HomeAssistant,
): string {
  const id = mediaId.trim();
  if (!/^[0-9a-f]{32}$/i.test(id)) {
    return "";
  }
  const v = variant === "full" ? "full" : "thumb";
  const path = `/api/family_tree/media/${id}?variant=${v}`;
  return apiUrl(hass, path);
}
