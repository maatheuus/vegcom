import { CalendarDays } from "lucide-react";

interface DistantEventsNoticeProps {
  count: number;
  onShow: () => void;
}

export function DistantEventsNotice({ count, onShow }: DistantEventsNoticeProps) {
  const plural = count > 1 ? "s" : "";

  return (
    <div className="pointer-events-none absolute right-20 bottom-4 left-20 z-[1001] sm:right-12 sm:bottom-6 sm:left-auto sm:w-auto sm:max-w-xs">
      <button
        type="button"
        onClick={onShow}
        className="pointer-events-auto w-full rounded-2xl border border-green-200 bg-white px-3 py-2.5 text-left text-sm shadow-[0_10px_24px_rgba(27,78,48,0.16)] transition-[background-color,border-color,box-shadow,scale] duration-150 hover:border-green-500 hover:bg-green-50 hover:shadow-[0_12px_28px_rgba(27,78,48,0.2)] focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] sm:px-4 sm:py-3"
      >
        <p className="font-semibold text-green-500 sm:hidden">
          {count} evento{plural} mais distantes.
        </p>
        <p className="hidden font-semibold text-green-500 sm:block">
          Há {count} evento{plural} em outras regiões.
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-green-200 sm:hidden">
          Afaste o zoom para vê-los.
        </p>
        <p className="mt-1 hidden text-xs leading-relaxed text-green-200 sm:block">
          Afaste o zoom para encontrá-los no mapa.
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-green-500">
          <CalendarDays className="size-3.5" aria-hidden />
          Ver todos no mapa
        </span>
      </button>
    </div>
  );
}
