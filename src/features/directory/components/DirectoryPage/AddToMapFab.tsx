import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AddToMapFabProps {
  isVisible: boolean;
  onClick: () => void;
}

export function AddToMapFab({ isVisible, onClick }: AddToMapFabProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ type: "spring", damping: 22, stiffness: 320 }}
          type="button"
          onClick={onClick}
          className={clsx(
            "absolute bottom-18 left-4 z-[1001] inline-flex items-center gap-2 rounded-full p-3 text-sm font-semibold sm:right-auto sm:bottom-6",
            "bg-green-500 text-white shadow-[0_10px_24px_rgba(27,78,48,0.28)] transition-colors duration-200",
            "active:bg-black-100 hover:bg-green-200",
            "focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none",
          )}
          aria-label="Adicionar ao mapa"
        >
          <Plus className="h-5 w-5" aria-hidden />
          <span className="hidden sm:inline">Adicionar</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
