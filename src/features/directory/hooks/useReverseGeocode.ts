"use client";

import { useEffect, useState } from "react";

interface NominatimAddress {
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
}

export interface ReverseGeocodeResult {
  /** "Rua Augusta, 1500, Consolação" */
  street: string;
  /** "São Paulo, SP" */
  city: string;
}

function formatResult(address: NominatimAddress): ReverseGeocodeResult {
  const streetParts = [
    [address.road, address.house_number].filter(Boolean).join(", "),
    address.suburb || address.neighbourhood,
  ].filter(Boolean);

  const cityName =
    address.city || address.town || address.village || address.municipality;
  // "BR-SP" → "SP"
  const uf = address["ISO3166-2-lvl4"]?.split("-")[1];

  return {
    street: streetParts.join(", "),
    city: [cityName, uf].filter(Boolean).join(", "),
  };
}

/**
 * Resolve endereço aproximado a partir das coordenadas do pin (Nominatim/OSM).
 * Retorna null enquanto carrega ou se a busca falhar.
 */
export function useReverseGeocode(coords: [number, number] | null) {
  const [result, setResult] = useState<ReverseGeocodeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!coords) {
      setResult(null);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setResult(null);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}&accept-language=pt-BR&zoom=18`,
      { signal: controller.signal },
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.address) {
          setResult(formatResult(data.address as NominatimAddress));
        }
      })
      .catch(() => {
        // silencioso — usuário preenche manualmente
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [coords]);

  return { result, isLoading };
}
