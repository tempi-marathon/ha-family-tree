/** Person media URL helpers. */

export type MediaVariant = "thumb" | "full";

export function personMediaUrl(mediaId: string, variant: MediaVariant = "thumb"): string {
  const id = mediaId.trim();
  if (!/^[0-9a-f]{32}$/i.test(id)) {
    return "";
  }
  const v = variant === "full" ? "full" : "thumb";
  return `/api/family_tree/media/${id}?variant=${v}`;
}
