"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { toast } from "@/shared/hooks/use-toast";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarPlus,
  ExternalLink,
  MapPin,
  Pencil,
  Plus,
  Share2,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useDeleteEvent,
  useEvents,
} from "../api/queries/getDirectoryApiClient";
import { addToCalendar, shareEvent } from "../hooks/eventActions";
import type { DirectoryEvent } from "../types";
import { AddEventModal } from "./AddEventModal";

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
const EVENTS_PER_PAGE = 6;
const SHORT_MONTH = new Intl.DateTimeFormat("pt-BR", { month: "short" });

const getMonth = (date: string) => MONTHS[new Date(date).getMonth() + 1];
const getCity = (location: string) =>
  location.split(",").at(-1)?.trim() || location;

interface EventsListProps {
  openAddModal?: boolean;
  onAddModalRequestHandled?: () => void;
}

export function EventsList({
  openAddModal = false,
  onAddModalRequestHandled,
}: EventsListProps) {
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const {
    data: upcomingEventsPage,
    isLoading: isLoadingUpcoming,
    isFetching: isFetchingUpcoming,
  } = useEvents({
    page: upcomingPage,
    limit: EVENTS_PER_PAGE,
    period: "upcoming",
  });
  const {
    data: pastEventsPage,
    isLoading: isLoadingPast,
    isFetching: isFetchingPast,
  } = useEvents({
    page: pastPage,
    limit: EVENTS_PER_PAGE,
    period: "past",
  });
  const upcomingEvents = upcomingEventsPage?.data ?? [];
  const pastEvents = pastEventsPage?.data ?? [];
  const { data: user } = useGetUser();
  const { mutateAsync: deleteEvent, isPending: isDeletingEvent } =
    useDeleteEvent();
  const [month, setMonth] = useState("Todos");
  const [city, setCity] = useState("Todas");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DirectoryEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<DirectoryEvent | null>(
    null,
  );
  const upcomingTotalPages = upcomingEventsPage?.pagination.totalPages ?? 0;
  const pastTotalPages = pastEventsPage?.pagination.totalPages ?? 0;
  const upcomingTotal = upcomingEventsPage?.pagination.total ?? 0;
  const pastTotal = pastEventsPage?.pagination.total ?? 0;
  const isLoading = isLoadingUpcoming || isLoadingPast;

  useEffect(() => {
    if (!openAddModal) return;
    setIsAddModalOpen(true);
    onAddModalRequestHandled?.();
  }, [onAddModalRequestHandled, openAddModal]);

  useEffect(() => {
    if (upcomingTotalPages > 0 && upcomingPage > upcomingTotalPages) {
      setUpcomingPage(upcomingTotalPages);
    }
  }, [upcomingPage, upcomingTotalPages]);
  useEffect(() => {
    if (pastTotalPages > 0 && pastPage > pastTotalPages) {
      setPastPage(pastTotalPages);
    }
  }, [pastPage, pastTotalPages]);
  const allEvents = [...upcomingEvents, ...pastEvents];
  const cities = [
    "Todas",
    ...[...new Set(allEvents.map((event) => getCity(event.location)))].sort(),
  ];
  const matchesFilters = (event: DirectoryEvent) =>
    (month === "Todos" || getMonth(event.date) === month) &&
    (city === "Todas" || getCity(event.location) === city);
  const upcoming = upcomingEvents.filter(matchesFilters);
  const past = pastEvents.filter(matchesFilters);

  const handleDelete = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEvent(eventToDelete.id);
      setEventToDelete(null);
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
  };

  return (
    <div className="hidden-scrollbar h-full overflow-y-auto bg-green-50 px-4 py-5 sm:px-8 sm:py-8">
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
          <div className="flex gap-2">
            <SelectFilter
              value={month}
              onChange={(value) => {
                setMonth(value);
                setUpcomingPage(1);
                setPastPage(1);
              }}
              label="Filtrar por mês"
              options={MONTHS}
            />
            <SelectFilter
              value={city}
              onChange={(value) => {
                setCity(value);
                setUpcomingPage(1);
                setPastPage(1);
              }}
              label="Filtrar por cidade"
              options={cities}
            />
          </div>
        </section>

        {isLoading ? (
          <Loading />
        ) : upcoming.length === 0 && past.length === 0 ? (
          <EmptyState onAdd={() => setIsAddModalOpen(true)} />
        ) : (
          <div className="mt-8 space-y-9">
            {upcoming.length > 0 && (
              <div className="space-y-5">
                <EventSection
                  title="Para colocar na agenda"
                  events={upcoming}
                  total={upcomingTotal}
                  currentUserId={user?.id}
                  onEdit={setEditingEvent}
                  onDelete={setEventToDelete}
                />
                {upcomingTotalPages > 1 && (
                  <EventsPagination
                    page={upcomingPage}
                    totalPages={upcomingTotalPages}
                    isLoading={isFetchingUpcoming}
                    onChange={setUpcomingPage}
                    label="Paginação dos próximos eventos"
                  />
                )}
              </div>
            )}
            {past.length > 0 && (
              <div className="space-y-5">
                <EventSection
                  title="O que já aconteceu"
                  events={past}
                  total={pastTotal}
                  currentUserId={user?.id}
                  onEdit={setEditingEvent}
                  onDelete={setEventToDelete}
                  past
                />
                {pastTotalPages > 1 && (
                  <EventsPagination
                    page={pastPage}
                    totalPages={pastTotalPages}
                    isLoading={isFetchingPast}
                    onChange={setPastPage}
                    label="Paginação dos eventos passados"
                  />
                )}
              </div>
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
      <Dialog
        open={Boolean(eventToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeletingEvent) setEventToDelete(null);
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl border-green-200 bg-white">
          <DialogHeader>
            <DialogTitle className="font-lora text-black-100 text-xl italic">
              Excluir evento?
            </DialogTitle>
            <DialogDescription className="font-maitree mt-2 leading-relaxed text-green-500">
              O evento “{eventToDelete?.title}” será removido da agenda. Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button
                variant="text"
                type="button"
                disabled={isDeletingEvent}
                className="rounded-full border border-green-200 font-bold text-green-500 hover:bg-green-100"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeletingEvent}
              className="rounded-full bg-red-600 font-bold text-white hover:bg-red-700"
            >
              {isDeletingEvent && (
                <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isDeletingEvent ? "Excluindo..." : "Excluir evento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EventsPagination({
  page,
  totalPages,
  isLoading,
  onChange,
  label,
}: {
  page: number;
  totalPages: number;
  isLoading: boolean;
  onChange: (page: number) => void;
  label: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="border-t border-green-100 pt-7" aria-label={label}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(page - 1)}
            disabled={page === 1 || isLoading}
          />
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              onClick={() => onChange(item)}
              isActive={item === page}
              disabled={isLoading}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(page + 1)}
            disabled={page === totalPages || isLoading}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function SelectFilter({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
}) {
  return (
    <div className="w-full md:max-w-fit">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          className="h-auto rounded-full border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-500 hover:border-green-500 hover:bg-white focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-green-100 bg-white p-1 shadow-[0_8px_24px_rgba(27,78,48,0.12)]">
          {options.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-green-500 focus:bg-green-100 focus:text-green-500 data-[state=checked]:bg-green-100 data-[state=checked]:text-green-500"
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function EventSection({
  title,
  events,
  total,
  currentUserId,
  onEdit,
  onDelete,
  past = false,
}: {
  title: string;
  events: DirectoryEvent[];
  total: number;
  currentUserId?: number;
  onEdit: (event: DirectoryEvent) => void;
  onDelete: (event: DirectoryEvent) => void;
  past?: boolean;
}) {
  return (
    <section className={past ? "opacity-60" : ""}>
      <p className="mb-3 text-xs font-bold tracking-[0.18em] text-green-200 uppercase">
        {title} · {total}
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
      className="group flex min-w-0 gap-4 rounded-[1.5rem] border border-green-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-[0_12px_25px_rgba(27,78,48,0.12)]"
    >
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-green-100 text-green-500">
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
        <h3 className="font-maitree text-black-100 line-clamp-2 text-base font-bold break-words">
          {event.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-green-200">
          <MapPin className="size-3.5 shrink-0" />
          {event.location}
        </p>
        <p
          className={`mt-3 line-clamp-2 text-sm leading-relaxed break-words ${event.description ? "text-green-500" : "text-green-200 italic"}`}
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
      className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-500 transition hover:border-green-500 hover:bg-green-200 hover:text-green-50 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {icon}
      {children}
    </button>
  );
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
