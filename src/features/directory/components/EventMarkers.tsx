"use client";

import { CalendarPlus, MapPin, Share2 } from "lucide-react";
import { Marker, Popup } from "react-leaflet";
import { addToGoogleCalendar, shareEvent } from "../hooks/eventActions";
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
            <Popup className="event-popup" minWidth={280} maxWidth={400}>
              <div className="min-w-0 text-green-500">
                <p className="text-xs font-bold tracking-wide text-green-200 uppercase">
                  {new Date(event.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3 className="font-maitree text-black-100 mt-2 line-clamp-2 text-xl leading-tight font-bold break-words">
                  {event.title}
                </h3>
                <p className="mt-2.5 flex items-start gap-2 text-sm leading-snug font-medium text-green-500">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span className="line-clamp-2">{event.location}</span>
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-green-100 pt-3">
                  <button
                    type="button"
                    onClick={() => addToGoogleCalendar(event)}
                    className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-green-100 px-2.5 py-2 text-xs font-bold whitespace-nowrap text-green-500 transition hover:bg-green-200 hover:text-white focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:outline-none"
                  >
                    <CalendarPlus className="size-3.5" />
                    Google Agenda
                  </button>
                  <button
                    type="button"
                    onClick={() => shareEvent(event)}
                    className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-green-100 px-2.5 py-2 text-xs font-bold whitespace-nowrap text-green-500 transition hover:bg-green-200 hover:text-white focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:outline-none"
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
