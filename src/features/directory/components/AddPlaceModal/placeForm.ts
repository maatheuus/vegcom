import type { AddressSuggestion } from "../../hooks/geocode";
import type {
  CreatePlacePayload,
  PlaceCategory,
  PlaceDiet,
  PriceRange,
} from "../../types";
import { getInstagramHandle } from "../../utils/instagram";

export interface PlaceFormValues {
  name: string;
  category: PlaceCategory | null;
  diet: PlaceDiet | null;
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
  diet: null,
  address: "",
  city: "",
  phone: "",
  instagram: "",
  description: "",
  schedule: "",
  priceRange: undefined,
};

/** Extrai rua/cidade de uma sugestão de endereço para preencher o formulário. */
export function suggestionToAddressFields(suggestion: AddressSuggestion): {
  address: string;
  city: string;
} {
  const { road, houseNumber, suburb, city, state } = suggestion.address;

  const address = [[road, houseNumber].filter(Boolean).join(", "), suburb]
    .filter(Boolean)
    .join(", ");
  const cityLabel = [city, state].filter(Boolean).join(", ");

  return {
    address: address || suggestion.displayName,
    city: cityLabel,
  };
}

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
    !form.diet ||
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
    diet: form.diet,
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
