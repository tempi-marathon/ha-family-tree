/** GEDCOM date display (with qualifiers + age) and date-form helpers. */

export type DateQualifier =
  | "exact"
  | "about"
  | "before"
  | "after"
  | "between"
  | "from_to"
  | "estimated"
  | "calculated";

export const FORM_QUALIFIERS: DateQualifier[] = [
  "exact",
  "about",
  "before",
  "after",
  "between",
  "from_to",
  "estimated",
  "calculated",
];

export interface DateSummary {
  date_text?: string | null;
  date_qualifier?: string | null;
  sort_date?: string | null;
}

interface DateParts {
  year: number;
  month?: number;
  day?: number;
}

interface ParsedGedcom {
  qualifier: DateQualifier;
  first: DateParts | null;
  second: DateParts | null;
  raw: string;
}

const GEDCOM_MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

const MONTHS_SHORT: Record<"en" | "nl", string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  nl: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
};

// Accepted month spellings in free-text input (en + nl, full and abbreviated).
const MONTH_ALIASES: Record<string, number> = {};
[
  ["jan", "january", "januari"],
  ["feb", "february", "februari"],
  ["mar", "mrt", "march", "maart"],
  ["apr", "april"],
  ["may", "mei"],
  ["jun", "june", "juni"],
  ["jul", "july", "juli"],
  ["aug", "august", "augustus"],
  ["sep", "sept", "september"],
  ["oct", "okt", "october", "oktober"],
  ["nov", "november"],
  ["dec", "december"],
].forEach((names, idx) => names.forEach((n) => (MONTH_ALIASES[n] = idx + 1)));

const WORDS: Record<"en" | "nl", Record<string, string>> = {
  en: {
    about: "about",
    before: "before",
    after: "after",
    between: "between",
    and: "and",
    estimated: "est.",
    calculated: "calc.",
    deceased: "Deceased",
  },
  nl: {
    about: "ca.",
    before: "voor",
    after: "na",
    between: "tussen",
    and: "en",
    estimated: "geschat",
    calculated: "berekend",
    deceased: "Overleden",
  },
};

function lang(language?: string): "en" | "nl" {
  return (language || "en").toLowerCase().startsWith("nl") ? "nl" : "en";
}

const QUALIFIER_PREFIXES: Array<[RegExp, DateQualifier]> = [
  [/^(ABT|ABOUT|CIR|CA\.?|CIRCA)\s+/i, "about"],
  [/^(BEF|BEFORE)\s+/i, "before"],
  [/^(AFT|AFTER)\s+/i, "after"],
  [/^EST\s+/i, "estimated"],
  [/^CAL\s+/i, "calculated"],
];

function parseGedcomToken(token: string): DateParts | null {
  const m = /^(?:(\d{1,2})\s+)?(?:([A-Z]{3})\s+)?(\d{3,4})$/i.exec(token.trim());
  if (!m) return null;
  const year = Number(m[3]);
  const monthIdx = m[2] ? GEDCOM_MONTHS.indexOf(m[2].toUpperCase()) : -1;
  if (m[2] && monthIdx < 0) return null;
  const month = monthIdx >= 0 ? monthIdx + 1 : undefined;
  const day = m[1] && month ? Number(m[1]) : undefined;
  return { year, month, day };
}

export function parseGedcomDate(text: string | null | undefined): ParsedGedcom {
  const raw = (text || "").trim();
  const empty: ParsedGedcom = { qualifier: "exact", first: null, second: null, raw };
  if (!raw) return empty;
  const between = /^BET\s+(.+?)\s+AND\s+(.+)$/i.exec(raw);
  if (between) {
    return {
      qualifier: "between",
      first: parseGedcomToken(between[1]),
      second: parseGedcomToken(between[2]),
      raw,
    };
  }
  const fromTo = /^FROM\s+(.+?)(?:\s+TO\s+(.+))?$/i.exec(raw);
  if (fromTo) {
    return {
      qualifier: "from_to",
      first: parseGedcomToken(fromTo[1]),
      second: fromTo[2] ? parseGedcomToken(fromTo[2]) : null,
      raw,
    };
  }
  for (const [re, qualifier] of QUALIFIER_PREFIXES) {
    if (re.test(raw)) {
      return { qualifier, first: parseGedcomToken(raw.replace(re, "")), second: null, raw };
    }
  }
  return { qualifier: "exact", first: parseGedcomToken(raw), second: null, raw };
}

function partsFromSortDate(sortDate: string | null | undefined): DateParts | null {
  if (!sortDate) return null;
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(sortDate);
  if (!m) return null;
  return {
    year: Number(m[1]),
    month: m[2] ? Number(m[2]) : undefined,
    day: m[3] ? Number(m[3]) : undefined,
  };
}

function formatParts(parts: DateParts, language?: string): string {
  const l = lang(language);
  const months = MONTHS_SHORT[l];
  if (parts.month && parts.day) {
    return l === "nl"
      ? `${parts.day} ${months[parts.month - 1]} ${parts.year}`
      : `${months[parts.month - 1]} ${parts.day}, ${parts.year}`;
  }
  if (parts.month) return `${months[parts.month - 1]} ${parts.year}`;
  return String(parts.year);
}

/** Human date like "Apr 26, 1941", "about 1784", "between 1820 and 1825". */
export function formatEventDate(
  summary: DateSummary | null | undefined,
  language?: string,
): string {
  if (!summary) return "";
  const words = WORDS[lang(language)];
  const parsed = parseGedcomDate(summary.date_text);
  if (!parsed.raw) {
    const parts = partsFromSortDate(summary.sort_date);
    return parts ? formatParts(parts, language) : "";
  }
  if (!parsed.first) return parsed.raw;
  const first = formatParts(parsed.first, language);
  switch (parsed.qualifier) {
    case "between":
      return parsed.second
        ? `${words.between} ${first} ${words.and} ${formatParts(parsed.second, language)}`
        : first;
    case "from_to":
      return parsed.second ? `${first} – ${formatParts(parsed.second, language)}` : `${first} –`;
    case "exact":
      return first;
    default:
      return `${words[parsed.qualifier]} ${first}`;
  }
}

function isPrecise(summary: DateSummary | null | undefined): boolean {
  if (!summary) return false;
  const parsed = parseGedcomDate(summary.date_text);
  if (parsed.raw) {
    return parsed.qualifier === "exact" && Boolean(parsed.first?.day);
  }
  return Boolean(partsFromSortDate(summary.sort_date)?.day);
}

function anchor(summary: DateSummary | null | undefined): DateParts | null {
  if (!summary) return null;
  return partsFromSortDate(summary.sort_date) || parseGedcomDate(summary.date_text).first;
}

/** Age in whole years, with an `approx` flag when either date lacks day precision. */
export function computeAge(
  birth: DateSummary | null | undefined,
  death: DateSummary | null | undefined,
  isLiving: boolean,
  today: Date = new Date(),
): { years: number; approx: boolean } | null {
  const b = anchor(birth);
  if (!b) return null;
  let end: DateParts | null;
  let endPrecise = true;
  if (death) {
    end = anchor(death);
    endPrecise = isPrecise(death);
  } else if (isLiving) {
    end = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  } else {
    return null;
  }
  if (!end) return null;
  const approx = !isPrecise(birth) || !endPrecise;
  let years = end.year - b.year;
  if (!approx) {
    const bm = b.month ?? 1;
    const bd = b.day ?? 1;
    const em = end.month ?? 1;
    const ed = end.day ?? 1;
    if (em < bm || (em === bm && ed < bd)) years -= 1;
  }
  if (years < 0 || years > 130) return null;
  return { years, approx };
}

/** "(79)" or "(±79)", empty when unknown. */
export function formatAge(
  birth: DateSummary | null | undefined,
  death: DateSummary | null | undefined,
  isLiving: boolean,
  today?: Date,
): string {
  const age = computeAge(birth, death, isLiving, today);
  if (!age) return "";
  return age.approx ? `(±${age.years})` : `(${age.years})`;
}

/** Death column text: date + age, "Deceased" when date unknown, else empty. */
export function formatDeathCell(
  birth: DateSummary | null | undefined,
  death: DateSummary | null | undefined,
  isLiving: boolean,
  language?: string,
): string {
  if (death) {
    const date = formatEventDate(death, language);
    const age = formatAge(birth, death, false);
    if (date) return age ? `${date} ${age}` : date;
  }
  return isLiving ? "" : WORDS[lang(language)].deceased;
}

/** Compact lifespan for cards: "Apr 26, 1941 (85)" or "1905 - about 1995 (±90)". */
export function formatLifespan(
  birth: DateSummary | null | undefined,
  death: DateSummary | null | undefined,
  isLiving: boolean,
  language?: string,
  today?: Date,
): string {
  const age = formatAge(birth, death, isLiving && !death, today);
  if (isLiving && !death) {
    const date = formatEventDate(birth, language);
    return [date, age].filter(Boolean).join(" ");
  }
  const words = WORDS[lang(language)];
  const yearOnly = (s: DateSummary | null | undefined): string => {
    if (!s) return "";
    const parsed = parseGedcomDate(s.date_text);
    const parts = parsed.first || partsFromSortDate(s.sort_date);
    if (!parts) return parsed.raw;
    return parsed.qualifier === "exact" ? String(parts.year) : `${words[parsed.qualifier] || ""} ${parts.year}`.trim();
  };
  const by = yearOnly(birth);
  const dy = yearOnly(death);
  if (by && dy) return `${by} - ${dy}${age ? ` ${age}` : ""}`;
  if (by) return `${by} -`;
  if (dy) return `- ${dy}`;
  return "";
}

/** Normalize free-text / ISO input ("1941-04-26", "26-4-1941", "apr 1941") to a GEDCOM token. */
export function toGedcomToken(input: string): string | null {
  const text = input.trim().replace(/,/g, " ").replace(/\s+/g, " ");
  if (!text) return null;
  const fmt = (year: number, month?: number, day?: number): string | null => {
    if (year < 100 || year > 9999) return null;
    if (month !== undefined && (month < 1 || month > 12)) return null;
    if (day !== undefined && (day < 1 || day > 31)) return null;
    if (month && day) return `${day} ${GEDCOM_MONTHS[month - 1]} ${year}`;
    if (month) return `${GEDCOM_MONTHS[month - 1]} ${year}`;
    return String(year);
  };
  let m = /^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/.exec(text);
  if (m) return fmt(Number(m[1]), m[2] ? Number(m[2]) : undefined, m[3] ? Number(m[3]) : undefined);
  m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(text);
  if (m) return fmt(Number(m[3]), Number(m[2]), Number(m[1]));
  m = /^(\d{1,2})[-/.](\d{4})$/.exec(text);
  if (m) return fmt(Number(m[2]), Number(m[1]));
  const tokens = text.toLowerCase().split(" ");
  let day: number | undefined;
  let month: number | undefined;
  let year: number | undefined;
  for (const tok of tokens) {
    const clean = tok.replace(/\.$/, "");
    if (/^\d{3,4}$/.test(clean)) year = Number(clean);
    else if (/^\d{1,2}$/.test(clean)) day = Number(clean);
    else if (MONTH_ALIASES[clean]) month = MONTH_ALIASES[clean];
    else return null;
  }
  if (year === undefined) return null;
  if (day !== undefined && month === undefined) return null;
  return fmt(year, month, day);
}

/** Build a GEDCOM date string from the event form fields. */
export function buildGedcomDate(
  qualifier: DateQualifier,
  first: string,
  second = "",
): { value: string; error: boolean } {
  const a = first.trim() ? toGedcomToken(first) : "";
  const b = second.trim() ? toGedcomToken(second) : "";
  if (a === null || b === null) return { value: "", error: true };
  if (!a) return { value: "", error: false };
  switch (qualifier) {
    case "about":
      return { value: `ABT ${a}`, error: false };
    case "before":
      return { value: `BEF ${a}`, error: false };
    case "after":
      return { value: `AFT ${a}`, error: false };
    case "estimated":
      return { value: `EST ${a}`, error: false };
    case "calculated":
      return { value: `CAL ${a}`, error: false };
    case "between":
      return b ? { value: `BET ${a} AND ${b}`, error: false } : { value: "", error: true };
    case "from_to":
      return { value: b ? `FROM ${a} TO ${b}` : `FROM ${a}`, error: false };
    default:
      return { value: a, error: false };
  }
}

/** Split a stored GEDCOM date back into form fields (qualifier + two tokens). */
export function gedcomToForm(text: string | null | undefined): {
  qualifier: DateQualifier;
  first: string;
  second: string;
} {
  const parsed = parseGedcomDate(text);
  const token = (p: DateParts | null): string =>
    p
      ? p.month && p.day
        ? `${p.day} ${GEDCOM_MONTHS[p.month - 1]} ${p.year}`
        : p.month
          ? `${GEDCOM_MONTHS[p.month - 1]} ${p.year}`
          : String(p.year)
      : "";
  if (parsed.raw && !parsed.first) {
    return { qualifier: "exact", first: parsed.raw, second: "" };
  }
  return { qualifier: parsed.qualifier, first: token(parsed.first), second: token(parsed.second) };
}
