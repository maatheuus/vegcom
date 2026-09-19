import { NextRequest, NextResponse } from "next/server";

/**
 * Gera um .ics a partir dos dados do evento recebidos por query string.
 * O app do Google Agenda ignora os parâmetros de links de template no mobile,
 * então servimos um arquivo de calendário com Content-Type próprio.
 */

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Escapa os caracteres reservados de valores de texto no RFC 5545. */
function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function toCalendarDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

/** Quebra linhas acima de 75 octetos, como exige o RFC 5545. */
function foldLine(line: string) {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let limit = 75;

  for (const char of line) {
    if (encoder.encode(current + char).length > limit) {
      parts.push(current);
      current = char;
      limit = 74; // a linha de continuação começa com um espaço
      continue;
    }
    current += char;
  }
  parts.push(current);

  return parts.join("\r\n ");
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const title = params.get("title")?.trim();
  const date = params.get("date")?.trim();

  if (!title || !date || !DATE_PATTERN.test(date)) {
    return NextResponse.json(
      { message: "Informe title e date (YYYY-MM-DD)." },
      { status: 400 },
    );
  }

  const start = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ message: "Data inválida." }, { status: 400 });
  }

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  const location = params.get("location")?.trim();
  const details = params.get("details")?.trim();
  const uid = `${date.replaceAll("-", "")}-${Date.now()}@vegcom`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VegCom//Agenda//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${toCalendarDate(start)}`,
    `DTEND;VALUE=DATE:${toCalendarDate(end)}`,
    `SUMMARY:${escapeText(title)}`,
    ...(location ? [`LOCATION:${escapeText(location)}`] : []),
    ...(details ? [`DESCRIPTION:${escapeText(details)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new NextResponse(`${lines.map(foldLine).join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="evento-vegcom.ics"',
      "Cache-Control": "no-store",
    },
  });
}
