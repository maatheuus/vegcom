"use client";

import { CalendarPlus, MapPinPlus, X } from "lucide-react";

interface MapGuideCardProps {
  onAddPlace: () => void;
  onViewEvents: () => void;
  onClose: () => void;
}

export function MapGuideCard({
  onAddPlace,
  onViewEvents,
  onClose,
}: MapGuideCardProps) {
  return (
    <aside className="absolute top-18 right-4 left-4 z-[1001] mx-auto max-w-md rounded-2xl border border-green-200 bg-white p-4 shadow-[0_12px_30px_rgba(27,78,48,0.18)] sm:top-20">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 rounded-full p-1 text-green-200 transition hover:bg-green-100 hover:text-green-500"
        aria-label="Fechar explicação do mapa"
      >
        <X className="size-4" />
      </button>
      <div className="pr-7">
        <p className="font-lora text-black-100 text-lg font-bold italic">
          O que você quer adicionar?
        </p>
        <p className="mt-1 text-sm leading-relaxed text-green-500">
          Compartilhe um local fixo ou divulgue um evento com data marcada.
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onAddPlace}
          className="rounded-xl border border-green-200 bg-green-50 p-3 text-left transition hover:border-green-500 hover:bg-green-100"
        >
          <MapPinPlus className="size-4 text-green-500" />
          <span className="mt-2 block text-sm font-bold text-green-500">
            Adicionar local
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-green-200">
            Restaurante, café, feira permanente ou outro ponto
            vegano/vegetariano.
          </span>
        </button>
        <button
          type="button"
          onClick={onViewEvents}
          className="rounded-xl border border-green-200 bg-green-50 p-3 text-left transition hover:border-green-500 hover:bg-green-100"
        >
          <CalendarPlus className="size-4 text-green-500" />
          <span className="mt-2 block text-sm font-bold text-green-500">
            Adicionar evento
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-green-200">
            Feira, oficina ou encontro com data e local definidos.
          </span>
        </button>
      </div>
    </aside>
  );
}
