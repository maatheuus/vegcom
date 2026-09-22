import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import type { DirectoryEvent } from "../../types";

const FULL_DATE = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatEventDate(event: DirectoryEvent) {
  if (event.monthly) {
    return `Todo dia ${new Date(event.date).getDate()} de cada mês`;
  }

  const formatted = FULL_DATE.format(new Date(event.date));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

interface EventDetailsDialogProps {
  event: DirectoryEvent | null;
  onClose: () => void;
}

export function EventDetailsDialog({
  event,
  onClose,
}: EventDetailsDialogProps) {
  return (
    <Dialog
      open={Boolean(event)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto rounded-2xl border-green-200 bg-green-50">
        <DialogHeader>
          <DialogTitle className="font-maitree text-black-100 pr-6 text-left text-lg font-bold break-words md:text-xl">
            {event?.title}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-2 space-y-1.5 text-xs font-medium text-green-500">
              <p className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5 shrink-0 md:size-4" />
                {event && formatEventDate(event)}
              </p>
              <p className="flex items-start gap-1.5 text-left break-words">
                <MapPin className="mt-0.5 size-3.5 shrink-0 md:size-4" />
                {event?.location}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed hyphens-auto whitespace-pre-line text-green-500">
          {event?.description || "Nenhuma descrição compartilhada."}
        </p>
        {event?.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black-100 inline-flex w-fit items-center gap-1 text-xs font-bold break-all text-green-500 underline decoration-green-200 underline-offset-4"
          >
            <ExternalLink className="size-3.5 shrink-0 md:size-4" />
            Saiba mais
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
