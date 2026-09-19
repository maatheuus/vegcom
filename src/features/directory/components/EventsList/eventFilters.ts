import type { DirectoryEvent } from "../../types";

export const ALL_MONTHS = "Todos";
export const ALL_CITIES = "Todas";

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

export function matchesEventFilters(
  event: DirectoryEvent,
  month: string,
  city: string,
) {
  return (
    (month === ALL_MONTHS || getMonth(event.date) === month) &&
    (city === ALL_CITIES || getCity(event.location) === city)
  );
}
