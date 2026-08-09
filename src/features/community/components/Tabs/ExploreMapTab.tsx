"use client";

import Button from "@/shared/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { MapTrifoldIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAP_FEATURE_SEEN_KEY = "vegcom-map-feature-intro-seen";

export default function ExploreMapTab() {
  const [hasSeenFeature, setHasSeenFeature] = useState(false);

  useEffect(() => {
    setHasSeenFeature(localStorage.getItem(MAP_FEATURE_SEEN_KEY) === "true");
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open || hasSeenFeature) return;

    localStorage.setItem(MAP_FEATURE_SEEN_KEY, "true");
    setHasSeenFeature(true);
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id="community-map-tab"
          variant="text"
          className="group relative cursor-pointer p-0 transition-all duration-200 after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:rounded-full after:bg-green-200 after:transition-all after:duration-300 after:content-[''] [&_svg]:size-fit"
          aria-label="Conheça o mapa vegano"
        >
          <span className="relative">
            <MapTrifoldIcon size={24} className="text-green-200" />
            {!hasSeenFeature && (
              <span
                className="absolute -top-0.5 -right-1.5 flex size-2"
                aria-hidden
              >
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-orange-500 ring-2 ring-green-50" />
              </span>
            )}
          </span>
          <span className="font-lora hidden italic group-hover:text-green-500 md:inline">
            Mapa
          </span>
          {!hasSeenFeature && <span className="sr-only">Novo recurso</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="top"
        className="z-[60] w-72 rounded-xl border border-green-200 bg-green-50 p-4 shadow-lg"
      >
        <p className="font-lora text-base font-semibold text-green-500 italic">
          Novo: mapa vegano
        </p>
        <p className="font-maitree mt-1 text-sm leading-snug text-green-600">
          Encontre lugares e eventos para viver o veganismo pelo Brasil.
        </p>
        <Link
          href="/explore"
          className="font-maitree mt-3 inline-flex items-center text-sm font-semibold text-green-500 underline transition-colors hover:text-green-600 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Explorar mapa →
        </Link>
      </PopoverContent>
    </Popover>
  );
}
