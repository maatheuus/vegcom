import { NextRequest, NextResponse } from "next/server";

const MIN_QUERY_LENGTH = 4;
const RESULT_LIMIT = 5;

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    house_number?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    "ISO3166-2-lvl4"?: string;
    postcode?: string;
  };
}

export interface GeocodeSuggestion {
  id: string;
  displayName: string;
  lat: number;
  lng: number;
  address: {
    road?: string;
    houseNumber?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
}

function normalize(result: NominatimResult): GeocodeSuggestion | null {
  const lat = Number(result.lat);
  const lng = Number(result.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const address = result.address ?? {};

  return {
    id: String(result.place_id),
    displayName: result.display_name,
    lat,
    lng,
    address: {
      road: address.road,
      houseNumber: address.house_number,
      suburb: address.suburb ?? address.neighbourhood,
      city:
        address.city ??
        address.town ??
        address.village ??
        address.municipality,
      // "BR-SP" → "SP"
      state: address["ISO3166-2-lvl4"]?.split("-")[1],
      postcode: address.postcode,
    },
  };
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json([]);
  }

  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: String(RESULT_LIMIT),
    countrycodes: "br",
    "accept-language": "pt-BR",
    q: query,
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      // A política do Nominatim exige um User-Agent identificando a aplicação.
      headers: { "User-Agent": "VegCom/1.0 (comunidade vegana)" },
      next: { revalidate: 86400 },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "geocode_upstream_error" },
      { status: 502 },
    );
  }

  const results = (await response.json()) as NominatimResult[];
  const suggestions = results
    .map(normalize)
    .filter((item): item is GeocodeSuggestion => item !== null);

  return NextResponse.json(suggestions);
}
