import clsx from "clsx";
import type { DirectoryEvent } from "../../types";
import { EventCard } from "./EventCard";
import { EventsPagination } from "./EventsPagination";

interface EventSectionProps {
  title: string;
  paginationLabel: string;
  events: DirectoryEvent[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isRefreshing: boolean;
  currentUserId?: number;
  onEdit: (event: DirectoryEvent) => void;
  onDelete: (event: DirectoryEvent) => void;
  onOpen: (event: DirectoryEvent) => void;
  past?: boolean;
}

export function EventSection({
  title,
  paginationLabel,
  events,
  total,
  page,
  totalPages,
  onPageChange,
  isRefreshing,
  currentUserId,
  onEdit,
  onDelete,
  onOpen,
  past = false,
}: EventSectionProps) {
  if (events.length === 0) return null;

  return (
    <div className="space-y-5">
      <section className={clsx(past && "opacity-60")} aria-busy={isRefreshing}>
        <div className="mb-3 flex min-h-5 items-center justify-between gap-3">
          <p className="text-xs font-bold tracking-[0.18em] text-green-200 uppercase">
            {title} · {total}
          </p>
          {isRefreshing && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-200">
              <span className="size-3 animate-spin rounded-full border border-green-200 border-t-green-500" />
              Atualizando
            </span>
          )}
        </div>
        <div
          className={clsx(
            "grid gap-3 transition-opacity duration-150 md:grid-cols-2",
            isRefreshing && "opacity-70",
          )}
        >
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              past={past}
              isOwner={event.userId === currentUserId}
              onEdit={() => onEdit(event)}
              onDelete={() => onDelete(event)}
              onOpen={() => onOpen(event)}
            />
          ))}
        </div>
      </section>
      {totalPages > 1 && (
        <EventsPagination
          page={page}
          totalPages={totalPages}
          isLoading={isRefreshing}
          onChange={onPageChange}
          label={paginationLabel}
        />
      )}
    </div>
  );
}
