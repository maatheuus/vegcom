"use client";

import { useMemo, useState } from "react";
import type {
  MapContentFilter,
  PlaceDistanceFilter,
} from "../components/MapFilters";
import { NEARBY_PLACES_RADIUS_KM } from "../constants";
import type { DirectoryEvent, Place, PlaceCategory } from "../types";
import { haversineDistance } from "./haversineDistance";

const MONTH_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

export function useMapContentFilters(
  places: Place[],
  events: DirectoryEvent[],
  userPosition: [number, number] | null,
  onRequestLocation: () => void,
) {
  const [content, setContent] = useState<MapContentFilter>("all");
  const [eventMonth, setEventMonth] = useState("all");
  const [placeCategory, setPlaceCategory] = useState<PlaceCategory | "all">(
    "all",
  );
  const [placeDistance, setPlaceDistance] =
    useState<PlaceDistanceFilter>("all");

  const eventMonths = [
    ...new Set(events.map((event) => event.date.slice(0, 7))),
  ]
    .sort()
    .map((value) => ({
      value,
      label: `Data: ${MONTH_FORMATTER.format(new Date(`${value}-02T12:00:00`))}`,
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
        : places.filter((place) => {
            const matchesCategory =
              placeCategory === "all" || place.category === placeCategory;
            const matchesDistance =
              placeDistance === "all" ||
              (userPosition !== null &&
                haversineDistance(
                  userPosition[0],
                  userPosition[1],
                  place.lat,
                  place.lng,
                ) <= NEARBY_PLACES_RADIUS_KM);

            return matchesCategory && matchesDistance;
          }),
    [content, placeCategory, placeDistance, places, userPosition],
  );

  const changeContent = (nextContent: MapContentFilter) => {
    setContent(nextContent);
    if (nextContent !== "events") setEventMonth("all");
    if (nextContent !== "places") {
      setPlaceCategory("all");
      setPlaceDistance("all");
    }
  };

  const changePlaceDistance = (nextDistance: PlaceDistanceFilter) => {
    setPlaceDistance(nextDistance);
    if (nextDistance === "nearby" && !userPosition) onRequestLocation();
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
      selectedDistance: placeDistance,
      onDistanceChange: changePlaceDistance,
    },
    visibleEvents,
    visiblePlaces,
    showAllEvents,
  };
}
