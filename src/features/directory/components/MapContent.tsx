"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import { PlaceMarkersCluster } from "./PlaceMarkersCluster";
import { EventMarkers } from "./EventMarkers";
import { createPendingMarkerIcon } from "./markerIcons";
import type { GeolocationState } from "../hooks/useGeolocation";
import type { DirectoryEvent, Place } from "../types";

// Enquadra o Brasil inteiro (sem mostrar o continente todo)
const BRAZIL_BOUNDS = L.latLngBounds([-33.87, -73.99], [5.27, -34.72]);
// Zoom aproximado de cidade quando o usuário compartilha a localização
const USER_ZOOM = 11;

interface MapContentProps {
  places: Place[];
  events: DirectoryEvent[];
  selectedPlaceId: number | null;
  onPlaceSelect: (place: Place) => void;
  onMapClick: () => void;
  pickMode?: boolean;
  pendingCoords?: [number, number] | null;
  onLocationPick?: (lat: number, lng: number) => void;
  userPosition?: [number, number] | null;
  geoState?: GeolocationState;
}

export function MapContent({
  places,
  events,
  selectedPlaceId,
  onPlaceSelect,
  onMapClick,
  pickMode = false,
  pendingCoords = null,
  onLocationPick,
  userPosition = null,
  geoState = "idle",
}: MapContentProps) {
  return (
    <MapContainer
      bounds={BRAZIL_BOUNDS}
      zoomControl={false}
      className="h-full w-full"
      scrollWheelZoom
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <PlaceMarkersCluster
        places={places}
        selectedPlaceId={selectedPlaceId}
        onPlaceSelect={onPlaceSelect}
      />
      <EventMarkers events={events} />
      {userPosition && (
        <Marker
          position={userPosition}
          icon={createUserLocationIcon()}
          interactive={false}
        />
      )}
      {pendingCoords && (
        <Marker position={pendingCoords} icon={createPendingMarkerIcon()} />
      )}
      <MapClickHandler
        pickMode={pickMode}
        onClick={onMapClick}
        onLocationPick={onLocationPick}
      />
      <PickModeCursor pickMode={pickMode} />
      <InitialViewController userPosition={userPosition} geoState={geoState} />
      <MapResizeObserver />
    </MapContainer>
  );
}

function MapResizeObserver() {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      map.invalidateSize({ animate: false }),
    );
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);

  return null;
}

/**
 * Define a vista inicial uma única vez:
 * - localização concedida → voa para a cidade do usuário
 * - negada/erro → mantém o enquadramento do Brasil
 */
function InitialViewController({
  userPosition,
  geoState,
}: {
  userPosition: [number, number] | null;
  geoState: GeolocationState;
}) {
  const map = useMap();
  const hasCenteredOnUser = useRef(false);
  const hasFittedBrazil = useRef(false);

  useEffect(() => {
    if (geoState === "success" && userPosition && !hasCenteredOnUser.current) {
      hasCenteredOnUser.current = true;
      map.flyTo(userPosition, USER_ZOOM, { duration: 1.4 });
      return;
    }

    if (geoState === "skipped") {
      map.fitBounds(BRAZIL_BOUNDS, { padding: [8, 8] });
      return;
    }

    if (geoState !== "loading" && !hasFittedBrazil.current) {
      hasFittedBrazil.current = true;
      map.fitBounds(BRAZIL_BOUNDS, { padding: [8, 8] });
    }
  }, [map, geoState, userPosition]);

  return null;
}

function createUserLocationIcon(): L.DivIcon {
  const html = `<div style="position:relative;width:20px;height:20px;">
    <span class="animate-ping" style="position:absolute;inset:0;border-radius:9999px;background:rgba(39,107,55,0.35);"></span>
    <span style="position:absolute;inset:4px;border-radius:9999px;background:#276b37;border:2px solid #fff;box-shadow:0 1px 4px rgba(27,78,48,0.35);"></span>
  </div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function PickModeCursor({ pickMode }: { pickMode: boolean }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.style.cursor = pickMode ? "crosshair" : "";
    return () => {
      container.style.cursor = "";
    };
  }, [map, pickMode]);

  return null;
}

function MapClickHandler({
  pickMode,
  onClick,
  onLocationPick,
}: {
  pickMode: boolean;
  onClick: () => void;
  onLocationPick?: (lat: number, lng: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handler = (e: L.LeafletMouseEvent) => {
      if (pickMode && onLocationPick) {
        onLocationPick(e.latlng.lat, e.latlng.lng);
      } else {
        onClick();
      }
    };
    map.on("click", handler);
    return () => {
      map.off("click", handler);
    };
  }, [map, pickMode, onClick, onLocationPick]);

  return null;
}
