"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  Phone,
  Image,
  Globe,
  MessageSquare,
  UtensilsCrossed,
  Navigation,
} from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import type { Place, PlaceCategory } from "../types";
import { haversineDistance } from "../hooks/haversineDistance";

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  restaurant: "Restaurante",
  market: "Feira",
  bakery: "Padaria",
  cafe: "Café",
  entrepreneur: "Empreendedor",
  other: "Outro",
};

const STATUS_CONFIG = {
  active: { label: "Ativo", class: "bg-green-100 text-green-700" },
  closed: { label: "Fechado", class: "bg-red-100 text-red-700" },
  moved: { label: "Mudou de endereço", class: "bg-amber-100 text-amber-700" },
} as const;

interface PlaceDetailPanelProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  onReport: () => void;
  userPosition?: [number, number] | null;
}

export function PlaceDetailPanel({
  place,
  isOpen,
  onClose,
  onReport,
  userPosition,
}: PlaceDetailPanelProps) {
  const isMobile = useIsMobile();

  if (!place) return null;

  const status = STATUS_CONFIG[place.status];

  const slideIn = isMobile
    ? { y: "100%", opacity: 0 }
    : { x: "100%", opacity: 0 };

  const slideInVisible = isMobile
    ? { y: 0, opacity: 1 }
    : { x: 0, opacity: 1 };

  const slideOut = isMobile
    ? { y: "100%", opacity: 0 }
    : { x: "100%", opacity: 0 };

  const panelWidth = isMobile
    ? "bottom-0 left-0 right-0 max-h-[75vh] rounded-t-2xl"
    : "right-0 top-0 h-full w-full max-w-md";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1100] bg-black/20 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="place-detail-panel"
            initial={slideIn}
            animate={slideInVisible}
            exit={slideOut}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={[
              "fixed z-[1200] overflow-y-auto bg-white shadow-2xl",
              panelWidth,
            ].join(" ")}
            role="dialog"
            aria-modal
            aria-label={`Detalhes de ${place.name}`}
          >
            <div className="relative flex flex-col">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-green-100 bg-white/95 px-5 pb-4 pt-5 backdrop-blur-sm">
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      <UtensilsCrossed className="h-3 w-3" aria-hidden />
                      {CATEGORY_LABELS[place.category as PlaceCategory] ?? place.category}
                    </span>
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.class,
                      ].join(" ")}
                    >
                      {status.label}
                    </span>
                  </div>
                  <h2 className="truncate text-lg font-semibold text-green-900">
                    {place.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-full p-1.5 text-green-500 transition-colors hover:bg-green-100 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 px-5 pb-6 pt-4">
                {place.details.description && (
                  <p className="text-sm leading-relaxed text-green-700">
                    {place.details.description}
                  </p>
                )}

                {userPosition && (
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 w-fit">
                    <Navigation className="h-3.5 w-3.5" aria-hidden />
                    A {haversineDistance(userPosition[0], userPosition[1], place.lat, place.lng)} km de você
                  </div>
                )}

                {/* Info grid */}
                <div className="flex flex-col gap-3">
                  {place.details.address && (
                    <InfoRow
                      icon={<MapPin className="h-4 w-4" aria-hidden />}
                      label="Endereço"
                      value={place.details.address}
                    />
                  )}
                  {place.details.schedule && (
                    <InfoRow
                      icon={<Clock className="h-4 w-4" aria-hidden />}
                      label="Horários"
                      value={place.details.schedule}
                    />
                  )}
                  {place.details.phone && (
                    <InfoRow
                      icon={<Phone className="h-4 w-4" aria-hidden />}
                      label="Telefone"
                      value={place.details.phone}
                    />
                  )}
                  {place.details.instagram && (
                    <InfoRow
                      icon={<Image className="h-4 w-4" aria-hidden />}
                      label="Instagram"
                      value={place.details.instagram}
                    />
                  )}
                  {place.details.website && (
                    <InfoRow
                      icon={<Globe className="h-4 w-4" aria-hidden />}
                      label="Site"
                      value={place.details.website}
                    />
                  )}
                </div>

                {/* Tags */}
                {place.details.tags && place.details.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                    {place.details.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Report button */}
                <button
                  type="button"
                  onClick={onReport}
                  className={[
                    "mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    "border border-amber-200 bg-amber-50 text-amber-700",
                    "hover:border-amber-300 hover:bg-amber-100",
                    "active:border-amber-400 active:bg-amber-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Sugerir Alteração / Informar Problema
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-green-400">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-green-400">
          {label}
        </p>
        <p className="truncate text-sm text-green-800">{value}</p>
      </div>
    </div>
  );
}
