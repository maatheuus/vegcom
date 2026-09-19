/**
 * Geocodifica um endereço/cidade brasileiro para coordenadas (Nominatim/OSM).
 * Retorna null se a busca falhar ou não encontrar resultado.
 */
export async function geocode(
  query: string,
): Promise<{ lat: number; lng: number } | null> {
  const params = new URLSearchParams({
    format: "jsonv2",
    limit: "1",
    countrycodes: "br",
    "accept-language": "pt-BR",
    q: `${query}, Brasil`,
  });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    );
    if (!response.ok) return null;

    const [result] = (await response.json()) as { lat: string; lon: string }[];
    if (!result) return null;

    const lat = Number(result.lat);
    const lng = Number(result.lon);
    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  } catch {
    return null;
  }
}

export type BrazilLocationCheck = "inside" | "outside" | "unavailable";

/**
 * Confirma o país de uma coordenada antes de abrir o formulário de novo local.
 * A validação no backend continua sendo a fonte de verdade.
 */
export async function checkLocationInBrazil(
  lat: number,
  lng: number,
): Promise<BrazilLocationCheck> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "outside";

  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(lat),
    lon: String(lng),
    zoom: "3",
  });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
    );
    if (!response.ok) return "unavailable";

    const data = (await response.json()) as {
      address?: { country_code?: string };
    };

    if (!data.address?.country_code) return "unavailable";

    return data.address.country_code.toLowerCase() === "br"
      ? "inside"
      : "outside";
  } catch {
    return "unavailable";
  }
}
