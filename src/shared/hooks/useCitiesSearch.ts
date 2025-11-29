/**
 * Cities search hook - Integrated with IBGE API
 */

import { CitiesAPI, type CitySearchResult } from "@/shared/lib/api/cities";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseCitiesSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

export function useCitiesSearch(options: UseCitiesSearchOptions = {}) {
  const { debounceMs = 300, minQueryLength = 2 } = options;

  const [cities, setCities] = useState<CitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasResults, setHasResults] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQueryRef = useRef<string>("");

  const searchCities = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      currentQueryRef.current = query;

      if (query.length < minQueryLength) {
        setCities([]);
        setHasResults(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      debounceTimerRef.current = setTimeout(async () => {
        try {
          const results = await CitiesAPI.searchCities(query);

          if (currentQueryRef.current === query) {
            setCities(results);
            setHasResults(results.length > 0);
            setIsLoading(false);
          }
        } catch (err) {
          if (currentQueryRef.current === query) {
            setError(
              err instanceof Error ? err.message : "Error searching cities",
            );
            setCities([]);
            setHasResults(false);
            setIsLoading(false);
          }
        }
      }, debounceMs);
    },
    [debounceMs, minQueryLength],
  );

  const clearSearch = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setCities([]);
    setHasResults(false);
    setIsLoading(false);
    setError(null);
    currentQueryRef.current = "";
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    cities,
    isLoading,
    error,
    hasResults,
    searchCities,
    clearSearch,
  };
}
