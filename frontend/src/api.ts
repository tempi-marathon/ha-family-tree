/** Websocket / DTO helpers for Family Tree. */

import type { HomeAssistant } from "./types";

export interface LifeEventDto {
  type: "birth" | "death" | "marriage" | string;
  sort_date: string | null;
  place_id: string | null;
  place_name: string | null;
}

export interface PersonDto {
  id: string;
  given_names: string;
  call_name: string;
  surname_prefix: string;
  surname: string;
  sex: string;
  is_living: boolean;
  notes: string;
  display_name?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  /** Present on persons/list for client-side place/date filters. */
  life_events?: LifeEventDto[];
}

export interface EventDto {
  id: string;
  subject_type: string;
  subject_id: string;
  type: string;
  place_id: string | null;
  date_text: string;
  date_qualifier: string;
  date_from: string | null;
  date_to: string | null;
  sort_date: string | null;
  description: string;
  place_name?: string;
  union_id?: string;
  partner_names?: string[];
}

export interface PlaceDto {
  id: string;
  name: string;
  admin1: string;
  country: string;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
  geonames_id: number | null;
}

export interface UnionDto {
  id: string;
  type: string;
  status: string;
  known_children_count: number | null;
  notes: string;
}

export interface StatsDto {
  total_persons: number;
  living: number;
  deceased: number;
  ages: { labels: string[]; values: number[] };
  centuries: { labels: string[]; values: number[] };
  places_of_birth: { labels: string[]; values: number[] };
}

export interface SettingsDto {
  name: string;
  gazetteer_countries: string[];
  family_shortcuts: string[];
  can_write: boolean;
  upcoming_birthdays: Array<Record<string, unknown>>;
  upcoming_anniversaries: Array<Record<string, unknown>>;
}

export interface PersonDetail {
  person: PersonDto;
  events: EventDto[];
  citations: Array<Record<string, unknown>>;
  tree: TreePayload | null;
}

export interface TreePayload {
  person: PersonDto & { name?: string };
  parents: Array<Record<string, unknown>>;
  grandparents: Record<string, Array<Record<string, unknown>>>;
  partners: Array<Record<string, unknown>>;
  children: Array<Record<string, unknown>>;
  siblings: Array<Record<string, unknown>>;
}

export interface GazetteerHit {
  geonames_id: number;
  name: string;
  asciiname: string;
  country_code: string;
  admin1_code: string;
  admin1: string;
  latitude: number | null;
  longitude: number | null;
  population: number;
}

function msg(
  hass: HomeAssistant,
  type: string,
  extra: Record<string, unknown> = {},
): Promise<unknown> {
  return hass.connection.sendMessagePromise({ type, ...extra });
}

export async function getRevision(hass: HomeAssistant): Promise<{ revision: number }> {
  return msg(hass, "family_tree/revision") as Promise<{ revision: number }>;
}

export async function subscribeRevision(
  hass: HomeAssistant,
  callback: (data: { revision: number }) => void,
): Promise<() => void> {
  return hass.connection.subscribeMessage<{ revision: number }>(callback, {
    type: "family_tree/subscribe",
  });
}

export async function listPersons(
  hass: HomeAssistant,
  params: {
    search?: string;
    sex?: string;
    living?: boolean;
    trashed?: boolean;
    limit?: number;
    offset?: number;
  } = {},
): Promise<{ persons: PersonDto[]; total: number }> {
  return msg(hass, "family_tree/persons/list", params) as Promise<{
    persons: PersonDto[];
    total: number;
  }>;
}

export async function getPerson(
  hass: HomeAssistant,
  personId: string,
): Promise<PersonDetail> {
  return msg(hass, "family_tree/persons/get", {
    person_id: personId,
  }) as Promise<PersonDetail>;
}

export async function savePerson(
  hass: HomeAssistant,
  data: {
    person_id?: string;
    given_names?: string;
    call_name?: string;
    surname_prefix?: string;
    surname?: string;
    sex?: string;
    is_living?: boolean;
    notes?: string;
  },
): Promise<{ person: PersonDto }> {
  return msg(hass, "family_tree/persons/save", data) as Promise<{ person: PersonDto }>;
}

export async function deletePerson(
  hass: HomeAssistant,
  personId: string,
): Promise<{ ok: boolean }> {
  return msg(hass, "family_tree/persons/delete", {
    person_id: personId,
  }) as Promise<{ ok: boolean }>;
}

export async function restorePerson(
  hass: HomeAssistant,
  personId: string,
): Promise<{ ok: boolean }> {
  return msg(hass, "family_tree/persons/restore", {
    person_id: personId,
  }) as Promise<{ ok: boolean }>;
}

export async function purgePerson(
  hass: HomeAssistant,
  personId: string,
): Promise<{ ok: boolean }> {
  return msg(hass, "family_tree/persons/purge", {
    person_id: personId,
  }) as Promise<{ ok: boolean }>;
}

export async function getTree(
  hass: HomeAssistant,
  personId: string,
): Promise<TreePayload> {
  return msg(hass, "family_tree/tree", { person_id: personId }) as Promise<TreePayload>;
}

export async function getStats(hass: HomeAssistant): Promise<StatsDto> {
  return msg(hass, "family_tree/stats") as Promise<StatsDto>;
}

export async function getFamilies(
  hass: HomeAssistant,
): Promise<{ families: Array<{ shortcut: string; persons: PersonDto[]; total: number }> }> {
  return msg(hass, "family_tree/families") as Promise<{
    families: Array<{ shortcut: string; persons: PersonDto[]; total: number }>;
  }>;
}

export async function getSettings(hass: HomeAssistant): Promise<SettingsDto> {
  return msg(hass, "family_tree/settings") as Promise<SettingsDto>;
}

export async function getUnion(
  hass: HomeAssistant,
  unionId: string,
): Promise<{
  union: UnionDto;
  partners: Array<Record<string, unknown>>;
  events: EventDto[];
}> {
  return msg(hass, "family_tree/unions/get", { union_id: unionId }) as Promise<{
    union: UnionDto;
    partners: Array<Record<string, unknown>>;
    events: EventDto[];
  }>;
}

export async function saveUnion(
  hass: HomeAssistant,
  data: Record<string, unknown>,
): Promise<{ union: UnionDto }> {
  const { id, union_id, ...rest } = data;
  const payload = {
    ...rest,
    ...(union_id || id ? { union_id: String(union_id || id) } : {}),
  };
  return msg(hass, "family_tree/unions/save", payload) as Promise<{ union: UnionDto }>;
}

export async function deleteUnion(
  hass: HomeAssistant,
  unionId: string,
): Promise<{ ok: boolean }> {
  return msg(hass, "family_tree/unions/delete", {
    union_id: unionId,
  }) as Promise<{ ok: boolean }>;
}

export async function addParentChild(
  hass: HomeAssistant,
  data: {
    parent_id: string;
    child_id: string;
    link_type?: string;
    union_id?: string;
  },
): Promise<{ link: Record<string, unknown> }> {
  return msg(hass, "family_tree/parent_child/add", data) as Promise<{
    link: Record<string, unknown>;
  }>;
}

export async function removeParentChild(
  hass: HomeAssistant,
  linkId: string,
): Promise<{ ok: boolean }> {
  return msg(hass, "family_tree/parent_child/remove", {
    link_id: linkId,
  }) as Promise<{ ok: boolean }>;
}

export async function listPlaces(
  hass: HomeAssistant,
  params: { search?: string; limit?: number } = {},
): Promise<{ places: PlaceDto[] }> {
  return msg(hass, "family_tree/places/list", params) as Promise<{ places: PlaceDto[] }>;
}

export async function savePlace(
  hass: HomeAssistant,
  data: Partial<PlaceDto> & { name: string; place_id?: string },
): Promise<{ place: PlaceDto }> {
  const { id, place_id, ...rest } = data;
  const payload = {
    ...rest,
    ...(place_id || id ? { place_id: place_id || id } : {}),
  };
  return msg(hass, "family_tree/places/save", payload) as Promise<{ place: PlaceDto }>;
}

export async function listSources(
  hass: HomeAssistant,
  params: { search?: string; limit?: number } = {},
): Promise<{ sources: Array<Record<string, unknown>> }> {
  return msg(hass, "family_tree/sources/list", params) as Promise<{
    sources: Array<Record<string, unknown>>;
  }>;
}

export async function saveEvent(
  hass: HomeAssistant,
  data: Record<string, unknown>,
): Promise<{ event: EventDto }> {
  const { id, event_id, ...rest } = data;
  const payload = {
    ...rest,
    ...(event_id || id ? { event_id: String(event_id || id) } : {}),
  };
  return msg(hass, "family_tree/events/save", payload) as Promise<{ event: EventDto }>;
}

export async function deleteEvent(
  hass: HomeAssistant,
  eventId: string,
): Promise<{ ok: boolean }> {
  return msg(hass, "family_tree/events/delete", {
    event_id: eventId,
  }) as Promise<{ ok: boolean }>;
}

export async function listUserLinks(
  hass: HomeAssistant,
): Promise<{ links: Array<Record<string, unknown>> }> {
  return msg(hass, "family_tree/user_links/list") as Promise<{
    links: Array<Record<string, unknown>>;
  }>;
}

export async function setUserLink(
  hass: HomeAssistant,
  haUserId: string,
  personId: string | null,
): Promise<Record<string, unknown>> {
  return msg(hass, "family_tree/user_links/set", {
    ha_user_id: haUserId,
    person_id: personId,
  }) as Promise<Record<string, unknown>>;
}

export async function searchGazetteer(
  hass: HomeAssistant,
  query: string,
  country?: string,
): Promise<{ results: GazetteerHit[] }> {
  return msg(hass, "family_tree/gazetteer/search", {
    query,
    country,
  }) as Promise<{ results: GazetteerHit[] }>;
}

export async function gazetteerStatus(
  hass: HomeAssistant,
): Promise<Record<string, unknown>> {
  return msg(hass, "family_tree/gazetteer/status") as Promise<Record<string, unknown>>;
}
