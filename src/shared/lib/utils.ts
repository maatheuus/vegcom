import { clsx, type ClassValue } from "clsx";
import type { Locale } from "date-fns";
import { twMerge } from "tailwind-merge";

/**
 * Merges and conditions class names using `clsx` and `tailwind-merge`.
 * This utility ensures that Tailwind classes are properly deduplicated and merged.
 *
 * @param {...ClassValue[]} inputs - Class names or conditional class objects.
 * @returns {string} The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom date-fns locale for formatting time distances in Portuguese (pt-BR).
 * Used for displaying relative time (e.g., "há 5 minutos").
 *
 * @type {Locale}
 */
export const dateFormatDistanceLocale: Locale = {
  code: "pt-BR",
  formatDistance: (token, count) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatDistanceLocale: Record<string, string> = {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ordinalNumber: () => "" as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    era: () => "" as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quarter: () => "" as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    month: () => "" as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    day: () => "" as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dayPeriod: () => "" as any,
  },
  match: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ordinalNumber: () => null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    era: () => null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quarter: () => null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    month: () => null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    day: () => null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dayPeriod: () => null as any,
  },
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1,
  },
};
