"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import { useEvents, usePlaces } from "../../api/queries/getDirectoryApiClient";
import { haversineDistance } from "../../hooks/haversineDistance";
import type { useGeolocation } from "../../hooks/useGeolocation";
import { useMapContentFilters } from "../../hooks/useMapContentFilters";
import type { DirectoryEvent, Place } from "../../types";
import { AddPlaceModal } from "../AddPlaceModal/AddPlaceModal";
import { LocationPrompt } from "../LocationPrompt";
import { MapFilters } from "../MapFilters";
import { MapGuideCard } from "../MapGuideCard";
import { MapView } from "../MapView";
import { PlaceDetailPanel } from "../PlaceDetailPanel/PlaceDetailPanel";
import { ReportModal } from "../ReportModal";
import { AddToMapFab } from "./AddToMapFab";
import { DistantEventsNotice } from "./DistantEventsNotice";
import { MapExpandToggle } from "./MapExpandToggle";
import { PickLocationBanner } from "./PickLocationBanner";

const NEARBY_EVENTS_RADIUS_KM = 50;

type MappedEvent = DirectoryEvent & { lat: number; lng: number };

const hasCoordinates = (event: DirectoryEvent): event is MappedEvent =>
  event.lat !== undefined && event.lng !== undefined;

interface MapTabProps {
  geolocation: ReturnType<typeof useGeolocation>;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onViewEvents: () => void;
}

export function MapTab({
  geolocation,
  isExpanded,
  onToggleExpanded,
  onViewEvents,
}: MapTabProps) {
  const { position: userPosition, state: geoState } = geolocation;
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(
    null,
  );
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isMapGuideOpen, setIsMapGuideOpen] = useState(false);
  const [focusEventsRequest, setFocusEventsRequest] = useState(0);
  const [isDistantNoticeDismissed, setIsDistantNoticeDismissed] =
    useState(false);
  const { data: places = [] } = usePlaces();
  const { data: upcomingEventsPage } = useEvents({
    page: 1,
    limit: 50,
    period: "upcoming",
  });
  const upcomingEvents = upcomingEventsPage?.data ?? [];
  const { filterProps, visibleEvents, visiblePlaces, showAllEvents } =
    useMapContentFilters(places, upcomingEvents);

  const mappedEvents = upcomingEvents.filter(hasCoordinates);
  const hasOnlyDistantEvents =
    geoState === "success" &&
    userPosition !== null &&
    mappedEvents.length > 0 &&
    mappedEvents.every(
      (event) =>
        haversineDistance(userPosition[0], userPosition[1], event.lat, event.lng) >
        NEARBY_EVENTS_RADIUS_KM,
    );
  const isGuideVisible =
    isMapGuideOpen && geoState !== "idle" && geoState !== "loading";

  // Callbacks estáveis: o MapView os usa em handlers de eventos do Leaflet.
  const clearSelection = useCallback(() => setSelectedPlace(null), []);

  const handleLocationPick = useCallback((lat: number, lng: number) => {
    setPendingCoords([lat, lng]);
    setIsPickingLocation(false);
    setIsAddPlaceOpen(true);
  }, []);

  const startPicking = () => {
    setSelectedPlace(null);
    setIsMapGuideOpen(false);
    setPendingCoords(null);
    setIsPickingLocation(true);
  };

  const cancelPicking = () => {
    setIsPickingLocation(false);
    setPendingCoords(null);
  };

  const closeAddPlace = () => {
    setIsAddPlaceOpen(false);
    setPendingCoords(null);
  };

  const showDistantEvents = () => {
    showAllEvents();
    setFocusEventsRequest((current) => current + 1);
    setIsDistantNoticeDismissed(true);
  };

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-green-100",
        isExpanded
          ? "h-full"
          : "mx-auto my-3 h-[calc(100%-1.5rem)] max-w-[calc(100%-2rem)] rounded-[2rem] border border-green-200 shadow-[0_16px_38px_rgba(27,78,48,0.18)] sm:my-5 sm:h-[min(680px,calc(100%-2.5rem))] md:max-w-[calc(100%-3rem)]",
      )}
    >
      <MapExpandToggle isExpanded={isExpanded} onToggle={onToggleExpanded} />
      <MapView
        places={visiblePlaces}
        events={visibleEvents}
        selectedPlaceId={selectedPlace?.id ?? null}
        onPlaceSelect={setSelectedPlace}
        onMapClick={clearSelection}
        userPosition={userPosition}
        geoState={geoState}
        pickMode={isPickingLocation}
        pendingCoords={pendingCoords}
        onLocationPick={handleLocationPick}
        focusEventsRequest={focusEventsRequest}
      />
      <LocationPrompt
        state={geoState}
        onAllow={geolocation.request}
        onSkip={geolocation.skip}
      />
      <MapFilters {...filterProps} />
      {isGuideVisible && (
        <MapGuideCard
          onAddPlace={startPicking}
          onViewEvents={onViewEvents}
          onClose={() => setIsMapGuideOpen(false)}
        />
      )}
      {hasOnlyDistantEvents && !isDistantNoticeDismissed && (
        <DistantEventsNotice
          count={mappedEvents.length}
          onShow={showDistantEvents}
        />
      )}
      <AddToMapFab
        isVisible={!isPickingLocation && !isMapGuideOpen}
        onClick={() => setIsMapGuideOpen(true)}
      />
      <PickLocationBanner
        isVisible={isPickingLocation}
        onCancel={cancelPicking}
      />

      <PlaceDetailPanel
        place={selectedPlace}
        onClose={clearSelection}
        onReport={() => setIsReportModalOpen(true)}
        userPosition={userPosition}
      />
      {selectedPlace && (
        <ReportModal
          isOpen={isReportModalOpen}
          placeId={selectedPlace.id}
          placeName={selectedPlace.name}
          userPosition={userPosition}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
      <AddPlaceModal
        isOpen={isAddPlaceOpen}
        coords={pendingCoords}
        onCoordsChange={setPendingCoords}
        onClose={closeAddPlace}
      />
    </div>
  );
}
