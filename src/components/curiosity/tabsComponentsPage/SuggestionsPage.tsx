import { LightBulbOutlinedIcon } from "@/components/icons";
import Text from "@/components/ui/Text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Smile } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SuggestionCard from "../suggestion/SuggestionCard";

export interface Suggestion {
  id: string;
  key: string;
  category: string;
  title: string;
  description: string;
  prompt: string;
  color: string;
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    key: "vegan",
    category: "Vegano",
    title: "Plano de estudos personalizado",
    description: "Crie um cronograma de estudos otimizado",
    prompt:
      "Crie um plano de estudos personalizado para [sua área de interesse] considerando [seu tempo disponível] horas por dia",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "2",
    key: "vegetarian",
    category: "Vegetariano",
    title: "Explicar conceito de programação",
    description: "Entenda conceitos complexos de forma simples",
    prompt:
      "Explique o conceito de [algoritmo/estrutura de dados] com exemplos práticos em Python",
    color: "from-green-500 to-green-600",
  },
  {
    id: "3",
    key: "cooking",
    category: "Culinária",
    title: "Receita com ingredientes disponíveis",
    description: "Crie pratos com o que tem em casa",
    prompt:
      "Sugira uma receita usando apenas estes ingredientes: [liste seus ingredientes]",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "4",
    key: "cooking",
    category: "Culinária",
    title: "Receita com ingredientes disponíveis",
    description: "Crie pratos com o que tem em casa",
    prompt:
      "Sugira uma receita usando apenas estes ingredientes: [liste seus ingredientes]",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "5",
    key: "cooking",
    category: "Culinária",
    title: "Receita com ingredientes disponíveis",
    description: "Crie pratos com o que tem em casa",
    prompt:
      "Sugira uma receita usando apenas estes ingredientes: [liste seus ingredientes]",
    color: "from-orange-500 to-orange-600",
  },
];

export default function SuggestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return searchParams.get("category") || "all";
  });
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(
    () => [
      { key: "all", label: "Todas" },
      ...Array.from(
        new Map(suggestions.map((s) => [s.key, s.category])).entries(),
      ).map(([key, label]) => ({ key, label })),
      { key: "carnivore", label: "Carnívoro" },
    ],
    [],
  );

  useEffect(() => {
    const currentParam = searchParams.get("category") || "all";
    if (selectedKey === currentParam) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", selectedKey);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedKey, router]);

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    if (category !== selectedKey) {
      setSelectedKey(category);
    }
  }, [searchParams]);

  const filteredSuggestions =
    selectedKey === "all"
      ? suggestions.filter((s) => s.key !== "carnivore")
      : suggestions.filter((s) => s.key === selectedKey);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setIsLoading(true);
    router.push(
      `/curiosity?tab=chat&prompt=${encodeURIComponent(suggestion.prompt)}`,
    );
  };

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

      const animation = gsap.to(pillRef.current, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
        duration: 0.6,
        ease: "back.out(1.4)",
        overwrite: true,
      });

      return () => {
        animation.kill();
      };
    },
    { scope: containerRef, dependencies: [selectedKey, categories] },
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="scrollbar-hide relative flex items-center gap-x-2 overflow-x-auto rounded-full bg-green-50 p-1.5"
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
              onClick={() => setSelectedKey(key)}
              className={clsx(
                "font-lora relative z-10 block cursor-pointer rounded-full px-4 py-2 text-sm whitespace-nowrap italic transition-colors duration-300 md:text-base",
                selectedKey === key
                  ? "font-semibold text-green-50"
                  : "text-green-500/70 hover:text-green-500",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Text className="font-maitree font-semibold text-green-500">
            Selecione um tópico para iniciar uma conversa.
          </Text>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-500" />
          </div>
        ) : selectedKey === "carnivore" ? (
          <div className="py-20 text-center">
            <Smile size={48} className="mx-auto mb-4 text-red-400" />
            <Text
              as="p"
              className="font-lora !text-xl font-semibold text-red-500"
            >
              🥩 Opa! Pegamos você no flagra...
            </Text>
            <Text
              as="p"
              className="font-maitree mx-auto mt-2 max-w-md text-gray-600"
            >
              Essa aba é só uma brincadeira! Aqui somos 100% plantas. Mas tá
              tudo bem, a gente também já foi carnívoro um dia 😉
            </Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuggestions.slice(0, 9).map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              />
            ))}
          </div>
        )}

        {selectedKey !== "carnivore" && filteredSuggestions.length === 0 && (
          <div className="py-20 text-center">
            <LightBulbOutlinedIcon
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
