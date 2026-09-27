/** Date display helpers for the Family Tree panel. */

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

function yearFromTextOrSort(
  dateText: string | null | undefined,
  sortDate: string | null | undefined,
): number | null {
  const fromSort = parseSortDateParts(sortDate)?.year;
  if (fromSort) return fromSort;
  const m = /\b(\d{4})\b/.exec(dateText || "");
  return m ? Number(m[1]) : null;
}

function formatBirthLiving(
  dateText: string | null | undefined,
  sortDate: string | null | undefined,
  age: number | null,
): string {
  const parts = parseSortDateParts(sortDate);
  if (parts?.year && parts.month && parts.day) {
    const label = `${MONTHS_SHORT[parts.month - 1]} ${parts.day}, ${parts.year}`;
    return age != null ? `${label} (${age})` : label;
  }
  const text = (dateText || "").trim();
  if (text) return age != null ? `${text} (${age})` : text;
  return age != null ? `(${age})` : "";
}

/** Lifespan line for person cards: living birth+age, or year–year (age). */
export function formatLifespanLine(opts: {
  birth_date_text?: string | null;
  birth_sort_date?: string | null;
  death_date_text?: string | null;
  death_sort_date?: string | null;
  is_living?: boolean;
  today?: Date;
}): string {
  const living = opts.is_living !== false;
  const age = ageFromSortDates(
    opts.birth_sort_date,
    opts.death_sort_date,
    living,
    opts.today,
  );
  if (living) {
    return formatBirthLiving(opts.birth_date_text, opts.birth_sort_date, age);
  }
  const by = yearFromTextOrSort(opts.birth_date_text, opts.birth_sort_date);
  const dy = yearFromTextOrSort(opts.death_date_text, opts.death_sort_date);
  const deathApprox = /about|abt|circa|ca\.?/i.test(opts.death_date_text || "");
  if (by != null && dy != null) {
    const deathPart = deathApprox ? `about ${dy}` : String(dy);
    const agePart = age != null ? ` (±${age})` : "";
    return `${by} - ${deathPart}${agePart}`;
  }
  if (by != null) return String(by);
  if (dy != null) return deathApprox ? `about ${dy}` : String(dy);
  return "";
}
