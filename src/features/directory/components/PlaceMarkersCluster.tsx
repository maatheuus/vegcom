"use client";

import { useCallback } from "react";
import { Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { createMarkerIcon, createSelectedMarkerIcon } from "./markerIcons";
import type { Place } from "../types";

const CLUSTER_BASE_SIZE = 44;

function createClusterIcon(count: number): L.DivIcon {
  const size = CLUSTER_BASE_SIZE + (count > 99 ? 10 : count > 9 ? 4 : 0);
  const fontSize = count > 99 ? 13 : count > 9 ? 14 : 15;
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <filter id="cs" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#1b4e30" filter="url(#cs)"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 4}" fill="white" opacity="0.2"/>
      <text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="central" fill="white" font-size="${fontSize}" font-weight="700" font-family="system-ui,sans-serif">${count}</text>
    </svg>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

interface PlaceMarkersClusterProps {
  places: Place[];
  selectedPlaceId: number | null;
  onPlaceSelect: (place: Place) => void;
}

export function PlaceMarkersCluster({
  places,
  selectedPlaceId,
  onPlaceSelect,
}: PlaceMarkersClusterProps) {
  const iconCreateFunction = useCallback(
    (cluster: L.MarkerCluster) => createClusterIcon(cluster.getChildCount()),
    [],
  );

  if (places.length === 0) return null;

  return (
    <MarkerClusterGroup
      iconCreateFunction={iconCreateFunction}
      maxClusterRadius={50}
      spiderfyOnMaxZoom
      showCoverageOnHover={false}
      zoomToBoundsOnClick
    >
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
              {place.name}
            </Tooltip>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
}
