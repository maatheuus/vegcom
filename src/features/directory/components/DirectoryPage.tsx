"use client";

import clsx from "clsx";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeft, Maximize2, Minimize2, Plus, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useEvents, usePlaces } from "../api/queries/getDirectoryApiClient";
import { useGeolocation } from "../hooks/useGeolocation";
import type { Place, PlaceCategory } from "../types";
import { AddPlaceModal } from "./AddPlaceModal";
import { DirectoryLayout, type Tab } from "./DirectoryLayout";
import { EventsList } from "./EventsList";
import { LocationPrompt } from "./LocationPrompt";
import { MapFilters, type MapContentFilter } from "./MapFilters";
import { MapGuideCard } from "./MapGuideCard";
import { MapView } from "./MapView";
import { PlaceDetailPanel } from "./PlaceDetailPanel";
import { ReportModal } from "./ReportModal";

const NEARBY_EVENTS_RADIUS_METERS = 50_000;

function distanceInMeters(
  [firstLat, firstLng]: [number, number],
  [secondLat, secondLng]: [number, number],
) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latitudeDistance = toRadians(secondLat - firstLat);
  const longitudeDistance = toRadians(secondLng - firstLng);
  const a =
    Math.sin(latitudeDistance / 2) ** 2 +
    Math.cos(toRadians(firstLat)) *
      Math.cos(toRadians(secondLat)) *
      Math.sin(longitudeDistance / 2) ** 2;

  return 6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function DirectoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(
    null,
  );
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isEventModalRequested, setIsEventModalRequested] = useState(false);
  const [isMapGuideOpen, setIsMapGuideOpen] = useState(false);
  const [mapContentFilter, setMapContentFilter] =
    useState<MapContentFilter>("all");
  const [eventMonth, setEventMonth] = useState("all");
  const [placeCategory, setPlaceCategory] = useState<PlaceCategory | "all">(
    "all",
  );
  const { data: places = [] } = usePlaces();
  const { data: upcomingEventsPage } = useEvents(
    { page: 1, limit: 50, period: "upcoming" },
    { enabled: activeTab === "map" },
  );
  const {
    position: userPosition,
    state: geoState,
    request: requestLocation,
    skip: skipLocation,
  } = useGeolocation();
  const upcomingEvents = upcomingEventsPage?.data ?? [];
  const eventMonths = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    });

    return [...new Set(upcomingEvents.map((event) => event.date.slice(0, 7)))]
      .sort()
      .map((value) => ({
        value,
        label: formatter.format(new Date(`${value}-02T12:00:00`)),
      }));
  }, [upcomingEvents]);
  const placeCategories = useMemo(
    () => [...new Set(places.map((place) => place.category))],
    [places],
  );
  const visibleEvents = useMemo(
    () =>
      mapContentFilter === "places"
        ? []
        : upcomingEvents.filter(
            (event) =>
              eventMonth === "all" || event.date.startsWith(eventMonth),
          ),
    [eventMonth, mapContentFilter, upcomingEvents],
  );
  const visiblePlaces = useMemo(
    () =>
      mapContentFilter === "events"
        ? []
        : places.filter(
            (place) =>
              placeCategory === "all" || place.category === placeCategory,
          ),
    [mapContentFilter, placeCategory, places],
  );
  const mappedEvents = useMemo(
    () =>
      upcomingEvents.filter(
        (event) => event.lat !== undefined && event.lng !== undefined,
      ),
    [upcomingEvents],
  );
  const nearbyEventsCount = useMemo(() => {
    if (!userPosition) return null;

    return mappedEvents.filter(
      (event) =>
        distanceInMeters(userPosition, [event.lat!, event.lng!]) <=
        NEARBY_EVENTS_RADIUS_METERS,
    ).length;
  }, [mappedEvents, userPosition]);
  const hasOnlyDistantEvents =
    geoState === "success" &&
    mappedEvents.length > 0 &&
    nearbyEventsCount === 0;

  const handlePlaceSelect = useCallback((place: Place) => {
    setSelectedPlace(place);
    setIsPanelOpen(true);
  }, []);

  const handleMapClick = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedPlace(null);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedPlace(null);
  }, []);

  const handleOpenReport = useCallback(() => {
    setIsReportModalOpen(true);
  }, []);

  const handleCloseReport = useCallback(() => {
    setIsReportModalOpen(false);
  }, []);

  const handleStartPicking = useCallback(() => {
    setIsPanelOpen(false);
    setIsMapGuideOpen(false);
    setPendingCoords(null);
    setIsPickingLocation(true);
  }, []);

  const handleCancelPicking = useCallback(() => {
    setIsPickingLocation(false);
    setPendingCoords(null);
  }, []);

  const handleLocationPick = useCallback((lat: number, lng: number) => {
    setPendingCoords([lat, lng]);
    setIsPickingLocation(false);
    setIsAddPlaceOpen(true);
  }, []);

  const handleCloseAddPlace = useCallback(() => {
    setIsAddPlaceOpen(false);
    setPendingCoords(null);
  }, []);

  const handleMapContentChange = useCallback((content: MapContentFilter) => {
    setMapContentFilter(content);
    if (content !== "events") setEventMonth("all");
    if (content !== "places") setPlaceCategory("all");
  }, []);

  const handleViewEvents = useCallback(() => {
    setIsMapGuideOpen(false);
    setActiveTab("events");
    setIsEventModalRequested(true);
  }, []);

  const isMapView = activeTab === "map";

  return (
    <MotionConfig reducedMotion="user">
      <DirectoryLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMapView={isMapView && isMapExpanded}
      >
        {isMapView ? (
          <div
            className={clsx(
              "relative w-full overflow-hidden bg-green-100",
              isMapExpanded
                ? "h-full"
                : "mx-auto my-3 h-[calc(100%-1.5rem)] max-w-[calc(100%-2rem)] rounded-[2rem] border border-green-200 shadow-[0_16px_38px_rgba(27,78,48,0.18)] sm:my-5 sm:h-[min(680px,calc(100%-2.5rem))] md:max-w-[calc(100%-3rem)]",
            )}
          >
            {isMapExpanded && (
              <Link
                href="/"
                className={clsx(
                  "absolute top-4 left-4 z-[1001] hidden items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.14)] transition-all duration-200 sm:inline-flex",
                  "hover:text-black-100 hover:bg-green-100",
                  "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
                )}
                aria-label="Voltar para o início"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Voltar
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMapExpanded((current) => !current)}
              className="absolute bottom-4 left-4 z-[1002] flex items-center justify-center rounded-full border border-green-200 bg-white p-3 text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.14)] transition hover:bg-green-100 sm:top-4 sm:right-4 sm:bottom-auto sm:left-auto"
              aria-label={isMapExpanded ? "Reduzir mapa" : "Expandir mapa"}
              title={isMapExpanded ? "Reduzir mapa" : "Expandir mapa"}
            >
              {isMapExpanded ? (
                <Minimize2 className="size-4" />
              ) : (
                <Maximize2 className="size-4" />
              )}
            </button>
            <MapView
              places={visiblePlaces}
              events={visibleEvents}
              selectedPlaceId={selectedPlace?.id ?? null}
              onPlaceSelect={handlePlaceSelect}
              onMapClick={handleMapClick}
              userPosition={userPosition}
              geoState={geoState}
              pickMode={isPickingLocation}
              pendingCoords={pendingCoords}
              onLocationPick={handleLocationPick}
            />
            <LocationPrompt
              state={geoState}
              onAllow={requestLocation}
              onSkip={skipLocation}
            />
            <MapFilters
              content={mapContentFilter}
              onContentChange={handleMapContentChange}
              eventCount={upcomingEvents.length}
              placeCount={places.length}
              months={eventMonths}
              selectedMonth={eventMonth}
              onMonthChange={setEventMonth}
              categories={placeCategories}
              selectedCategory={placeCategory}
              onCategoryChange={setPlaceCategory}
            />
            {isMapGuideOpen &&
              geoState !== "idle" &&
              geoState !== "loading" && (
                <MapGuideCard
                  onAddPlace={handleStartPicking}
                  onViewEvents={handleViewEvents}
                  onClose={() => setIsMapGuideOpen(false)}
                />
              )}
            {hasOnlyDistantEvents && (
              <div className="pointer-events-none absolute right-20 bottom-4 left-20 z-[1001] sm:right-12 sm:bottom-6 sm:left-auto sm:w-auto sm:max-w-xs">
                <div className="pointer-events-auto rounded-2xl border border-green-200 bg-white px-3 py-2.5 text-sm shadow-[0_10px_24px_rgba(27,78,48,0.16)] sm:px-4 sm:py-3">
                  <p className="font-semibold text-green-500 sm:hidden">
                    {mappedEvents.length} evento
                    {mappedEvents.length > 1 ? "s" : ""} mais distantes.
                  </p>
                  <p className="hidden font-semibold text-green-500 sm:block">
                    Há {mappedEvents.length} evento
                    {mappedEvents.length > 1 ? "s" : ""} em outras regiões.
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-green-200 sm:hidden">
                    Afaste o zoom para vê-los.
                  </p>
                  <p className="mt-1 hidden text-xs leading-relaxed text-green-200 sm:block">
                    Afaste o zoom para encontrá-los no mapa.
                  </p>
                </div>
              </div>
            )}

            {/* FAB — abrir opções de adição */}
            <AnimatePresence>
              {!isPickingLocation && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  transition={{ type: "spring", damping: 22, stiffness: 320 }}
                  type="button"
                  onClick={() => setIsMapGuideOpen(true)}
                  className={clsx(
                    "absolute bottom-18 left-4 z-[1001] inline-flex items-center gap-2 rounded-full p-3 text-sm font-semibold sm:right-auto sm:bottom-6",
                    "bg-green-500 text-white shadow-[0_10px_24px_rgba(27,78,48,0.28)] transition-colors duration-200",
                    "active:bg-black-100 hover:bg-green-200",
                    "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
                  )}
                  aria-label="Adicionar ao mapa"
                >
                  <Plus className="h-5 w-5" aria-hidden />
                  <span className="hidden sm:inline">Adicionar</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Banner — modo escolha de posição */}
            <AnimatePresence>
              {isPickingLocation && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  className="pointer-events-none absolute inset-x-0 top-28 z-[1002] flex justify-center px-4 sm:top-20"
                >
                  <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(27,78,48,0.16)]">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                    <p className="font-maitree text-sm font-medium text-green-500">
                      Toque no mapa para escolher a posição do local
                    </p>
                    <button
                      type="button"
                      onClick={handleCancelPicking}
                      className="rounded-full p-1 text-green-200 transition-colors hover:bg-green-100 hover:text-green-500 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:outline-none"
                      aria-label="Cancelar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <PlaceDetailPanel
              place={selectedPlace}
              isOpen={isPanelOpen}
              onClose={handleClosePanel}
              onReport={handleOpenReport}
              userPosition={userPosition}
            />
            {selectedPlace && (
              <ReportModal
                isOpen={isReportModalOpen}
                placeId={selectedPlace.id}
                placeName={selectedPlace.name}
                onClose={handleCloseReport}
              />
            )}
            <AddPlaceModal
              isOpen={isAddPlaceOpen}
              coords={pendingCoords}
              onCoordsChange={setPendingCoords}
              onClose={handleCloseAddPlace}
            />
          </div>
        ) : (
          <EventsList
            openAddModal={isEventModalRequested}
            onAddModalRequestHandled={() => setIsEventModalRequested(false)}
          />
        )}
      </DirectoryLayout>
    </MotionConfig>
  );
}
