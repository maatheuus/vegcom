"use client";

import clsx from "clsx";
import {
  Coffee,
  Croissant,
  MapPin,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo } from "react";
import { CATEGORY_LABELS } from "../constants";
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
    label: CATEGORY_LABELS.restaurant,
    icon: <UtensilsCrossed className="h-4 w-4" aria-hidden />,
  },
  {
    key: "market",
    label: CATEGORY_LABELS.market,
    icon: <ShoppingBag className="h-4 w-4" aria-hidden />,
  },
  {
    key: "bakery",
    label: CATEGORY_LABELS.bakery,
    icon: <Croissant className="h-4 w-4" aria-hidden />,
  },
  {
    key: "cafe",
    label: CATEGORY_LABELS.cafe,
    icon: <Coffee className="h-4 w-4" aria-hidden />,
  },
  {
    key: "entrepreneur",
    label: CATEGORY_LABELS.entrepreneur,
    icon: <Store className="h-4 w-4" aria-hidden />,
  },
  {
    key: "other",
    label: CATEGORY_LABELS.other,
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
      <div className="hidden-scrollbar pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-[1.35rem] border border-green-200 sm:flex-wrap sm:justify-center sm:overflow-x-visible">
        {visibleFilters.map((filter) => {
          const isActive = isAllActive || activeFilters.includes(filter.key);
          const count =
            filter.key === "all"
              ? (counts.all ?? 0)
              : (counts[filter.key] ?? 0);

          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => onToggle(filter.key)}
              className={clsx(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "active:bg-black-100 bg-green-500 text-white shadow-[0_3px_10px_rgba(27,78,48,0.22)] hover:bg-green-200"
                  : "bg-white text-green-200 hover:bg-green-100 hover:text-green-500 active:bg-green-100",
              )}
              aria-pressed={isActive}
            >
              {filter.icon}
              <span>{filter.label}</span>
              <span
                className={clsx(
                  "-mr-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] leading-none font-semibold",
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-green-100 text-green-500",
                )}
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
