"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarPlus,
  ChevronDown,
  ExternalLink,
  MapPin,
  Pencil,
  Plus,
  Share2,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import {
  useDeleteEvent,
  useEvents,
} from "../api/queries/getDirectoryApiClient";
import { AddEventModal } from "./AddEventModal";
import type { DirectoryEvent } from "../types";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { toast } from "@/shared/hooks/use-toast";

const MONTHS = [
  "Todos",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const getMonth = (date: string) => MONTHS[new Date(date).getMonth() + 1];
const getCity = (location: string) =>
  location.split(",").at(-1)?.trim() || location;

export function EventsList() {
  const { data: events = [], isLoading } = useEvents();
  const { data: user } = useGetUser();
  const { mutateAsync: deleteEvent } = useDeleteEvent();
  const [month, setMonth] = useState("Todos");
  const [city, setCity] = useState("Todas");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DirectoryEvent | null>(null);
  const cities = useMemo(
    () =>
      [
        "Todas",
        ...new Set(events.map((event) => getCity(event.location))),
      ].sort(),
    [events],
  );
  const filtered = useMemo(
    () =>
      events
        .filter(
          (event) =>
            (month === "Todos" || getMonth(event.date) === month) &&
            (city === "Todas" || getCity(event.location) === city),
        )
        .sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [city, events, month],
  );
  const now = new Date();
  const upcoming = filtered.filter((event) => new Date(event.date) >= now);
  const past = filtered.filter((event) => new Date(event.date) < now);
  const handleDelete = useCallback(
    async (event: DirectoryEvent) => {
      if (
        !window.confirm(
          `Excluir “${event.title}”? Esta ação não pode ser desfeita.`,
        )
      )
        return;
      try {
        await deleteEvent(event.id);
        toast({
          variant: "success",
          title: "Evento excluído",
          description: "Ele foi removido da agenda.",
        });
      } catch {
        toast({
          variant: "destructive",
          title: "Não foi possível excluir",
          description: "Tente novamente em instantes.",
        });
      }
    },
    [deleteEvent],
  );

  return (
    <div className="h-full overflow-y-auto bg-green-50 px-4 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-green-500 px-6 py-7 text-white shadow-[0_18px_40px_rgba(27,78,48,0.22)] sm:px-9 sm:py-9">
          <div className="absolute -top-16 -right-10 size-52 rounded-full border-[28px] border-green-200/40" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.22em] text-green-100 uppercase">
                Agenda da comunidade
              </p>
              <h1 className="font-lora text-4xl italic sm:text-5xl">
                Eventos veganos
              </h1>
              <p className="font-maitree mt-3 max-w-xl text-sm text-green-100 sm:text-base">
                Feiras, oficinas e encontros para descobrir pessoas, sabores e
                ideias.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-green-500 transition hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-500 focus-visible:outline-none"
            >
              <Plus className="size-4" />
              Adicionar evento
            </button>
          </div>
        </section>

        <section className="mt-5 rounded-[1.5rem] border border-green-100 bg-white p-4 shadow-[0_8px_24px_rgba(27,78,48,0.08)] sm:flex sm:items-center sm:justify-between sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-green-500 sm:mb-0">
            <span className="flex size-9 items-center justify-center rounded-full bg-green-100">
              <SlidersHorizontal className="size-4" />
            </span>
            <p className="font-maitree text-sm font-semibold">
              Encontre algo perto de você
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SelectFilter
              value={month}
              onChange={setMonth}
              label="Filtrar por mês"
              options={MONTHS}
            />
            <SelectFilter
              value={city}
              onChange={setCity}
              label="Filtrar por cidade"
              options={cities}
              className="max-w-44"
            />
          </div>
        </section>

        {isLoading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <EmptyState onAdd={() => setIsAddModalOpen(true)} />
        ) : (
          <div className="mt-8 space-y-9">
            {upcoming.length > 0 && (
              <EventSection
                title="Para colocar na agenda"
                events={upcoming}
                currentUserId={user?.id}
                onEdit={setEditingEvent}
                onDelete={handleDelete}
              />
            )}
            {past.length > 0 && (
              <EventSection
                title="O que já aconteceu"
                events={past}
                currentUserId={user?.id}
                onEdit={setEditingEvent}
                onDelete={handleDelete}
                past
              />
            )}
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
    </div>
  );
}

function SelectFilter({
  value,
  onChange,
  label,
  options,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="w-full appearance-none rounded-full border border-green-200 bg-green-50 py-2 pr-10 pl-4 text-sm font-semibold text-green-500 transition outline-none hover:border-green-500 hover:bg-white focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-green-500"
        aria-hidden
      />
    </div>
  );
}

function EventSection({
  title,
  events,
  currentUserId,
  onEdit,
  onDelete,
  past = false,
}: {
  title: string;
  events: DirectoryEvent[];
  currentUserId?: number;
  onEdit: (event: DirectoryEvent) => void;
  onDelete: (event: DirectoryEvent) => void;
  past?: boolean;
}) {
  return (
    <section className={past ? "opacity-60" : ""}>
      <p className="mb-3 text-xs font-bold tracking-[0.18em] text-green-200 uppercase">
        {title} · {events.length}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            index={index}
            isOwner={event.userId === currentUserId}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event)}
          />
        ))}
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
  isOwner,
  onEdit,
  onDelete,
}: {
  event: DirectoryEvent;
  index: number;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const date = new Date(event.date);
  const handleCalendar = () => addToCalendar(event);
  const handleShare = () => shareEvent(event);
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group flex gap-4 rounded-[1.5rem] border border-green-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-[0_12px_25px_rgba(27,78,48,0.12)]"
    >
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-green-100 text-green-500">
        <strong className="font-lora text-2xl leading-none">
          {date.getDate()}
        </strong>
        <span className="mt-1 text-[10px] font-bold tracking-wider uppercase">
          {date
            .toLocaleDateString("pt-BR", { month: "short" })
            .replace(".", "")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-maitree text-black-100 truncate text-base font-bold">
          {event.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-green-200">
          <MapPin className="size-3.5 shrink-0" />
          {event.location}
        </p>
        {event.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-green-500">
            {event.description}
          </p>
        )}
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
        <div className="mt-4 flex flex-wrap gap-2 border-t border-green-100 pt-3">
          <ActionButton
            onClick={handleCalendar}
            icon={<CalendarPlus className="size-3.5" />}
          >
            Na agenda
          </ActionButton>
          <ActionButton
            onClick={handleShare}
            icon={<Share2 className="size-3.5" />}
          >
            Compartilhar
          </ActionButton>
          {isOwner && (
            <>
              <ActionButton
                onClick={onEdit}
                icon={<Pencil className="size-3.5" />}
              >
                Editar
              </ActionButton>
              <ActionButton
                onClick={onDelete}
                icon={<Trash2 className="size-3.5" />}
              >
                Excluir
              </ActionButton>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ActionButton({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:text-black-100 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-500 transition hover:bg-green-100"
    >
      {icon}
      {children}
    </button>
  );
}

function addToCalendar(event: DirectoryEvent) {
  const start = new Date(event.date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const format = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const escape = (value: string) =>
    value.replace(/[\\,;]/g, "\\$&").replace(/\n/g, "\\n");
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:vegcom-event-${event.id}\nDTSTAMP:${format(new Date())}\nDTSTART:${format(start)}\nDTEND:${format(end)}\nSUMMARY:${escape(event.title)}\nLOCATION:${escape(event.location)}\nDESCRIPTION:${escape(event.description ?? "")}\nURL:${event.link ?? ""}\nEND:VEVENT\nEND:VCALENDAR`;
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.ics`;
  link.click();
  URL.revokeObjectURL(url);
  toast({
    variant: "success",
    title: "Evento salvo",
    description: "O arquivo para sua agenda foi baixado.",
  });
}

async function shareEvent(event: DirectoryEvent) {
  const text = `${event.title}\n${event.location}\n${new Date(event.date).toLocaleDateString("pt-BR")}${event.link ? `\n${event.link}` : ""}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: event.title, text, url: event.link });
      return;
    }
    await navigator.clipboard.writeText(text);
    toast({
      variant: "success",
      title: "Link copiado",
      description: "Agora é só enviar para quem vai gostar.",
    });
  } catch {
    /* Cancelar o share nativo não exige feedback. */
  }
}

function Loading() {
  return (
    <div className="flex min-h-72 items-center justify-center">
      <span className="size-9 animate-spin rounded-full border-2 border-green-200 border-t-green-500" />
    </div>
  );
}
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-[2rem] border border-dashed border-green-200 bg-white px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-500">
        <Calendar className="size-8" />
      </span>
      <h2 className="font-lora text-black-100 mt-5 text-2xl italic">
        Ainda não há eventos por aqui
      </h2>
      <p className="font-maitree mt-2 max-w-sm text-sm leading-relaxed text-green-500">
        Ajude a tornar esta agenda viva: compartilhe uma feira, oficina ou
        encontro que vale a pena conhecer.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-200"
      >
        <Plus className="size-4" />
        Adicionar evento
      </button>
    </div>
  );
}
