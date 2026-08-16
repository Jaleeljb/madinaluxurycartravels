import type { Language } from "./i18n";

export type DateRange = { start: string; end: string }; // ISO "YYYY-MM-DD", inclusive

export const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
};

export function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetweenInclusive(startIso: string, endIso: string): number {
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
}

export function formatDate(iso: string, locale: string = "en-IN"): string {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(d);
}

export function formatRange(range: DateRange, locale: string = "en-IN"): string {
  if (range.start === range.end) return formatDate(range.start, locale);
  return `${formatDate(range.start, locale)} – ${formatDate(range.end, locale)}`;
}
