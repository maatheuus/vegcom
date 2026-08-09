import type { PlaceCategory } from "./types";

/** Rótulos (plural) das categorias de locais, usados nos filtros do mapa. */
export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  restaurant: "Restaurantes",
  market: "Feiras",
  bakery: "Padarias",
  cafe: "Cafés",
  entrepreneur: "Empreendedores",
  other: "Outros",
};
