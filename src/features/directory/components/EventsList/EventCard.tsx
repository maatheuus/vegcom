import clsx from "clsx";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  ExternalLink,
  MapPin,
  Navigation,
  Repeat2,
  Share2,
} from "lucide-react";
import { addToCalendar, shareEvent } from "../../hooks/eventActions";
import type { DirectoryEvent } from "../../types";
import { getGoogleMapsDirectionsUrl } from "../../utils/googleMaps";
import { formatDeletionNotice } from "../../utils/rejection";
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
  onOpen: () => void;
}

export function EventCard({
  event,
  index,
  past,
  isOwner,
  onEdit,
  onDelete,
  onOpen,
}: EventCardProps) {
  const date = new Date(event.date);
  // A API só devolve eventos pendentes/recusados para quem os criou.
  const isPending = event.status === "pending";
  const isRejected = event.status === "rejected";
  const hasOccurred = date < new Date();
  const canManage =
    isOwner && (isRejected || (!past && (!event.monthly || !hasOccurred)));
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
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, button, [role='menuitem']")) return;
        onOpen();
      }}
      className={clsx(
        "group relative grid min-w-0 cursor-pointer grid-cols-[3.5rem_minmax(0,1fr)] grid-rows-[1fr_auto] gap-x-3 rounded-[1.5rem] border p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(27,78,48,0.12)] sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-4",
        isPending
          ? "border-amber-200 bg-amber-50 hover:border-amber-300"
          : "border-green-100 bg-white hover:border-green-200",
      )}
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
            "font-maitree text-black-100 text-base font-bold",
            canManage && "pr-8",
          )}
        >
          <button
            type="button"
            onClick={onOpen}
            className="line-clamp-2 text-left break-words focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:outline-none"
          >
            {event.title}
          </button>
        </h3>
        {isRejected && (
          <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-800">
            <strong className="font-semibold">
              Não aprovado · só você vê.
            </strong>
            {event.rejectionReason && ` Motivo: ${event.rejectionReason}`}{" "}
            {formatDeletionNotice(event.rejectedAt)}
          </p>
        )}
        <p className="mt-1 flex items-start gap-1.5 text-xs font-medium text-green-200">
          <MapPin className="size-3.5 shrink-0" />
          {event.location}
        </p>
        <p
          className={clsx(
            "mt-1 line-clamp-2 text-sm leading-relaxed break-words",
            event.description ? "text-green-500" : "text-green-200 italic",
          )}
        >
          {event.description || "Nenhuma descrição compartilhada."}
        </p>
        <div className="mt-3 flex w-full items-center justify-between gap-2 max-sm:flex-wrap">
          {event.monthly && (
            <span
              className={clsx(
                "inline-flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase",
              )}
            >
              <Repeat2 className="size-3" aria-hidden />
              Evento mensal
            </span>
          )}
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black-100 inline-flex items-center gap-1 text-xs font-bold text-green-500 underline decoration-green-200 underline-offset-4"
            >
              <ExternalLink className="size-3" />
              Saiba mais
            </a>
          )}
        </div>
      </div>
      {canManage && (
        <EventOwnerMenu
          onEdit={isRejected ? undefined : onEdit}
          onDelete={onDelete}
        />
      )}
      {!past && !isRejected && (
        <div
          className={clsx(
            "col-span-2 mt-4 grid grid-cols-2 gap-2 border-t pt-3",
            isPending
              ? "border-amber-200"
              : "border-green-100 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
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
          {!isPending && (
            <ActionButton
              onClick={() => shareEvent(event)}
              className="col-span-full w-full sm:col-span-1 md:col-span-full lg:col-span-1"
              icon={<Share2 className="size-3.5" />}
            >
              Compartilhar
            </ActionButton>
          )}
        </div>
      )}
    </motion.article>
  );
}
