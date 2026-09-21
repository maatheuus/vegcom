"use client";

import { toast } from "@/shared/hooks/use-toast";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import { useEvents, usePlaces } from "../../api/queries/getDirectoryApiClient";
import { checkLocationInBrazil } from "../../hooks/geocode";
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
  const [reportingPlace, setReportingPlace] = useState<Place | null>(null);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [isCheckingPickedLocation, setIsCheckingPickedLocation] =
    useState(false);
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(
    null,
  );
  const locationCheckRequestId = useRef(0);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isRepositioning, setIsRepositioning] = useState(false);
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
    useMapContentFilters(
      places,
      upcomingEvents,
      userPosition,
      geolocation.request,
    );

  // Sem nada no mapa (carregando ou vazio) os filtros não têm o que filtrar.
  const hasMapContent = places.length > 0 || upcomingEvents.length > 0;

  const mappedEvents = upcomingEvents.filter(hasCoordinates);
  const hasOnlyDistantEvents =
    geoState === "success" &&
    userPosition !== null &&
    mappedEvents.length > 0 &&
    mappedEvents.every(
      (event) =>
        haversineDistance(
          userPosition[0],
          userPosition[1],
          event.lat,
          event.lng,
        ) > NEARBY_EVENTS_RADIUS_KM,
    );
  const isGuideVisible =
    isMapGuideOpen && geoState !== "idle" && geoState !== "loading";

  // Callbacks estáveis: o MapView os usa em handlers de eventos do Leaflet.
  const clearSelection = useCallback(() => setSelectedPlace(null), []);

  const handleLocationPick = useCallback(async (lat: number, lng: number) => {
    const requestId = ++locationCheckRequestId.current;
    setIsCheckingPickedLocation(true);

    const locationCheck = await checkLocationInBrazil(lat, lng);
    if (locationCheckRequestId.current !== requestId) return;

    setIsCheckingPickedLocation(false);

    if (locationCheck !== "inside") {
      toast({
        variant: "destructive",
        title:
          locationCheck === "outside"
            ? "Escolha uma posição no Brasil"
            : "Não foi possível confirmar a localização",
        description:
          locationCheck === "outside"
            ? "Por enquanto, locais e eventos só podem ser adicionados no Brasil."
            : "Tente selecionar outra posição em instantes.",
      });
      return;
    }

    setPendingCoords([lat, lng]);
    setIsPickingLocation(false);
    setIsRepositioning(false);
    setIsAddPlaceOpen(true);
  }, []);

  const startPicking = () => {
    locationCheckRequestId.current += 1;
    setSelectedPlace(null);
    setIsMapGuideOpen(false);
    setPendingCoords(null);
    setIsCheckingPickedLocation(false);
    setIsRepositioning(false);
    setIsPickingLocation(true);
  };

  // Volta ao mapa mantendo o que já foi preenchido no formulário.
  const startRepositioning = () => {
    locationCheckRequestId.current += 1;
    setIsCheckingPickedLocation(false);
    setIsAddPlaceOpen(false);
    setIsRepositioning(true);
    setIsPickingLocation(true);
  };

  const cancelPicking = () => {
    locationCheckRequestId.current += 1;
    setIsPickingLocation(false);
    setIsCheckingPickedLocation(false);

    if (isRepositioning) {
      setIsRepositioning(false);
      setIsAddPlaceOpen(true);
      return;
    }

    setPendingCoords(null);
  };

  const closeAddPlace = () => {
    setIsAddPlaceOpen(false);
    setIsRepositioning(false);
    setPendingCoords(null);
  };

  const showDistantEvents = () => {
    showAllEvents();
    setFocusEventsRequest((current) => current + 1);
    setIsDistantNoticeDismissed(true);
  };

  const openReport = () => {
    if (!selectedPlace) return;

    setReportingPlace(selectedPlace);
    setSelectedPlace(null);
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
      {hasMapContent && <MapFilters {...filterProps} />}
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
        isChecking={isCheckingPickedLocation}
        isRepositioning={isRepositioning}
        onCancel={cancelPicking}
      />

      <PlaceDetailPanel
        place={selectedPlace}
        onClose={clearSelection}
        onReport={openReport}
        userPosition={userPosition}
      />
      {reportingPlace && (
        <ReportModal
          isOpen
          placeId={reportingPlace.id}
          placeName={reportingPlace.name}
          userPosition={userPosition}
          onClose={() => setReportingPlace(null)}
        />
      )}
      <AddPlaceModal
        isOpen={isAddPlaceOpen}
        coords={pendingCoords}
        onCoordsChange={setPendingCoords}
        onReposition={startRepositioning}
        onClose={closeAddPlace}
      />
    </div>
  );
}
