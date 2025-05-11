import { clsx, type ClassValue } from "clsx";
import type { Locale } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatDistanceLocale: Locale = {
  code: "pt-BR",
  formatDistance: (token, count) => {
    const formatDistanceLocale = {
      lessThanXSeconds: "há menos de %s segundos",
      xSeconds: "há %s segundos",
      halfAMinute: "há meio minuto",
      lessThanXMinutes: "há menos de %s minutos",
      xMinutes: "há %s minutos",
      aboutXHours: "há cerca de %s horas",
      xHours: "há %s horas",
      xDays: "há %s dias",
      aboutXWeeks: "há cerca de %s semanas",
      xWeeks: "há %s semanas",
      aboutXMonths: "há cerca de %s meses",
      xMonths: "há %s meses",
      aboutXYears: "há cerca de %s anos",
      xYears: "há %s anos",
      overXYears: "há mais de %s anos",
      almostXYears: "há quase %s anos",
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
