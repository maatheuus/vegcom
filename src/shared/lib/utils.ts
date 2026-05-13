import { clsx, type ClassValue } from "clsx";
import type { Locale } from "date-fns";
import { formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeFormatDistance(
  dateStr: string | null | undefined,
  locale: Locale,
): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return formatDistance(d, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale,
  });
}

export const dateFormatDistanceLocale: Locale = {
  code: "pt-BR",
  formatDistance: (token, count) => {
    const p = (n: number, singular: string, plural: string) =>
      n === 1 ? singular : plural;

    const formatDistanceLocale: Record<string, string> = {
      lessThanXSeconds: `há menos de %s ${p(count, "segundo", "segundos")}`,
      xSeconds: `há %s ${p(count, "segundo", "segundos")}`,
      halfAMinute: "há meio minuto",
      lessThanXMinutes: `há menos de %s ${p(count, "minuto", "minutos")}`,
      xMinutes: `há %s ${p(count, "minuto", "minutos")}`,
      aboutXHours: `há cerca de %s ${p(count, "hora", "horas")}`,
      xHours: `há %s ${p(count, "hora", "horas")}`,
      xDays: `há %s ${p(count, "dia", "dias")}`,
      aboutXWeeks: `há cerca de %s ${p(count, "semana", "semanas")}`,
      xWeeks: `há %s ${p(count, "semana", "semanas")}`,
      aboutXMonths: `há cerca de %s ${p(count, "mês", "meses")}`,
      xMonths: `há %s ${p(count, "mês", "meses")}`,
      aboutXYears: `há cerca de %s ${p(count, "ano", "anos")}`,
      xYears: `há %s ${p(count, "ano", "anos")}`,
      overXYears: `há mais de %s ${p(count, "ano", "anos")}`,
      almostXYears: `há quase %s ${p(count, "ano", "anos")}`,
    };

    return formatDistanceLocale[token].replace("%s", count.toString());
  },
  formatRelative: () => "",
  formatLong: {
    date: () => "",
    time: () => "",
    dateTime: () => "",
  },
  localize: {
    ordinalNumber: () => "",
    era: () => "",
    quarter: () => "",
    month: () => "",
    day: () => "",
    dayPeriod: () => "",
  },
  match: {
    ordinalNumber: () => null,
    era: () => null,
    quarter: () => null,
    month: () => null,
    day: () => null,
    dayPeriod: () => null,
  },
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1,
  },
};
