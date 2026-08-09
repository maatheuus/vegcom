"use client";

import { motion } from "framer-motion";
import { LocateFixed, MapPinned, X } from "lucide-react";
import type { GeolocationState } from "../hooks/useGeolocation";

interface LocationPromptProps {
  state: GeolocationState;
  onAllow: () => void;
  onSkip: () => void;
}

export function LocationPrompt({
  state,
  onAllow,
  onSkip,
}: LocationPromptProps) {
  if (state !== "idle" && state !== "loading") return null;

  const isLoading = state === "loading";

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
      className="absolute inset-x-4 bottom-6 z-[1003] mx-auto max-w-md rounded-[1.75rem] border border-green-200 bg-white p-5 shadow-[0_18px_44px_rgba(27,78,48,0.24)] sm:bottom-8"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={onSkip}
        className="absolute top-3 right-3 rounded-full p-1.5 text-green-200 transition hover:bg-green-100 hover:text-green-500"
        aria-label="Continuar sem localização"
      >
        <X className="size-4" />
      </button>
      <div className="flex gap-3 pr-6">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-500">
          <MapPinned className="size-5" />
        </span>
        <div>
          <p className="font-lora text-black-100 text-xl font-semibold italic">
            Encontre o vegano perto de você
          </p>
          <p className="font-maitree mt-1 text-sm leading-relaxed text-green-500">
            Com sua localização, abrimos o mapa direto na sua região.
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onSkip}
          disabled={isLoading}
          className="rounded-full px-4 py-2.5 text-sm font-bold text-green-500 transition hover:bg-green-100 disabled:opacity-50"
        >
          Ver o mapa do Brasil
        </button>
        <button
          type="button"
          onClick={onAllow}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-200 disabled:cursor-wait disabled:bg-green-200"
        >
          <LocateFixed
            className={isLoading ? "size-4 animate-pulse" : "size-4"}
          />
          {isLoading ? "Localizando..." : "Usar minha localização"}
        </button>
      </div>
    </motion.aside>
  );
}
