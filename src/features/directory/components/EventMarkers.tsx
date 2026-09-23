"use client";

import { CalendarPlus, MapPin, Share2 } from "lucide-react";
import { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import { addToCalendar, shareEvent } from "../hooks/eventActions";
import type { DirectoryEvent } from "../types";
import { EventOwnerNotice } from "./EventOwnerNotice";
import { createEventMarkerIcon } from "./markerIcons";

interface EventMarkersProps {
  events: DirectoryEvent[];
}

function EventMarkersComponent({ events }: EventMarkersProps) {
  return (
    <>
      {events.map((event) => {
        if (event.lat === undefined || event.lng === undefined) return null;

        const isDraft =
          event.status === "pending" || event.status === "rejected";

        return (
          <Marker
            key={`event-${event.id}`}
            position={[event.lat, event.lng]}
            icon={createEventMarkerIcon(event.status)}
          >
            <Popup
              className="event-popup"
              minWidth={280}
              maxWidth={400}
              closeOnClick={isDraft ? false : undefined}
            >
              <div className="min-w-0 text-green-500">
                <p className="text-xs font-bold tracking-wide text-green-200 uppercase">
                  {event.monthly
                    ? `Todo dia ${new Date(event.date).getDate()} de cada mês`
                    : new Date(event.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                </p>
                <h3 className="font-maitree text-black-100 mt-2 line-clamp-2 text-xl leading-tight font-bold break-words">
                  {event.title}
                </h3>
                <p className="mt-2! mb-0! flex items-start gap-2 text-sm leading-snug font-medium text-green-500">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span className="line-clamp-2">{event.location}</span>
                </p>
                <div className="mt-4 border-t border-green-100 pt-3">
                  {isDraft ? (
                    <EventOwnerNotice event={event} />
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToCalendar(event)}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-green-500 px-3.5 text-sm font-semibold whitespace-nowrap text-white transition-[background-color,scale] duration-150 hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.96]"
                      >
                        <CalendarPlus className="size-4 shrink-0" />
                        Adicionar na agenda
                      </button>
                      <button
                        type="button"
                        onClick={() => shareEvent(event)}
                        aria-label="Compartilhar evento"
                        title="Compartilhar evento"
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-green-200 bg-white text-green-500 transition-[background-color,border-color,scale] duration-150 hover:border-green-500 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.94]"
                      >
                        <Share2 className="size-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export const EventMarkers = memo(EventMarkersComponent);
