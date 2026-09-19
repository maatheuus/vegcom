"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useUrlParams } from "../../hooks/useUrlParams";
import type { Tab } from "../../types";
import { DirectoryLayout } from "../DirectoryLayout/DirectoryLayout";
import { EventsList } from "../EventsList/EventsList";
import { MapTab } from "./MapTab";

export function DirectoryPage() {
  const { searchParams, setParams } = useUrlParams();
  const [activeTab, setActiveTab] = useState<Tab>(
    searchParams.get("tab") === "map" ? "map" : "events",
  );
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isEventModalRequested, setIsEventModalRequested] = useState(false);
  // Fica aqui para a localização sobreviver à troca de abas.
  const geolocation = useGeolocation();
  const isMapView = activeTab === "map";

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setParams({ tab: tab === "map" ? "map" : null });
  };

  const handleViewEvents = () => {
    handleTabChange("events");
    setIsEventModalRequested(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <DirectoryLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMapView={isMapView && isMapExpanded}
      >
        {isMapView ? (
          <MapTab
            geolocation={geolocation}
            isExpanded={isMapExpanded}
            onToggleExpanded={() => setIsMapExpanded((current) => !current)}
            onViewEvents={handleViewEvents}
          />
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
