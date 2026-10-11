/** Circular person avatar (photo or initials). */

import { html, nothing } from "lit";
import "./authenticated-media-img";
import { personDisplayName } from "./people_view";
import type { PersonDto } from "./api";
import type { HomeAssistant } from "./types";

export type AvatarSize = "sm" | "md" | "detail" | "lg";

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  detail: 64,
  lg: 96,
};

function deceasedMarkPx(avatarPx: number): number {
  return Math.max(10, Math.round(avatarPx * 0.22));
}

const MDI_BOOKMARK_OUTLINE =
  "M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z";

function deceasedMarkSvg(sizePx: number) {
  return html`<svg
    class="person-avatar__deceased-mark"
    viewBox="0 0 24 24"
    width=${sizePx}
    height=${sizePx}
    aria-hidden="true"
  >
    <path fill="currentColor" d=${MDI_BOOKMARK_OUTLINE} />
  </svg>`;
}

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
  deceasedMarkPx?: number;
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
  const deceasedMark = opts.deceasedOverlay && !isLiving;
  const markPx = opts.deceasedMarkPx ?? deceasedMarkPx(px);
  const useFull = size === "lg" || size === "detail";

  if (profileId) {
    return html`<span
      class="person-avatar person-avatar--photo ${sexClass(sex)} person-avatar--${size}"
      style="width:${px}px;height:${px}px"
      title=${title}
    >
      <span class="person-avatar__inner">
        <ft-authenticated-media-img
          .hass=${opts.hass}
          mediaId=${profileId}
          variant=${useFull ? "full" : "thumb"}
          width=${px}
          height=${px}
        ></ft-authenticated-media-img>
      </span>
      ${deceasedMark ? deceasedMarkSvg(markPx) : nothing}
    </span>`;
  }

  const letters = initialsForPerson(person as PersonDto);
  return html`<span
    class="person-avatar person-avatar--initials ${sexClass(sex)} person-avatar--${size}"
    style="width:${px}px;height:${px}px"
    title=${title}
    aria-hidden="true"
  >
    ${letters}
    ${deceasedMark ? deceasedMarkSvg(markPx) : nothing}
  </span>`;
}
