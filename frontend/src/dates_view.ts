/** Date display helpers for the Family Tree panel. */

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
