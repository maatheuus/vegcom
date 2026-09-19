import clsx from "clsx";
import { UtensilsCrossed, X } from "lucide-react";
import { CATEGORY_SINGULAR_LABELS } from "../../constants";
import type { Place, PlaceStatus } from "../../types";

const STATUS_CONFIG: Record<PlaceStatus, { label: string; className: string }> =
  {
    pending: { label: "Em análise", className: "bg-amber-100 text-amber-700" },
    active: { label: "Ativo", className: "bg-green-100 text-green-700" },
    closed: { label: "Fechado", className: "bg-red-100 text-red-700" },
    moved: {
      label: "Mudou de endereço",
      className: "bg-amber-100 text-amber-700",
    },
    no_longer_vegan: {
      label: "Sem opções veganas",
      className: "bg-red-100 text-red-700",
    },
  };

interface PlaceDetailHeaderProps {
  place: Place;
  isMobile: boolean;
  onClose: () => void;
}

export function PlaceDetailHeader({
  place,
  isMobile,
  onClose,
}: PlaceDetailHeaderProps) {
  const status = STATUS_CONFIG[place.status];

  return (
    <div className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-green-100 bg-white px-5 pt-6 pb-4 sm:pt-5">
      {isMobile && (
        <span
          className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-green-200/70"
          aria-hidden
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
            <UtensilsCrossed className="h-3 w-3" aria-hidden />
            {CATEGORY_SINGULAR_LABELS[place.category] ?? place.category}
          </span>
          {status && (
            <span
              className={clsx(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                status.className,
              )}
            >
              {status.label}
            </span>
          )}
        </div>
        <h2
          className={clsx(
            "font-lora text-xl font-bold text-balance text-green-900",
            isMobile ? "line-clamp-2" : "truncate",
          )}
        >
          {place.name}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-green-500 transition-[background-color,color,scale] duration-150 hover:bg-green-100 hover:text-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none active:scale-[0.96]"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
