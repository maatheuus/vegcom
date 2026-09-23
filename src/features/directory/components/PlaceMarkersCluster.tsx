"use client";

import { memo, useCallback } from "react";
import { Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { createMarkerIcon } from "./markerIcons";
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
  onPlaceSelect: (place: Place) => void;
}

/**
 * Não depende da seleção: o marcador selecionado é desenhado por cima, fora do
 * cluster (ver SelectedPlaceMarker). Assim, clicar num local não reconstrói o
 * cluster group inteiro — a maior fonte de travada ao selecionar.
 */
function PlaceMarkersClusterComponent({
  places,
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
      chunkedLoading
      removeOutsideVisibleBounds
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createMarkerIcon(place)}
          eventHandlers={{
            click: () => onPlaceSelect(place),
          }}
        >
          <Tooltip
            className="place-marker-tooltip"
            direction="top"
            offset={[0, -24]}
            opacity={1}
          >
            {place.name}
          </Tooltip>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

export const PlaceMarkersCluster = memo(PlaceMarkersClusterComponent);
