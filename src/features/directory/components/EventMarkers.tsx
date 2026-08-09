"use client";

import { CalendarPlus, MapPin, Share2 } from "lucide-react";
import { Marker, Popup } from "react-leaflet";
import { addToCalendar, shareEvent } from "../hooks/eventActions";
import type { DirectoryEvent } from "../types";
import { createEventMarkerIcon } from "./markerIcons";

interface EventMarkersProps {
  events: DirectoryEvent[];
}

export function EventMarkers({ events }: EventMarkersProps) {
  return (
    <>
      {events.map((event) => {
        if (event.lat === undefined || event.lng === undefined) return null;

        return (
          <Marker
            key={`event-${event.id}`}
            position={[event.lat, event.lng]}
            icon={createEventMarkerIcon()}
          >
            <Popup className="event-popup" minWidth={260} maxWidth={320}>
              <div className="min-w-0 p-1 text-green-500">
                <p className="text-xs font-bold tracking-wide text-green-200 uppercase">
                  {new Date(event.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3 className="font-maitree text-black-100 mt-1 line-clamp-2 text-base font-bold break-words">
                  {event.title}
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-green-500">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" />
                  <span>{event.location}</span>
                </p>
                {event.description && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed break-words text-green-500">
                    {event.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2 border-t border-green-100 pt-3">
                  <button
                    type="button"
                    onClick={() => addToCalendar(event)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-500 transition hover:border-green-500 hover:bg-green-200 hover:text-white"
                  >
                    <CalendarPlus className="size-3.5" />
                    Na agenda
                  </button>
                  <button
                    type="button"
                    onClick={() => shareEvent(event)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-500 transition hover:border-green-500 hover:bg-green-200 hover:text-white"
                  >
                    <Share2 className="size-3.5" />
                    Compartilhar
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
