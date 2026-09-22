import type { DirectoryEvent } from "../../types";

export const ALL_MONTHS = "Todos";
export const ALL_CITIES = "Todas";
export const MONTHLY_EVENTS = "Eventos mensais";

export const MONTHS = [
  ALL_MONTHS,
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const getMonth = (date: string) => MONTHS[new Date(date).getMonth() + 1];
const getCity = (location: string) =>
  location.split(",").at(-1)?.trim() || location;

export function getCityOptions(events: DirectoryEvent[]) {
  const cities = new Set(events.map((event) => getCity(event.location)));
  return [ALL_CITIES, ...[...cities].sort()];
}

export function getMonthOptions(events: DirectoryEvent[]) {
  return events.some((event) => event.monthly)
    ? [ALL_MONTHS, MONTHLY_EVENTS, ...MONTHS.slice(1)]
    : MONTHS;
}

export function matchesEventFilters(
  event: DirectoryEvent,
  month: string,
  city: string,
) {
  const matchesMonth =
    month === MONTHLY_EVENTS
      ? event.monthly
      : month === ALL_MONTHS || event.monthly || getMonth(event.date) === month;

  return (
    matchesMonth && (city === ALL_CITIES || getCity(event.location) === city)
  );
}
