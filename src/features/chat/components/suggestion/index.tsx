"use client";

import EmptyState from "@/shared/ui/EmptyState";
import { ScrollArea } from "@/shared/ui/scroll-area";
import Text from "@/shared/ui/Text";
import { useGSAP } from "@gsap/react";
import { LightbulbFilamentIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import { suggestions } from "./utils";

export interface Suggestion {
  id: string;
  key: "all" | "vegan" | "vegetarian" | "cooking";
  category: string;
  title: string;
  description: string;
  prompt: string;
}

interface SuggestionsPageProps {
  onSuggestionClick?: () => void;
}

type ReduceSugestion = {
  mix: Suggestion[];
  counts: Record<string, number>;
};

export default function SuggestionsPage({
  onSuggestionClick,
}: SuggestionsPageProps) {
  const router = useRouter();
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion["key"]>("all");

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(
    () => [
      { key: "all", label: "Todas" },
      ...Array.from(
        new Map(suggestions.map((s) => [s.key, s.category])).entries(),
      ).map(([key, label]) => ({ key, label })),
    ],
    [],
  );

  const handleCategoryChange = (key: Suggestion["key"] | null) => {
    if (!key) return;

    setSelectedSuggestion(key);
  };

  const displayedSuggestions = useMemo(() => {
    if (selectedSuggestion === "all") {
      return suggestions.reduce<ReduceSugestion>(
        (acc, curr) => {
          const count = acc.counts[curr.key] || 0;
          if (count < 2) {
            acc.mix.push(curr);
            acc.counts[curr.key] = count + 1;
          }
          return acc;
        },
        { mix: [], counts: {} },
      ).mix;
    }

    return suggestions.filter((s) => s.key === selectedSuggestion);
  }, [selectedSuggestion]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (onSuggestionClick) {
      onSuggestionClick();
    }

    router.push(
      `/chat?tab=chat&prompt=${encodeURIComponent(suggestion.prompt)}`,
    );
  };

  useGSAP(
    () => {
      if (buttonsRef.current.length !== categories.length) return;

      const activeIndex = categories.findIndex(
        (c) => c.key === selectedSuggestion,
      );
      const activeButton = buttonsRef.current[activeIndex];

      if (!activeButton || !pillRef.current) return;

      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      gsap.to(pillRef.current, {
        x: activeButton.offsetLeft,
        y: activeButton.offsetTop,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
        duration: 0.4,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      });
    },
    { scope: containerRef, dependencies: [selectedSuggestion, categories] },
  );

  return (
    <div className="h-full space-y-8 md:space-y-12">
      <div className="mt-6 w-full max-w-[calc(100vw-5rem)] rounded-none px-0 md:max-w-7xl md:px-6 lg:px-8">
        <ScrollArea orientation="horizontal" className="w-full pb-4">
          <div
            ref={containerRef}
            className="relative flex w-full items-center gap-x-2 rounded-full bg-green-50 px-3 py-1.5"
          >
            <div
              ref={pillRef}
              className="pointer-events-none absolute top-0 left-0 rounded-full bg-green-500 shadow-sm will-change-transform"
              style={{ height: 0, width: 0 }}
            />
            {categories.map(({ key, label }, index) => (
              <button
                key={key}
                ref={(el) => {
                  buttonsRef.current[index] = el;
                }}
                onClick={() => handleCategoryChange(key as Suggestion["key"])}
                className={clsx(
                  "font-lora relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm whitespace-nowrap italic transition-colors duration-300 md:text-base",
                  selectedSuggestion === key
                    ? "font-semibold text-green-50"
                    : "text-green-500/70 hover:text-green-500",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <main className="space-y-8 px-3 pb-10 md:space-y-10 md:px-6 lg:px-8">
        <div className="text-center">
          <Text
            as="span"
            type={Text.Type.BodyTwo}
            className="font-maitree font-semibold text-green-500"
          >
            {selectedSuggestion === "all"
              ? "Selecione um tópico para iniciar uma conversa."
              : `Sugestões sobre ${categories.find((c) => c.key === selectedSuggestion)?.label}`}
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedSuggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            />
          ))}
        </div>

        {displayedSuggestions.length === 0 && (
          <EmptyState
            icon={<LightbulbFilamentIcon size={36} />}
            title="Nenhuma sugestão encontrada nesta categoria"
            className="py-20"
          />
        )}
      </main>
    </div>
  );
}
