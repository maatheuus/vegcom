"use client";

import { MapPin, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { AddressSuggestion } from "../../hooks/geocode";
import { useAddressSearch } from "../../hooks/useAddressSearch";
import { inputClassName } from "../FormModal/FormField";

const MIN_QUERY_LENGTH = 4;

interface AddressSearchFieldProps {
  onSelect: (suggestion: AddressSuggestion) => void;
}

export function AddressSearchField({ onSelect }: AddressSearchFieldProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const { results, isLoading, hasError, hasSearched, search, retry, clear } =
    useAddressSearch();

  const isQueryLongEnough = query.trim().length >= MIN_QUERY_LENGTH;
  const showNoResults =
    isQueryLongEnough &&
    hasSearched &&
    !isLoading &&
    !hasError &&
    results.length === 0;
  const isPanelOpen =
    isOpen &&
    isQueryLongEnough &&
    (isLoading || hasError || showNoResults || results.length > 0);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    search(value);
  };

  const handleSelect = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.displayName);
    setIsOpen(false);
    setActiveIndex(-1);
    clear();
    inputRef.current?.blur();
    onSelect(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (
        document.activeElement !== inputRef.current &&
        !listRef.current?.contains(document.activeElement)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }, 150);
  };

  // Anúncio para leitores de tela (aria-live).
  const liveMessage = !isQueryLongEnough
    ? ""
    : isLoading
      ? "Buscando endereços..."
      : hasError
        ? "Erro ao buscar endereços."
        : showNoResults
          ? "Nenhum endereço encontrado."
          : results.length > 0
            ? `${results.length} ${results.length === 1 ? "endereço encontrado" : "endereços encontrados"}.`
            : "";

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-green-500"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isPanelOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Digite o endereço (rua, número, cidade)"
          className={`${inputClassName} pl-9`}
        />
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </p>

      {isPanelOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-green-200 bg-white shadow-md">
          {isLoading ? (
            <p className="flex items-center gap-2 px-3 py-2.5 text-sm text-green-600">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
              Buscando endereços...
            </p>
          ) : hasError ? (
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-green-700">
              <span>Erro ao buscar. Verifique a conexão.</span>
              <button
                type="button"
                onClick={retry}
                className="shrink-0 rounded-lg px-2 py-1 font-semibold text-green-600 underline underline-offset-2 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
              >
                Tentar de novo
              </button>
            </div>
          ) : showNoResults ? (
            <p className="px-3 py-2.5 text-sm text-green-600">
              Nenhum endereço encontrado. Marque o ponto direto no mapa.
            </p>
          ) : (
            <ul ref={listRef} id={listboxId} role="listbox" className="p-1">
              {results.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(suggestion);
                  }}
                  className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    activeIndex === index
                      ? "bg-green-600 text-green-50"
                      : "text-green-800 hover:bg-green-100"
                  }`}
                >
                  <MapPin
                    className={`h-4 w-4 shrink-0 ${activeIndex === index ? "text-green-50" : "text-green-500"}`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate">
                    {suggestion.displayName}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
