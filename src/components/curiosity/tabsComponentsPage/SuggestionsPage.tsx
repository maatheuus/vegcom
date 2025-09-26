import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import clsx from "clsx";
import { Lightbulb, Smile } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [selectedKey, setSelectedKey] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { key: "all", label: "Todas" },
    ...Array.from(
      new Map(suggestions.map((s) => [s.key, s.category])).entries()
    ).map(([key, label]) => ({ key, label })),
    { key: "carnivore", label: "Carnívoro" },
  ];

  useEffect(() => {
    if (!selectedKey) return;

    const currentParam = searchParams.get("category") || "all";
    if (selectedKey.toLowerCase() === currentParam.toLowerCase()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", selectedKey.toLowerCase());

    router.push(`?${params.toString()}`);
  }, [searchParams, selectedKey]);

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    if (category !== selectedKey) setSelectedKey(category);
  }, [searchParams]);

  const filteredSuggestions =
    selectedKey === "all"
      ? suggestions.filter((s) => s.key !== "carnivore")
      : suggestions.filter((s) => s.key === selectedKey);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setIsLoading(true);
    router.push(
      `/curiosity?tab=chat&prompt=${encodeURIComponent(suggestion.prompt)}`
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(({ key, label }) => (
            <Button
              key={key}
              onClick={() => setSelectedKey(key)}
              variant="text"
              className={clsx(
                "p-2 rounded-full text-green-50 bg-green-500 hover:bg-green-50 hover:text-green-500 transition-colors duration-300 relative cursor-pointer border border-green-500",
                selectedKey === key && "bg-green-50 text-green-500"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Text className="text-green-500">
            Selecione um tópico para iniciar uma conversa.
          </Text>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : selectedKey === "carnivore" ? (
          <div className="text-center py-20">
            <Smile size={48} className="mx-auto text-red-400 mb-4" />
            <p className="text-xl font-semibold text-red-500">
              🥩 Opa! Pegamos você no flagra...
            </p>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              Essa aba é só uma brincadeira! Aqui somos 100% plantas 🌱. Mas tá
              tudo bem, a gente também já foi carnívoro um dia 😉
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuggestions.slice(0, 9).map((suggestion, index) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                index={index}
              />
            ))}
          </div>
        )}

        {selectedKey !== "carnivore" && filteredSuggestions.length === 0 && (
          <div className="text-center py-20">
            <Lightbulb size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              Nenhuma sugestão encontrada nesta categoria
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
