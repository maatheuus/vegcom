"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { useEffect, useState } from "react";
import { usePaginatedEvents } from "../../hooks/usePaginatedEvents";
import { useUrlParams } from "../../hooks/useUrlParams";
import type { DirectoryEvent } from "../../types";
import { AddEventModal } from "../AddEventModal/AddEventModal";
import { DeleteEventDialog } from "./DeleteEventDialog";
import { EventDetailsDialog } from "./EventDetailsDialog";
import { EventSection } from "./EventSection";
import { EventsEmptyState, EventsLoading } from "./EventsEmptyState";
import { EventsFilters } from "./EventsFilters";
import { EventsHero } from "./EventsHero";
import {
  ALL_CITIES,
  ALL_MONTHS,
  getCityOptions,
  matchesEventFilters,
} from "./eventFilters";

interface EventsListProps {
  openAddModal?: boolean;
  onAddModalRequestHandled?: () => void;
}

export function EventsList({
  openAddModal = false,
  onAddModalRequestHandled,
}: EventsListProps) {
  const { searchParams, setParams } = useUrlParams();
  const upcoming = usePaginatedEvents("upcoming", "up");
  const past = usePaginatedEvents("past", "past");
  const { data: user } = useGetUser();
  const [month, setMonth] = useState(searchParams.get("month") ?? ALL_MONTHS);
  const [city, setCity] = useState(searchParams.get("city") ?? ALL_CITIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DirectoryEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<DirectoryEvent | null>(
    null,
  );
  const [viewingEvent, setViewingEvent] = useState<DirectoryEvent | null>(null);

  useEffect(() => {
    if (!openAddModal) return;
    setIsAddModalOpen(true);
    onAddModalRequestHandled?.();
  }, [onAddModalRequestHandled, openAddModal]);

  const cityOptions = getCityOptions([...upcoming.events, ...past.events]);
  // O filtro roda no cliente, apenas sobre a página já carregada.
  const isVisible = (event: DirectoryEvent) =>
    matchesEventFilters(event, month, city);
  const isPending = (event: DirectoryEvent) => event.status === "pending";
  // A API só devolve eventos pendentes para quem os criou.
  const pendingEvents = [...upcoming.events, ...past.events].filter(
    (event) => isPending(event) && isVisible(event),
  );
  const upcomingEvents = upcoming.events.filter(
    (event) => !isPending(event) && isVisible(event),
  );
  const pastEvents = past.events.filter(
    (event) => !isPending(event) && isVisible(event),
  );
  const hasEvents =
    pendingEvents.length > 0 ||
    upcomingEvents.length > 0 ||
    pastEvents.length > 0;

  const changeFilter = (
    urlKey: "month" | "city",
    value: string,
    allValue: string,
  ) => {
    upcoming.resetPage();
    past.resetPage();
    setParams({
      [urlKey]: value === allValue ? null : value,
      up: null,
      past: null,
    });
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    changeFilter("month", value, ALL_MONTHS);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    changeFilter("city", value, ALL_CITIES);
  };

  const openAddEvent = () => setIsAddModalOpen(true);

  const sectionProps = {
    currentUserId: user?.id,
    onEdit: setEditingEvent,
    onDelete: setEventToDelete,
    onOpen: setViewingEvent,
  };

  return (
    <div className="hidden-scrollbar h-full overflow-y-auto bg-green-50 px-4 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <EventsHero onAdd={openAddEvent} />
        <EventsFilters
          month={month}
          city={city}
          cityOptions={cityOptions}
          onMonthChange={handleMonthChange}
          onCityChange={handleCityChange}
        />

        {upcoming.isLoading || past.isLoading ? (
          <EventsLoading />
        ) : !hasEvents ? (
          <EventsEmptyState onAdd={openAddEvent} />
        ) : (
          <div className="mt-8 space-y-9">
            <EventSection
              {...sectionProps}
              title="Aguardando aprovação"
              paginationLabel="Paginação dos eventos aguardando aprovação"
              events={pendingEvents}
              total={pendingEvents.length}
              page={1}
              totalPages={1}
              onPageChange={() => {}}
              isRefreshing={upcoming.isFetching || past.isFetching}
            />
            <EventSection
              {...sectionProps}
              title="Para colocar na agenda"
              paginationLabel="Paginação dos próximos eventos"
              events={upcomingEvents}
              total={upcoming.total - upcoming.events.filter(isPending).length}
              page={upcoming.page}
              totalPages={upcoming.totalPages}
              onPageChange={upcoming.setPage}
              isRefreshing={upcoming.isFetching}
            />
            <EventSection
              {...sectionProps}
              title="O que já aconteceu"
              paginationLabel="Paginação dos eventos passados"
              events={pastEvents}
              total={past.total - past.events.filter(isPending).length}
              page={past.page}
              totalPages={past.totalPages}
              onPageChange={past.setPage}
              isRefreshing={past.isFetching}
              past
            />
          </div>
        )}
      </div>
      <AddEventModal
        isOpen={isAddModalOpen || Boolean(editingEvent)}
        event={editingEvent}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingEvent(null);
        }}
      />
      <EventDetailsDialog
        event={viewingEvent}
        onClose={() => setViewingEvent(null)}
      />
      <DeleteEventDialog
        event={eventToDelete}
        onClose={() => setEventToDelete(null)}
      />
    </div>
  );
}
