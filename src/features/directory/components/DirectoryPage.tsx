"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeft, MapPinPlus, Maximize2, Minimize2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { usePlaceFilters } from "../hooks/usePlaceFilters";
import type { Place } from "../types";
import { AddPlaceModal } from "./AddPlaceModal";
import { DirectoryLayout, type Tab } from "./DirectoryLayout";
import { EventsList } from "./EventsList";
import { FilterBar } from "./FilterBar";
import { MapView } from "./MapView";
import { PlaceDetailPanel } from "./PlaceDetailPanel";
import { ReportModal } from "./ReportModal";

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
  const { activeFilters, toggleFilter, filteredPlaces, counts } =
    usePlaceFilters();
  const { position: userPosition, state: geoState } = useGeolocation();

  const handlePlaceSelect = useCallback((place: Place) => {
    setSelectedPlace(place);
    setIsPanelOpen(true);
  }, []);

  const handleMapClick = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  const handleOpenReport = useCallback(() => {
    setIsReportModalOpen(true);
  }, []);

  const handleCloseReport = useCallback(() => {
    setIsReportModalOpen(false);
  }, []);

  const handleStartPicking = useCallback(() => {
    setIsPanelOpen(false);
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
            className={[
              "relative overflow-hidden bg-green-100",
              isMapExpanded
                ? "h-full w-full"
                : "mx-3 my-3 h-[calc(100%-1.5rem)] rounded-[2rem] border border-green-200 shadow-[0_16px_38px_rgba(27,78,48,0.18)] sm:mx-auto sm:my-5 sm:h-[min(680px,calc(100%-2.5rem))] sm:max-w-7xl",
            ].join(" ")}
          >
            <Link
              href="/"
              className={[
                "absolute top-4 left-4 z-[1001] hidden items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.14)] transition-all duration-200 sm:inline-flex",
                "hover:text-black-100 hover:bg-green-100",
                "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
              ].join(" ")}
              aria-label="Voltar para o início"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Voltar
            </Link>
            <button
              type="button"
              onClick={() => setIsMapExpanded((current) => !current)}
              className="absolute right-4 top-4 z-[1001] flex size-11 items-center justify-center rounded-full border border-green-200 bg-white text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.14)] transition hover:bg-green-100"
              aria-label={isMapExpanded ? "Reduzir mapa" : "Expandir mapa"}
              title={isMapExpanded ? "Reduzir mapa" : "Expandir mapa"}
            >
              {isMapExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </button>
            <MapView
              places={filteredPlaces}
              selectedPlaceId={selectedPlace?.id ?? null}
              onPlaceSelect={handlePlaceSelect}
              onMapClick={handleMapClick}
              userPosition={userPosition}
              geoState={geoState}
              pickMode={isPickingLocation}
              pendingCoords={pendingCoords}
              onLocationPick={handleLocationPick}
            />
            <FilterBar
              activeFilters={activeFilters}
              counts={counts}
              onToggle={toggleFilter}
            />

            {/* FAB — adicionar local */}
            <AnimatePresence>
              {!isPickingLocation && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  transition={{ type: "spring", damping: 22, stiffness: 320 }}
                  type="button"
                  onClick={handleStartPicking}
                  className={[
                    "absolute bottom-20 left-4 z-[1001] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold sm:bottom-6",
                    "bg-green-500 text-white shadow-[0_10px_24px_rgba(27,78,48,0.28)] transition-colors duration-200",
                    "active:bg-black-100 hover:bg-green-200",
                    "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
                  ].join(" ")}
                  aria-label="Adicionar local no mapa"
                >
                  <MapPinPlus className="h-5 w-5" aria-hidden />
                  <span className="hidden sm:inline">Adicionar local</span>
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
              onClose={handleCloseAddPlace}
            />
          </div>
        ) : (
          <EventsList />
        )}
      </DirectoryLayout>
    </MotionConfig>
  );
}
