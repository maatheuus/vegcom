import { ChevronDownOutlinedIcon } from "@/components/icons";
import { useCitiesSearch } from "@/hooks/useCitiesSearch";
import { type CitySearchResult } from "@/lib/api/cities";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { MapPinIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Input";

interface SearchCityLocationProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (city: CitySearchResult) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function SearchCityLocation({
  value = "",
  onChange,
  onSelect,
  placeholder = "Digite sua cidade...",
  className,
  disabled = false,
  error = false,
}: SearchCityLocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { cities, isLoading, searchCities, clearSearch, hasResults } =
    useCitiesSearch({
      debounceMs: 300,
      minQueryLength: 2,
    });

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);

    if (newValue.length >= 2) {
      searchCities(newValue);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
      clearSearch();
    }
  };

  const handleCitySelect = (city: CitySearchResult) => {
    setInputValue(city.displayName);
    onChange?.(city.displayName);
    onSelect?.(city);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || cities.length === 0) {
      if (e.key === "ArrowDown" && inputValue.length >= 2) {
        setIsOpen(true);
        setSelectedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < cities.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cities.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < cities.length) {
          handleCitySelect(cities[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (inputValue.length >= 2 && hasResults) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!listRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedItem = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          id="searchCitiesInput"
          autoComplete="on"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
          ) : (
            <ChevronDownOutlinedIcon
              className={clsx(
                "h-4 w-4 text-green-500 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          )}
        </div>
      </div>

      {isOpen && (hasResults || isLoading) && (
        <div className="style-scrollbar absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-sm border bg-green-50 text-green-500 shadow-md">
          <ul ref={listRef} className="p-1">
            {isLoading ? (
              <li className="flex items-center gap-2 px-3 py-2 text-sm text-green-500">
                <div className="border-muted-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                Buscando cidades...
              </li>
            ) : hasResults ? (
              cities.map((city, index) => (
                <li
                  key={city.id}
                  className={cn(
                    "group focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors outline-none select-none hover:bg-green-200 hover:text-green-50",
                    selectedIndex === index && "bg-green-600 text-green-50",
                  )}
                  onClick={() => handleCitySelect(city)}
                >
                  <MapPinIcon className="h-4 w-4 flex-shrink-0 text-green-500 group-hover:text-green-50" />
                  <div className="min-w-0 flex-1">
                    {city.nome && (
                      <div className="font-maitree truncate font-medium">
                        {city.nome}
                      </div>
                    )}
                    <div className="font-lora truncate text-xs text-green-500 group-hover:text-green-50">
                      {!city.estado || !city.sigla ? (
                        <>
                          {city.estado && city.estado}{" "}
                          {city.sigla && city.sigla}
                        </>
                      ) : (
                        <>
                          {city.estado}, {city.sigla}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))
            ) : inputValue.length >= 2 ? (
              <li className="px-3 py-2 text-sm text-green-500">
                Nenhuma cidade encontrada
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
}
