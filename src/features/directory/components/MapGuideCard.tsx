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
    <aside className="absolute inset-x-0 bottom-0 z-[1003] mx-auto flex max-h-[calc(100%-0.75rem)] flex-col overflow-hidden rounded-t-3xl border border-b-0 border-green-200 bg-white shadow-[0_12px_30px_rgba(27,78,48,0.18)] sm:top-20 sm:right-4 sm:bottom-auto sm:left-4 sm:block sm:max-w-md sm:overflow-visible sm:rounded-2xl sm:border sm:p-4">
      <div className="relative shrink-0 px-4 pt-6 pb-3 sm:p-0">
        <span
          className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-green-200/70 sm:hidden"
          aria-hidden
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 flex size-10 items-center justify-center rounded-full text-green-200 transition-[background-color,color,scale] duration-150 hover:bg-green-100 hover:text-green-500 active:scale-[0.96] sm:-top-2 sm:-right-2"
          aria-label="Fechar explicação do mapa"
        >
          <X className="size-4" />
        </button>
        <div className="pr-7">
          <p className="font-lora text-lg font-bold text-green-500 italic">
            O que você quer adicionar?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-green-500">
            Compartilhe um local fixo ou divulgue um evento com data marcada.
          </p>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 touch-pan-y gap-2 overflow-y-auto overscroll-contain px-4 pb-4 sm:mt-4 sm:grid-cols-2 sm:overflow-visible sm:p-0">
        <button
          type="button"
          onClick={onAddPlace}
          className="rounded-xl border border-green-200 bg-green-50 p-3 text-left transition-[background-color,border-color,scale] duration-150 hover:border-green-500 hover:bg-green-100 active:scale-[0.96]"
        >
          <div className="flex items-center gap-x-2">
            <MapPinPlus className="size-4 text-green-500" />
            <span className="block text-sm font-bold text-green-500">
              Adicionar local
            </span>
          </div>
          <span className="mt-1 block text-xs leading-relaxed text-green-200">
            Restaurante, café, feira permanente ou outro ponto
            vegano/vegetariano.
          </span>
        </button>
        <button
          type="button"
          onClick={onViewEvents}
          className="rounded-xl border border-green-200 bg-green-50 p-3 text-left transition-[background-color,border-color,scale] duration-150 hover:border-green-500 hover:bg-green-100 active:scale-[0.96]"
        >
          <div className="flex items-center gap-x-2">
            <CalendarPlus className="size-4 text-green-500" />
            <span className="block text-sm font-bold text-green-500">
              Adicionar evento
            </span>
          </div>
          <span className="mt-1 block text-xs leading-relaxed text-green-200">
            Feira, oficina ou encontro com data e local definidos.
          </span>
        </button>
      </div>
    </aside>
  );
}
