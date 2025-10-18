import { CitiesAPI } from "@/lib/api/cities";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

interface UseCitiesSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

export function useCitiesSearch(options: UseCitiesSearchOptions = {}) {
  const { debounceMs = 300, minQueryLength = 2 } = options;
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const {
    data: cities = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["cities", debouncedQuery],
    queryFn: () => CitiesAPI.searchCities(debouncedQuery),
    enabled: debouncedQuery.length >= minQueryLength,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const searchCities = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  return {
    cities,
    isLoading,
    error,
    isError,
    searchCities,
    clearSearch,
    query,
    hasResults: cities.length > 0,
  };
}
