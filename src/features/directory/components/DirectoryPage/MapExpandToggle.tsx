import clsx from "clsx";
import { ArrowLeft, Maximize2, Minimize2 } from "lucide-react";

interface MapExpandToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function MapExpandToggle({ isExpanded, onToggle }: MapExpandToggleProps) {
  const toggleLabel = isExpanded ? "Reduzir mapa" : "Expandir mapa";

  return (
    <>
      {isExpanded && (
        <button
          type="button"
          onClick={onToggle}
          className={clsx(
            "absolute top-4 left-4 z-[1100] hidden items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.14)] transition-[background-color,color,scale] duration-150 sm:inline-flex",
            "hover:text-black-100 hover:bg-green-100",
            "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.96]",
          )}
          aria-label="Voltar ao mapa normal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar
        </button>
      )}
      <button
        type="button"
        onClick={onToggle}
        className="absolute bottom-4 left-4 z-[1002] flex items-center justify-center rounded-full border border-green-200 bg-white p-3 text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.14)] transition hover:bg-green-100 sm:top-4 sm:right-4 sm:bottom-auto sm:left-auto"
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        {isExpanded ? (
          <Minimize2 className="size-4" />
        ) : (
          <Maximize2 className="size-4" />
        )}
      </button>
    </>
  );
}
