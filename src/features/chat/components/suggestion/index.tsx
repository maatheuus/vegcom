"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import Text from "@/shared/ui/Text";
import { useGSAP } from "@gsap/react";
import { LightbulbFilamentIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import { suggestions } from "./utils";

export interface Suggestion {
  id: string;
  key: "vegan" | "vegetarian" | "cooking";
  category: string;
  title: string;
  description: string;
  prompt: string;
}

export default function SuggestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramCategory = searchParams.get("category") || "all";
  const [selectedKey, setSelectedKey] = useState<string>(paramCategory);

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = [
    { key: "all", label: "Todas" },
    ...Array.from(
      new Map(suggestions.map((s) => [s.key, s.category])).entries(),
    ).map(([key, label]) => ({ key, label })),
  ];

  const handleCategoryChange = (key: string) => {
    if (key === selectedKey) return;
    setSelectedKey(key);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", key);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const displayedSuggestions = useMemo(() => {
    if (selectedKey === "all") {
      const mix: Suggestion[] = [];
      const grouped = suggestions.reduce(
        (acc, curr) => {
          if (!acc[curr.key]) acc[curr.key] = [];
          acc[curr.key].push(curr);
          return acc;
        },
        {} as Record<string, Suggestion[]>,
      );

      const keys = Object.keys(grouped) as Array<keyof typeof grouped>;
      keys.forEach((key) => {
        mix.push(...grouped[key].slice(0, 2));
      });
      return mix;
    }

    return suggestions.filter((s) => s.key === selectedKey);
  }, [selectedKey]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    router.push(
      `/chat?tab=chat&prompt=${encodeURIComponent(suggestion.prompt)}`,
    );
  };

  useEffect(() => {
    if (paramCategory !== selectedKey) {
      setSelectedKey(paramCategory);
    }
  }, [paramCategory, selectedKey]);

  useGSAP(
    () => {
      if (buttonsRef.current.length !== categories.length) return;
      const activeIndex = categories.findIndex((c) => c.key === selectedKey);
      const activeButton = buttonsRef.current[activeIndex];
      if (!activeButton || !pillRef.current) return;

      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      gsap.to(pillRef.current, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
        duration: 0.6,
        ease: "back.out(1.4)",
        overwrite: true,
      });
    },
    { scope: containerRef, dependencies: [selectedKey, categories] },
  );

  return (
    <div className="h-full space-y-8 md:space-y-12">
      <div className="mt-6 w-full max-w-[calc(100vw-5rem)] rounded-none px-0 md:max-w-7xl md:px-6 lg:px-8">
        <ScrollArea orientation="horizontal" className="w-full pb-4">
          <div
            ref={containerRef}
            className="relative flex w-full items-center gap-x-2 rounded-full bg-green-50 p-1.5"
          >
            <div
              ref={pillRef}
              className="absolute top-0 left-0 my-1.5 h-[calc(100%-0.75rem)] rounded-full bg-green-500 shadow-md will-change-[transform,width,height]"
            />
            {categories.map(({ key, label }, index) => (
              <button
                key={key}
                ref={(el) => {
                  buttonsRef.current[index] = el;
                }}
                onClick={() => handleCategoryChange(key)}
                className={clsx(
                  "font-lora relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm whitespace-nowrap italic transition-colors duration-300 md:text-base",
                  selectedKey === key
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

      <main className="space-y-8 pb-10 sm:px-6 md:space-y-10 lg:px-8">
        <div className="text-center">
          <Text className="font-maitree font-semibold text-green-500">
            {selectedKey === "all"
              ? "Selecione um tópico para iniciar uma conversa."
              : `Sugestões sobre ${categories.find((c) => c.key === selectedKey)?.label}`}
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
          <div className="py-20 text-center">
            <LightbulbFilamentIcon
              size={48}
              className="mx-auto mb-2 text-green-200/30"
            />
            <Text as="p" className="font-maitree text-gray-500">
              Nenhuma sugestão encontrada nesta categoria
            </Text>
          </div>
        )}
      </main>
    </div>
  );
}
