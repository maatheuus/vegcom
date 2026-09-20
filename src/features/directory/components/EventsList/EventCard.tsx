import clsx from "clsx";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  ExternalLink,
  MapPin,
  Navigation,
  Share2,
} from "lucide-react";
import { addToCalendar, shareEvent } from "../../hooks/eventActions";
import type { DirectoryEvent } from "../../types";
import { getGoogleMapsDirectionsUrl } from "../../utils/googleMaps";
import { ActionButton, actionButtonClassName } from "./ActionButton";
import { EventOwnerMenu } from "./EventOwnerMenu";

const SHORT_MONTH = new Intl.DateTimeFormat("pt-BR", { month: "short" });

interface EventCardProps {
  event: DirectoryEvent;
  index: number;
  past: boolean;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function EventCard({
  event,
  index,
  past,
  isOwner,
  onEdit,
  onDelete,
}: EventCardProps) {
  const date = new Date(event.date);
  const directionsUrl = getGoogleMapsDirectionsUrl({
    lat: event.lat,
    lng: event.lng,
    fallbackDestination: event.location,
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group relative grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 rounded-[1.5rem] border border-green-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-[0_12px_25px_rgba(27,78,48,0.12)] sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-4"
    >
      <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-green-100 text-green-500 sm:size-16">
        <strong className="font-lora text-2xl leading-none">
          {date.getDate()}
        </strong>
        <span className="mt-1 text-[10px] font-bold tracking-wider uppercase">
          {SHORT_MONTH.format(date).replace(".", "")}
        </span>
        <span className="text-[9px] leading-none font-semibold text-green-200">
          {date.getFullYear()}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className={clsx(
            "font-maitree text-black-100 line-clamp-2 text-base font-bold break-words",
            isOwner && "pr-8",
          )}
        >
          {event.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-green-200">
          <MapPin className="size-3.5 shrink-0" />
          {event.location}
        </p>
        <p
          className={clsx(
            "mt-3 line-clamp-2 text-sm leading-relaxed break-words",
            event.description ? "text-green-500" : "text-green-200 italic",
          )}
        >
          {event.description || "Nenhuma descrição compartilhada."}
        </p>
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black-100 mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-500 underline decoration-green-200 underline-offset-4"
          >
            <ExternalLink className="size-3" />
            Saiba mais
          </a>
        )}
      </div>
      {isOwner && !past && (
        <EventOwnerMenu onEdit={onEdit} onDelete={onDelete} />
      )}
      {!past && (
        <div className="col-span-2 mt-4 grid grid-cols-2 gap-2 border-t border-green-100 pt-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(actionButtonClassName, "w-full")}
          >
            <Navigation className="size-3.5" />
            Como chegar
          </a>
          <ActionButton
            onClick={() => addToCalendar(event)}
            className="w-full text-nowrap"
            icon={<CalendarPlus className="size-3.5" />}
          >
            Adicionar na agenda
          </ActionButton>
          <ActionButton
            onClick={() => shareEvent(event)}
            className="col-span-full w-full sm:col-span-1 md:col-span-full lg:col-span-1"
            icon={<Share2 className="size-3.5" />}
          >
            Compartilhar
          </ActionButton>
        </div>
      )}
    </motion.article>
  );
}
