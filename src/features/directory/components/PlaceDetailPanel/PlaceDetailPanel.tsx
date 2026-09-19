"use client";

import clsx from "clsx";
import { Navigation } from "lucide-react";
import styles from "../../directory.module.css";
import { haversineDistance } from "../../hooks/haversineDistance";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { Place } from "../../types";
import { getGoogleMapsDirectionsUrl } from "../../utils/googleMaps";
import { PlaceDetailActions } from "./PlaceDetailActions";
import { PlaceDetailHeader } from "./PlaceDetailHeader";
import { PlaceInfoList } from "./PlaceInfoList";

interface PlaceDetailPanelProps {
  place: Place | null;
  onClose: () => void;
  onReport: () => void;
  userPosition?: [number, number] | null;
}

export function PlaceDetailPanel({
  place,
  onClose,
  onReport,
  userPosition,
}: PlaceDetailPanelProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {place && (
        <>
          {isMobile && (
            <div
              className={`${styles.overlayEnter} fixed inset-0 z-[1900] bg-black/25`}
              onClick={onClose}
              aria-hidden
            />
          )}
          <div
            className={clsx(
              styles.modalEnter,
              "z-[2000] flex flex-col overflow-hidden bg-white shadow-[0_16px_38px_rgba(27,78,48,0.22)]",
              isMobile
                ? "place-detail-sheet fixed inset-x-0 bottom-0 max-h-[calc(100dvh-2rem)] rounded-t-[2rem]!"
                : "absolute top-4 right-4 max-h-[calc(100%-2rem)] w-[min(24rem,calc(100%-2rem))] rounded-2xl! border border-green-200",
            )}
            role="dialog"
            aria-modal={isMobile || undefined}
            aria-label={`Detalhes de ${place.name}`}
          >
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <PlaceDetailHeader
                place={place}
                isMobile={isMobile}
                onClose={onClose}
              />

              <div className="flex min-h-0 flex-1 touch-pan-y flex-col gap-4 overflow-y-auto overscroll-contain px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
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

                <PlaceInfoList details={place.details} />

                {!!place.details.tags?.length && (
                  <div
                    className="flex flex-wrap gap-1.5"
                    role="list"
                    aria-label="Tags"
                  >
                    {place.details.tags.map((tag) => (
                      <span
                        key={tag}
                        role="listitem"
                        className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <PlaceDetailActions
                  directionsUrl={getGoogleMapsDirectionsUrl({
                    lat: place.lat,
                    lng: place.lng,
                    fallbackDestination: place.details.address ?? place.name,
                  })}
                  onReport={onReport}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
