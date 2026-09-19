import type { PlaceCategory, PriceRange } from "./types";

/** Rótulos (plural) das categorias de locais, usados nos filtros do mapa. */
export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  restaurant: "Restaurantes",
  market: "Feiras",
  bakery: "Padarias",
  cafe: "Cafés",
  entrepreneur: "Empreendedores",
  other: "Outros",
};

/** Rótulos (singular) das categorias, usados no cadastro e no detalhe do local. */
export const CATEGORY_SINGULAR_LABELS: Record<PlaceCategory, string> = {
  restaurant: "Restaurante",
  market: "Feira",
  bakery: "Padaria",
  cafe: "Café",
  entrepreneur: "Empreendedor",
  other: "Outro",
};

export const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  1: "Econômico",
  2: "Moderado",
  3: "Caro",
};
