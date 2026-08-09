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
