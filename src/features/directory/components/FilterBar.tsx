"use client";

import { useMemo } from "react";
import { ShoppingBag, Croissant, Coffee, Store, MapPin, UtensilsCrossed } from "lucide-react";
import type { PlaceCategory } from "../types";
import type { FilterCategory } from "../types";

interface FilterOption {
  key: FilterCategory;
  label: string;
  icon: React.ReactNode;
}

const FILTERS: FilterOption[] = [
  { key: "all", label: "Todos", icon: null },
  {
    key: "restaurant",
    label: "Restaurantes",
    icon: <UtensilsCrossed className="h-4 w-4" aria-hidden />,
  },
  {
    key: "market",
    label: "Feiras",
    icon: <ShoppingBag className="h-4 w-4" aria-hidden />,
  },
  {
    key: "bakery",
    label: "Padarias",
    icon: <Croissant className="h-4 w-4" aria-hidden />,
  },
  {
    key: "cafe",
    label: "Cafés",
    icon: <Coffee className="h-4 w-4" aria-hidden />,
  },
  {
    key: "entrepreneur",
    label: "Empreendedores",
    icon: <Store className="h-4 w-4" aria-hidden />,
  },
  {
    key: "other",
    label: "Outros",
    icon: <MapPin className="h-4 w-4" aria-hidden />,
  },
];

interface FilterBarProps {
  activeFilters: FilterCategory[];
  counts: Record<string, number>;
  onToggle: (category: FilterCategory) => void;
}

export function FilterBar({ activeFilters, counts, onToggle }: FilterBarProps) {
  const isAllActive = activeFilters.includes("all");

  const visibleFilters = useMemo(
    () => FILTERS.filter((f) => f.key === "all" || (counts[f.key] ?? 0) > 0),
    [counts],
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[4.25rem] z-[1000] flex justify-center px-3 sm:top-4 sm:px-28">
      <div className="hidden-scrollbar pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-[1.35rem] border border-green-200 bg-white px-2 py-2 shadow-[0_12px_30px_rgba(27,78,48,0.16)] sm:flex-wrap sm:justify-center sm:overflow-x-visible">
        {visibleFilters.map((filter) => {
          const isActive = isAllActive || activeFilters.includes(filter.key);
          const count = filter.key === "all"
            ? (counts.all ?? 0)
            : (counts[filter.key] ?? 0);

          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => onToggle(filter.key)}
              className={[
                "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2",
                isActive
                  ? "bg-green-500 text-white shadow-[0_3px_10px_rgba(27,78,48,0.22)] hover:bg-green-200 active:bg-black-100"
                  : "bg-white text-green-200 hover:bg-green-100 hover:text-green-500 active:bg-green-100",
              ].join(" ")}
              aria-pressed={isActive}
            >
              {filter.icon}
              <span>{filter.label}</span>
              <span
                className={[
                  "-mr-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold leading-none",
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-green-100 text-green-500",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
