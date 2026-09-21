import { MessageSquare, Navigation } from "lucide-react";

interface PlaceDetailActionsProps {
  directionsUrl?: string;
  onReport?: () => void;
}

export function PlaceDetailActions({
  directionsUrl,
  onReport,
}: PlaceDetailActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {directionsUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-medium text-white transition-[background-color,scale] duration-150 hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.96]"
        >
          <Navigation className="h-4 w-4" aria-hidden />
          Como chegar
        </a>
      )}

      {onReport && (
        <button
          type="button"
          onClick={onReport}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-3 text-xs font-medium whitespace-nowrap text-amber-700 transition-[background-color,border-color,scale] duration-150 hover:border-amber-300 hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.96] active:border-amber-400 active:bg-amber-200 sm:px-4 sm:text-sm"
        >
          <MessageSquare className="h-4 w-4" aria-hidden />
          Sugerir Alteração / Informar Problema
        </button>
      )}
    </div>
  );
}
