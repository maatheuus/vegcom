"use client";

import { useMemo, useState } from "react";
import type { MapContentFilter } from "../components/MapFilters";
import type { DirectoryEvent, Place, PlaceCategory } from "../types";

const MONTH_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

export function useMapContentFilters(
  places: Place[],
  events: DirectoryEvent[],
) {
  const [content, setContent] = useState<MapContentFilter>("all");
  const [eventMonth, setEventMonth] = useState("all");
  const [placeCategory, setPlaceCategory] = useState<PlaceCategory | "all">(
    "all",
  );

  const eventMonths = [
    ...new Set(events.map((event) => event.date.slice(0, 7))),
  ]
    .sort()
    .map((value) => ({
      value,
      label: MONTH_FORMATTER.format(new Date(`${value}-02T12:00:00`)),
    }));
  const placeCategories = [...new Set(places.map((place) => place.category))];

  // Memorizados: o mapa refaz o enquadramento quando a referência de `events` muda.
  const visibleEvents = useMemo(
    () =>
      content === "places"
        ? []
        : events.filter(
            (event) =>
              eventMonth === "all" || event.date.startsWith(eventMonth),
          ),
    [content, eventMonth, events],
  );
  const visiblePlaces = useMemo(
    () =>
      content === "events"
        ? []
        : places.filter(
            (place) =>
              placeCategory === "all" || place.category === placeCategory,
          ),
    [content, placeCategory, places],
  );

  const changeContent = (nextContent: MapContentFilter) => {
    setContent(nextContent);
    if (nextContent !== "events") setEventMonth("all");
    if (nextContent !== "places") setPlaceCategory("all");
  };

  const showAllEvents = () => {
    setContent("events");
    setEventMonth("all");
  };

  return {
    filterProps: {
      content,
      onContentChange: changeContent,
      eventCount: events.length,
      placeCount: places.length,
      months: eventMonths,
      selectedMonth: eventMonth,
      onMonthChange: setEventMonth,
      categories: placeCategories,
      selectedCategory: placeCategory,
      onCategoryChange: setPlaceCategory,
    },
    visibleEvents,
    visiblePlaces,
    showAllEvents,
  };
}
