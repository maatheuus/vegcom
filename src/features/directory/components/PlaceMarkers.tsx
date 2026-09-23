"use client";

import { Marker, Tooltip } from "react-leaflet";
import { DietTag } from "./DietTag";
import { createMarkerIcon, createSelectedMarkerIcon } from "./markerIcons";
import type { Place } from "../types";

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
          ? createSelectedMarkerIcon(place)
          : createMarkerIcon(place);

        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onPlaceSelect(place),
            }}
          >
            <Tooltip
              className="place-marker-tooltip"
              direction="top"
              offset={[0, -24]}
              opacity={1}
              permanent={isSelected}
            >
              <span className="flex flex-col items-center gap-1">
                <span>{place.name}</span>
                <DietTag diet={place.diet} />
              </span>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}
