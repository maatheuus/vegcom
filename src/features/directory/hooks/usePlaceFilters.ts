"use client";

import { useCallback, useMemo, useState } from "react";
import { usePlaces } from "../api/queries/getDirectoryApiClient";
import type { FilterCategory, PlaceCategory } from "../types";

export function usePlaceFilters() {
  const { data: places = [], isLoading, isError } = usePlaces();
  const [activeFilters, setActiveFilters] = useState<FilterCategory[]>(["all"]);

  const toggleFilter = useCallback((category: FilterCategory) => {
    setActiveFilters((prev) => {
      if (category === "all") return ["all"];
      const withoutAll = prev.filter((f) => f !== "all");
      const exists = withoutAll.includes(category);
      const next = exists
        ? withoutAll.filter((f) => f !== category)
        : [...withoutAll, category];
      return next.length === 0 ? ["all"] : next;
    });
  }, []);

  const filteredPlaces = useMemo(
    () =>
      places.filter((place) => {
        if (activeFilters.includes("all")) return true;
        return activeFilters.includes(place.category as PlaceCategory);
      }),
    [places, activeFilters],
  );

  const counts = places.reduce(
    (acc, p) => {
      const cat = p.category as PlaceCategory;
      acc[cat] = (acc[cat] || 0) + 1;
      acc.all = (acc.all || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    activeFilters,
    toggleFilter,
    filteredPlaces,
    counts,
    isLoading,
    isError,
  };
}
