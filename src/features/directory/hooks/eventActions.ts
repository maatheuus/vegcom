import { toast } from "@/shared/hooks/use-toast";
import type { DirectoryEvent } from "../types";

/** Gera e baixa um arquivo .ics para adicionar o evento à agenda. */
export function addToCalendar(event: DirectoryEvent) {
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
