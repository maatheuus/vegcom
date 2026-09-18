"use client";

import { toast } from "@/shared/hooks/use-toast";
import { InstagramLogoIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Copy,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { haversineDistance } from "../hooks/haversineDistance";
import { useIsMobile } from "../hooks/useIsMobile";
import type { Place, PlaceCategory } from "../types";
import { getGoogleMapsDirectionsUrl } from "../utils/googleMaps";

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  restaurant: "Restaurante",
  market: "Feira",
  bakery: "Padaria",
  cafe: "Café",
  entrepreneur: "Empreendedor",
  other: "Outro",
};

const STATUS_CONFIG = {
  pending: { label: "Em análise", class: "bg-amber-100 text-amber-700" },
  active: { label: "Ativo", class: "bg-green-100 text-green-700" },
  closed: { label: "Fechado", class: "bg-red-100 text-red-700" },
  moved: { label: "Mudou de endereço", class: "bg-amber-100 text-amber-700" },
  no_longer_vegan: {
    label: "Sem opções veganas",
    class: "bg-red-100 text-red-700",
  },
} as const;

const PRICE_RANGE_LABELS: Record<1 | 2 | 3, string> = {
  1: "Econômico",
  2: "Médio",
  3: "Caro",
};

function getInstagramProfile(value: string) {
  const handle = value
    .trim()
    .replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/[/?#].*$/, "");

  if (!handle) return null;

  return {
    label: `@${handle}`,
    url: `https://www.instagram.com/${encodeURIComponent(handle)}`,
  };
}

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
  const directionsUrl = getGoogleMapsDirectionsUrl({
    lat: place.lat,
    lng: place.lng,
    fallbackDestination: place.details.address ?? place.name,
  });
  const instagramProfile = place.details.instagram
    ? getInstagramProfile(place.details.instagram)
    : null;

  const slideIn = isMobile
    ? { y: "100%", opacity: 0 }
    : { x: "100%", opacity: 0 };

  const slideInVisible = isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 };

  const slideOut = isMobile
    ? { y: "100%", opacity: 0 }
    : { x: "100%", opacity: 0 };

  const panelPosition = isMobile
    ? "bottom-0 inset-x-0 max-h-[75vh] rounded-t-2xl!"
    : "top-4 right-4 max-h-[calc(100%-2rem)] w-[min(24rem,calc(100%-2rem))] rounded-2xl! border border-green-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-[1100] bg-black/20"
              onClick={onClose}
              aria-hidden
            />
          )}
          <motion.div
            key="place-detail-panel"
            initial={slideIn}
            animate={slideInVisible}
            exit={slideOut}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={clsx(
              "absolute z-[1200] overflow-hidden overflow-y-auto bg-white shadow-[0_16px_38px_rgba(27,78,48,0.22)]",
              panelPosition,
            )}
            role="dialog"
            aria-modal={isMobile || undefined}
            aria-label={`Detalhes de ${place.name}`}
          >
            <div className="relative flex flex-col">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-green-100 bg-white/95 px-5 pt-5 pb-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      <UtensilsCrossed className="h-3 w-3" aria-hidden />
                      {CATEGORY_LABELS[place.category as PlaceCategory] ??
                        place.category}
                    </span>
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.class,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <h2 className="font-lora truncate text-xl font-bold text-green-900">
                    {place.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-full p-1.5 text-green-500 transition-colors hover:bg-green-100 hover:text-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 px-5 pt-4 pb-6">
                {place.verification === "needs_review" && (
                  <p
                    className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-relaxed text-amber-800"
                    role="status"
                  >
                    Relatos recentes indicam que este lugar pode ter mudado.
                    Estamos verificando.
                  </p>
                )}
                {place.details.description && (
                  <p className="text-sm leading-relaxed text-green-800">
                    {place.details.description}
                  </p>
                )}

                {userPosition && (
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
                    <Navigation className="h-3.5 w-3.5" aria-hidden />A{" "}
                    {haversineDistance(
                      userPosition[0],
                      userPosition[1],
                      place.lat,
                      place.lng,
                    )}{" "}
                    km de você
                  </div>
                )}

                {/* Info grid */}
                <div className="flex flex-col gap-3">
                  {place.details.address && (
                    <InfoRow
                      icon={<MapPin className="h-4 w-4" aria-hidden />}
                      label="Endereço"
                      value={
                        <span className="inline-flex max-w-full items-start gap-1.5">
                          <span>{place.details.address}</span>
                          <CopyButton
                            value={place.details.address}
                            label="endereço"
                          />
                        </span>
                      }
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
                      value={
                        <span className="inline-flex items-center gap-1.5">
                          <span>{place.details.phone}</span>
                          <CopyButton
                            value={place.details.phone}
                            label="telefone"
                          />
                        </span>
                      }
                    />
                  )}
                  {instagramProfile && (
                    <InfoRow
                      icon={
                        <InstagramLogoIcon className="h-4 w-4" aria-hidden />
                      }
                      label="Instagram"
                      value={
                        <a
                          href={instagramProfile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-green-700 underline decoration-green-300 underline-offset-2 transition-colors hover:text-green-500"
                        >
                          {instagramProfile.label}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      }
                    />
                  )}
                  {place.details.priceRange && (
                    <InfoRow
                      icon={<DollarSign className="h-4 w-4" aria-hidden />}
                      label="Faixa de preço"
                      value={`${"$".repeat(place.details.priceRange)} · ${PRICE_RANGE_LABELS[place.details.priceRange]}`}
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
                  <div
                    className="flex flex-wrap gap-1.5"
                    role="list"
                    aria-label="Tags"
                  >
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

                <div className="flex flex-col gap-3">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Como chegar
                  </a>

                  <button
                    type="button"
                    onClick={onReport}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 transition-all duration-200 hover:border-amber-300 hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none active:border-amber-400 active:bg-amber-200"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    Sugerir Alteração / Informar Problema
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        variant: "success",
        title: `${label[0].toUpperCase()}${label.slice(1)} copiado`,
        description: `O ${label} está pronto para colar.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: `Não foi possível copiar o ${label}`,
        description: "Selecione o texto e tente novamente.",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded p-1 text-green-500 transition-colors hover:bg-green-100 hover:text-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
      aria-label={`Copiar ${label}`}
      title={`Copiar ${label}`}
    >
      <Copy className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-green-500">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wide text-green-500 uppercase">
          {label}
        </p>
        <div className="text-sm leading-relaxed font-bold break-words text-green-800">
          {value}
        </div>
      </div>
    </div>
  );
}
