/** Date display helpers for the Family Tree panel. */

const GEDCOM_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

const EXACT_GEDCOM_DATE = /^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})$/i;

/** Convert an ISO date (YYYY-MM-DD) to a GEDCOM date string (DD MMM YYYY). */
export function isoToGedcomDate(iso: string): string {
  const trimmed = (iso || "").trim();
  if (!trimmed) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (!m) return "";
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return "";
  return `${day} ${GEDCOM_MONTHS[month - 1]} ${year}`;
}

/** Convert an exact GEDCOM date (DD MMM YYYY) to ISO; null for qualifiers/ranges. */
export function gedcomToIsoDate(text: string): string | null {
  const trimmed = (text || "").trim();
  if (!trimmed) return null;
  const m = EXACT_GEDCOM_DATE.exec(trimmed);
  if (!m) return null;
  const day = Number(m[1]);
  const month = GEDCOM_MONTHS.indexOf(m[2].toUpperCase() as (typeof GEDCOM_MONTHS)[number]) + 1;
  const year = Number(m[3]);
  if (month < 1 || day < 1 || day > 31) return null;
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatGedcomDate(dateText: string | null | undefined): string {
  const text = (dateText || "").trim();
  return text || "—";
}

export function daysUntilLabel(days: number, daysWord = "days"): string {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} ${daysWord}`;
}

export function parseSortDateParts(
  sortDate: string | null | undefined,
): { year?: number; month?: number; day?: number } | null {
  if (!sortDate) return null;
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(sortDate);
  if (!m) return null;
  return {
    year: Number(m[1]),
    month: m[2] ? Number(m[2]) : undefined,
    day: m[3] ? Number(m[3]) : undefined,
  };
}

export function ageFromSortDates(
  birthSort: string | null | undefined,
  deathSort: string | null | undefined,
  isLiving: boolean,
  today: Date = new Date(),
): number | null {
  const birth = parseSortDateParts(birthSort);
  if (!birth?.year) return null;
  const end = isLiving
    ? { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
    : parseSortDateParts(deathSort);
  if (!end?.year) return null;
  let years = end.year - birth.year;
  const bMonth = birth.month ?? 1;
  const bDay = birth.day ?? 1;
  const eMonth = end.month ?? 1;
  const eDay = end.day ?? 1;
  if (eMonth < bMonth || (eMonth === bMonth && eDay < bDay)) years -= 1;
  return Math.max(0, years);
}
