/** Shared panel constants. */

import type { DateQualifier } from "./date_format";
import type { LocaleKey } from "./i18n";

export const EVENT_TYPE_KEYS: Record<string, LocaleKey> = {
  birth: "event_birth",
  death: "event_death",
  baptism: "event_baptism",
  burial: "event_burial",
  occupation: "event_occupation",
  residence: "event_residence",
  marriage: "event_marriage",
  divorce: "event_divorce",
  partnership: "event_partnership",
};

export const PERSON_EVENT_TYPES = ["birth", "baptism", "occupation", "residence", "death", "burial"];

export const UNIQUE_PERSON_EVENT_TYPES = new Set(["birth", "baptism", "death", "burial"]);

export const PERSON_DIALOG_PERSONAL = "person-dialog-personal";

export const PERSON_DIALOG_BIRTH = "person-dialog-birth";

export const PERSON_DIALOG_DECEASED = "person-dialog-deceased";

export const QUALIFIER_KEYS: Record<DateQualifier, LocaleKey> = {
  exact: "qual_exact",
  about: "qual_about",
  before: "qual_before",
  after: "qual_after",
  between: "qual_between",
  from_to: "qual_from_to",
  estimated: "qual_estimated",
  calculated: "qual_calculated",
};
