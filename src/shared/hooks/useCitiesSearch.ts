/**
 * Cities search hook - Integrated with IBGE API
 */

import { CitiesAPI, type CitySearchResult } from "@/shared/lib/api/cities";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Options for the useCitiesSearch hook.
 */
interface UseCitiesSearchOptions {
  /** The delay in milliseconds for debouncing search requests. */
  debounceMs?: number;
  /** The minimum length of the query string required to trigger a search. */
  minQueryLength?: number;
}

/**
 * Custom hook for searching cities using the IBGE API with debouncing.
 *
 * @param {UseCitiesSearchOptions} [options={}] - Configuration options for the search.
 * @returns {Object} An object containing search state and functions.
 * @returns {CitySearchResult[]} return.cities - The list of cities found.
 * @returns {boolean} return.isLoading - Whether a search is currently in progress.
 * @returns {string | null} return.error - Error message if the search failed.
 * @returns {boolean} return.hasResults - Whether the last search returned any results.
 * @returns {Function} return.searchCities - Function to trigger a search with a query string.
 * @returns {Function} return.clearSearch - Function to clear the search results and state.
 */
export function useCitiesSearch(options: UseCitiesSearchOptions = {}) {
  const { debounceMs = 300, minQueryLength = 2 } = options;

  const [cities, setCities] = useState<CitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasResults, setHasResults] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQueryRef = useRef<string>("");

  /**
   * Searches for cities matching the given query.
   * Debounces the API call to avoid excessive requests.
   *
   * @param {string} query - The search term (e.g., city name).
   */
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

  /**
   * Clears the current search results and resets state.
   */
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
