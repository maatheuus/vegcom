"use client";

import dynamic from "next/dynamic";
import type { GeolocationState } from "../hooks/useGeolocation";
import type { DirectoryEvent, Place } from "../types";

const MapContent = dynamic(
  () => import("./MapContent").then((m) => ({ default: m.MapContent })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-green-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
          <p className="text-sm text-green-600/60">Carregando mapa...</p>
        </div>
      </div>
    ),
  },
);

interface MapViewProps {
  places: Place[];
  events: DirectoryEvent[];
  selectedPlaceId: number | null;
  onPlaceSelect: (place: Place) => void;
  onMapClick: () => void;
  userPosition?: [number, number] | null;
  geoState?: GeolocationState;
  pickMode?: boolean;
  pendingCoords?: [number, number] | null;
  onLocationPick?: (lat: number, lng: number) => void;
  focusEventsRequest?: number;
  focusPendingRequest?: number;
}

export function MapView({
  places,
  events,
  selectedPlaceId,
  onPlaceSelect,
  onMapClick,
  userPosition,
  geoState,
  pickMode,
  pendingCoords,
  onLocationPick,
  focusEventsRequest = 0,
  focusPendingRequest = 0,
}: MapViewProps) {
  return (
    <div className="h-full w-full">
      <MapContent
        places={places}
        events={events}
        selectedPlaceId={selectedPlaceId}
        onPlaceSelect={onPlaceSelect}
        onMapClick={onMapClick}
        userPosition={userPosition}
        geoState={geoState}
        pickMode={pickMode}
        pendingCoords={pendingCoords}
        onLocationPick={onLocationPick}
        focusEventsRequest={focusEventsRequest}
        focusPendingRequest={focusPendingRequest}
      />
    </div>
  );
}
