import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PickLocationBannerProps {
  isVisible: boolean;
  isChecking: boolean;
  isRepositioning: boolean;
  onCancel: () => void;
}

export function PickLocationBanner({
  isVisible,
  isChecking,
  isRepositioning,
  onCancel,
}: PickLocationBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="pointer-events-none absolute inset-x-0 top-28 z-[1002] flex justify-center px-4 sm:top-20"
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(27,78,48,0.16)]">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <p className="font-maitree text-sm font-medium text-green-500">
              {isChecking
                ? "Confirmando se a posição fica no Brasil..."
                : isRepositioning
                  ? "Toque no mapa para mover o pin do local"
                  : "Toque no mapa para escolher a posição do local"}
            </p>
            <button
              type="button"
              onClick={onCancel}
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-green-200 transition-[background-color,color,scale] duration-150 hover:bg-green-100 hover:text-green-500 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:outline-none active:scale-[0.96]"
              aria-label={
                isRepositioning ? "Voltar ao formulário" : "Cancelar"
              }
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
