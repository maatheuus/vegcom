import { toast } from "@/shared/hooks/use-toast";
import type { DirectoryEvent } from "../types";

function formatCalendarDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

/** Abre o Google Agenda com um evento de dia inteiro já preenchido. */
export function addToGoogleCalendar(event: DirectoryEvent) {
  const start = new Date(`${event.date.slice(0, 10)}T00:00:00Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  const details = [event.description, event.link].filter(Boolean).join("\n\n");
  const url = new URL("https://calendar.google.com/calendar/r/eventedit");

  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", event.title);
  url.searchParams.set(
    "dates",
    `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
  );
  url.searchParams.set("details", details);
  url.searchParams.set("location", event.location);

  window.open(url.toString(), "_blank", "noopener,noreferrer");

  toast({
    variant: "success",
    title: "Google Agenda aberto",
    description: "Revise os dados e salve o evento na sua agenda.",
  });
}

/** Compartilha o evento via Web Share API, com fallback para copiar o link. */
export async function shareEvent(event: DirectoryEvent) {
  const details = [
    event.title,
    `Data: ${new Date(event.date).toLocaleDateString("pt-BR")}`,
    `Local: ${event.location}`,
    ...(event.description ? [`Sobre o evento: ${event.description}`] : []),
  ];
  const text = `Confira este evento na VegCom!\n\n${details.join("\n")}`;

  try {
    if (navigator.share) {
      await navigator.share({ title: event.title, text, url: event.link });
      return;
    }
    await navigator.clipboard.writeText(
      event.link ? `${text}\n\nMais informações: ${event.link}` : text,
    );
    toast({
      variant: "success",
      title: "Link copiado",
      description: "Agora é só enviar para quem vai gostar.",
    });
  } catch {
    /* Cancelar o share nativo não exige feedback. */
  }
}
