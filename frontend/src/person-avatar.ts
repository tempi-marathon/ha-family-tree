/** Circular person avatar (photo or initials). */

import { html, nothing } from "lit";
import { personDisplayName } from "./people_view";
import { personMediaUrl } from "./media";
import type { PersonDto } from "./api";
import type { HomeAssistant } from "./types";

export type AvatarSize = "sm" | "md" | "detail" | "lg";

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  detail: 64,
  lg: 96,
};

function initialsForPerson(person: {
  given_names?: string;
  call_name?: string;
  surname_prefix?: string;
  surname?: string;
  display_name?: string;
}): string {
  const name = personDisplayName(person as PersonDto).trim();
  if (!name) return "?";
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  const one = parts[0];
  return one.length >= 2 ? one.slice(0, 2).toUpperCase() : one[0].toUpperCase();
}

function sexClass(sex: string | undefined): string {
  if (sex === "male") return "person-avatar--male";
  if (sex === "female") return "person-avatar--female";
  return "person-avatar--unknown";
}

export interface PersonAvatarOptions {
  size?: AvatarSize;
  hass?: HomeAssistant;
  profileMediaId?: string | null;
  sex?: string;
  isLiving?: boolean;
  deceasedOverlay?: boolean;
  title?: string;
}

export function renderPersonAvatar(
  person: PersonDto | Record<string, unknown>,
  opts: PersonAvatarOptions = {},
) {
  const size = opts.size ?? "sm";
  const px = SIZE_PX[size];
  const sex = opts.sex ?? (typeof person.sex === "string" ? person.sex : "unknown");
  const profileId =
    opts.profileMediaId ??
    (typeof (person as PersonDto).profile_media_id === "string"
      ? (person as PersonDto).profile_media_id
      : null);
  const isLiving = opts.isLiving ?? (person as PersonDto).is_living !== false;
  const title =
    opts.title ??
    personDisplayName(person as PersonDto);
  const deceased = opts.deceasedOverlay && !isLiving;

  if (profileId) {
    const useFull = size === "lg" || size === "detail";
    const src = personMediaUrl(profileId, useFull ? "full" : "thumb", opts.hass);
    return html`<span
      class="person-avatar ${sexClass(sex)} person-avatar--${size}${deceased
        ? " person-avatar--deceased"
        : ""}"
      style="width:${px}px;height:${px}px"
      title=${title}
    >
      <img src=${src} alt="" loading="lazy" width=${px} height=${px} />
    </span>`;
  }

  const letters = initialsForPerson(person as PersonDto);
  return html`<span
    class="person-avatar person-avatar--initials ${sexClass(sex)} person-avatar--${size}${deceased
      ? " person-avatar--deceased"
      : ""}"
    style="width:${px}px;height:${px}px"
    title=${title}
    aria-hidden="true"
  >${letters}</span>`;
}
