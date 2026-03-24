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
      lessThanXSeconds: "há menos de %s seg",
      xSeconds: "há %s seg",
      halfAMinute: "há meio minuto",
      lessThanXMinutes: "há menos de %s min",
      xMinutes: "há %s min",
      aboutXHours: "há cerca de %s h",
      xHours: "há %s h",
      xDays: "há %s d",
      aboutXWeeks: "há cerca de %s sem",
      xWeeks: "há %s sem",
      aboutXMonths: "há cerca de %s meses",
      xMonths: "há %s meses",
      aboutXYears: "há cerca de %s ano",
      xYears: "há %s ano",
      overXYears: "há mais de %s ano",
      almostXYears: "há quase %s ano",
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
