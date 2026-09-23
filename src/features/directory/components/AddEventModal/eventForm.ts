import { type AddressSuggestion, geocode } from "../../hooks/geocode";
import type { CreateDirectoryEventPayload, DirectoryEvent } from "../../types";

export interface EventFormValues {
  title: string;
  /** Formato yyyy-MM-dd. */
  date: string;
  monthly: boolean;
  street: string;
  city: string;
  description: string;
  link: string;
}

export interface EventCoordinates {
  lat: number;
  lng: number;
  /** true quando a rua não foi encontrada e o pin caiu no centro da cidade. */
  isApproximate: boolean;
}

export function getInitialEventForm(
  event?: DirectoryEvent | null,
): EventFormValues {
  return {
    title: event?.title ?? "",
    date: event?.date.slice(0, 10) ?? "",
    monthly: event?.monthly ?? false,
    street: event?.street ?? event?.location ?? "",
    city: event?.city ?? "",
    description: event?.description ?? "",
    link: event?.link ?? "",
  };
}

/** Converte um endereço da busca nos campos rua/cidade do formulário. */
export function suggestionToEventFields(suggestion: AddressSuggestion): {
  street: string;
  city: string;
} {
  const { road, houseNumber, suburb, city, state } = suggestion.address;
  const street =
    [[road, houseNumber].filter(Boolean).join(", "), suburb]
      .filter(Boolean)
      .join(", ") || suggestion.displayName;
  const cityLabel = [city, state].filter(Boolean).join(", ");
  return { street, city: cityLabel };
}

export function isEventFormComplete(form: EventFormValues) {
  return Boolean(
    form.title.trim() && form.date && form.street.trim() && form.city.trim(),
  );
}

/** Reaproveita as coordenadas do evento editado se o endereço não mudou; senão geocodifica. */
export async function resolveEventCoordinates(
  street: string,
  city: string,
  event?: DirectoryEvent | null,
): Promise<EventCoordinates | null> {
  if (
    event &&
    event.street === street &&
    event.city === city &&
    event.lat !== undefined &&
    event.lng !== undefined
  ) {
    return { lat: event.lat, lng: event.lng, isApproximate: false };
  }

  const exactLocation = await geocode(`${street}, ${city}`);
  if (exactLocation) return { ...exactLocation, isApproximate: false };

  const cityLocation = await geocode(city);
  return cityLocation ? { ...cityLocation, isApproximate: true } : null;
}

export function buildEventPayload(
  form: EventFormValues,
  { lat, lng }: EventCoordinates,
): CreateDirectoryEventPayload {
  const street = form.street.trim();
  const city = form.city.trim();

  return {
    title: form.title.trim(),
    date: new Date(form.date).toISOString(),
    monthly: form.monthly,
    location: `${street}, ${city}`,
    street,
    city,
    lat,
    lng,
    description: form.description.trim() || undefined,
    link: form.link.trim() || undefined,
  };
}
