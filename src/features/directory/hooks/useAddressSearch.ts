"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type AddressSuggestion, searchAddress } from "./geocode";

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 4;

/**
 * Busca endereços com debounce, espelhando o useCitiesSearch.
 * Expõe estados de carregando/erro para a UI mostrar spinner, "sem resultado"
 * e "tentar de novo" sem travar o usuário (ele sempre pode marcar no mapa).
 */
export function useAddressSearch() {
  const [results, setResults] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  // Vira true depois da primeira busca concluída, para diferenciar "vazio" de "ainda não buscou".
  const [hasSearched, setHasSearched] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQueryRef = useRef("");

  const run = useCallback(async (query: string) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const suggestions = await searchAddress(query);
      if (currentQueryRef.current !== query) return;
      setResults(suggestions);
      setHasSearched(true);
    } catch {
      if (currentQueryRef.current !== query) return;
      setHasError(true);
      setResults([]);
    } finally {
      if (currentQueryRef.current === query) setIsLoading(false);
    }
  }, []);

  const search = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      currentQueryRef.current = query;

      if (query.trim().length < MIN_QUERY_LENGTH) {
        setResults([]);
        setHasError(false);
        setHasSearched(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      debounceTimerRef.current = setTimeout(() => run(query), DEBOUNCE_MS);
    },
    [run],
  );

  const retry = useCallback(() => {
    const query = currentQueryRef.current;
    if (query.trim().length >= MIN_QUERY_LENGTH) run(query);
  }, [run]);

  const clear = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    currentQueryRef.current = "";
    setResults([]);
    setIsLoading(false);
    setHasError(false);
    setHasSearched(false);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  return { results, isLoading, hasError, hasSearched, search, retry, clear };
}
