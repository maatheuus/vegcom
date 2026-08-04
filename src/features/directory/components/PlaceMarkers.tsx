"use client";

import { Marker } from "react-leaflet";
import { createMarkerIcon, createSelectedMarkerIcon } from "./markerIcons";
import type { Place, PlaceCategory } from "../types";

interface PlaceMarkersProps {
  places: Place[];
  selectedPlaceId: number | null;
  onPlaceSelect: (place: Place) => void;
}

export function PlaceMarkers({
  places,
  selectedPlaceId,
  onPlaceSelect,
}: PlaceMarkersProps) {
  if (places.length === 0) return null;

  return (
    <>
      {places.map((place) => {
        const isSelected = place.id === selectedPlaceId;
        const icon = isSelected
          ? createSelectedMarkerIcon(place.category as PlaceCategory)
          : createMarkerIcon(place.category as PlaceCategory);

        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onPlaceSelect(place),
            }}
          />
        );
      })}
    </>
  );
}
