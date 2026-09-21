import type { CreatePlacePayload, PlaceCategory, PriceRange } from "../../types";
import { getInstagramHandle } from "../../utils/instagram";

export interface PlaceFormValues {
  name: string;
  category: PlaceCategory | null;
  address: string;
  city: string;
  phone: string;
  instagram: string;
  description: string;
  schedule: string;
  priceRange?: PriceRange;
}

export const EMPTY_PLACE_FORM: PlaceFormValues = {
  name: "",
  category: null,
  address: "",
  city: "",
  phone: "",
  instagram: "",
  description: "",
  schedule: "",
  priceRange: undefined,
};

/** Monta o payload da API; retorna null enquanto faltar algum campo obrigatório. */
export function buildPlacePayload(
  form: PlaceFormValues,
  coords: [number, number] | null,
): CreatePlacePayload | null {
  const name = form.name.trim();
  const address = form.address.trim();
  const city = form.city.trim();
  const schedule = form.schedule.trim();

  if (
    !name ||
    !form.category ||
    !address ||
    !city ||
    !schedule ||
    !form.priceRange ||
    !coords
  )
    return null;

  const instagram = getInstagramHandle(form.instagram);

  return {
    name,
    category: form.category,
    lat: coords[0],
    lng: coords[1],
    address: `${address}, ${city}`,
    phone: form.phone.trim() || undefined,
    instagram: instagram ? `@${instagram}` : undefined,
    description: form.description.trim() || undefined,
    schedule,
    priceRange: form.priceRange,
  };
}
