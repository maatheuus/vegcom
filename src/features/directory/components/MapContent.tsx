"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import type { GeolocationState } from "../hooks/useGeolocation";
import type { DirectoryEvent, Place } from "../types";
import { EventMarkers } from "./EventMarkers";
import { createPendingMarkerIcon } from "./markerIcons";
import { PlaceMarkersCluster } from "./PlaceMarkersCluster";

// Enquadra o Brasil inteiro (sem mostrar o continente todo)
const BRAZIL_BOUNDS = L.latLngBounds([-55.0, -85.0], [25.0, -10.0]);
const BRAZIL_MAX_BOUNDS = BRAZIL_BOUNDS.pad(0.8);

/**
 * Enquadra o Brasil preenchendo a tela (`inside`), em vez de caber inteiro nela:
 * em telas estreitas o "caber inteiro" sobrava muito continente em volta.
 */
function fitBrazil(map: L.Map): boolean {
  const size = map.getSize();
  if (size.x < 2 || size.y < 2) return false;

  const zoom = Math.max(0, map.getBoundsZoom(BRAZIL_BOUNDS, true) - 1);

  map.setView(BRAZIL_BOUNDS.getCenter(), zoom, { animate: false });
  map.setMinZoom(zoom);
  return true;
}

// Zoom aproximado de cidade quando o usuário compartilha a localização
const USER_ZOOM = 11;
const CARTO_BASEMAPS_API_KEY = process.env.NEXT_PUBLIC_CARTO_BASEMAPS_API_KEY;
const CARTO_VOYAGER_TILE_URL = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${
  CARTO_BASEMAPS_API_KEY
    ? `?key=${encodeURIComponent(CARTO_BASEMAPS_API_KEY)}`
    : ""
}`;

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
  focusEventsRequest?: number;
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
  focusEventsRequest = 0,
}: MapContentProps) {
  return (
    <MapContainer
      bounds={BRAZIL_BOUNDS}
      maxBounds={BRAZIL_MAX_BOUNDS}
      maxBoundsViscosity={1}
      zoomControl={false}
      className="h-full w-full"
      scrollWheelZoom
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url={CARTO_VOYAGER_TILE_URL}
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
      <EventsViewController events={events} request={focusEventsRequest} />
    </MapContainer>
  );
}

function EventsViewController({
  events,
  request,
}: {
  events: DirectoryEvent[];
  request: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (request === 0) return;

    const positions = events.flatMap((event) =>
      event.lat === undefined || event.lng === undefined
        ? []
        : [[event.lat, event.lng] as [number, number]],
    );

    if (positions.length === 0) return;

    if (positions.length === 1) {
      map.flyTo(positions[0], 8, { duration: 0.8 });
      return;
    }

    map.fitBounds(L.latLngBounds(positions), {
      animate: true,
      duration: 0.8,
      maxZoom: 8,
      padding: [48, 48],
    });
  }, [events, map, request]);

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
    const observer = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
      if (!hasCenteredOnUser.current) {
        hasFittedBrazil.current = fitBrazil(map) || hasFittedBrazil.current;
      }
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);

  useEffect(() => {
    if (geoState === "success" && userPosition && !hasCenteredOnUser.current) {
      hasCenteredOnUser.current = true;
      map.flyTo(userPosition, USER_ZOOM, { duration: 1.4 });
      return;
    }

    if (geoState === "skipped") {
      fitBrazil(map);
      return;
    }

    if (geoState !== "loading" && !hasFittedBrazil.current) {
      hasFittedBrazil.current = fitBrazil(map);
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
