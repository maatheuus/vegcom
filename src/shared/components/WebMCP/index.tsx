"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Extend navigator type for WebMCP
declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (config: any) => void;
    };
  }
}

export const WebMCPProvider = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.modelContext) {
      navigator.modelContext.provideContext({
        tools: [
          {
            name: "searchRecipes",
            description: "Pesquisar receitas no VegCom por termo ou filtros.",
            inputSchema: {
              type: "object",
              properties: {
                query: { type: "string", description: "Termo de busca" },
                mealType: { type: "string", description: "Tipo de refeição (ex: café da manhã, almoço)" },
              },
            },
            execute: async ({ query, mealType }: { query?: string; mealType?: string }) => {
              const params = new URLSearchParams();
              if (query) params.append("q", query);
              if (mealType) params.append("type", mealType);

              router.push(`/recipes?${params.toString()}`);
              return { status: "success", message: `Navegando para a busca de receitas: ${query || mealType}` };
            },
          },
          {
            name: "getRecipe",
            description: "Ver os detalhes de uma receita específica via slug.",
            inputSchema: {
              type: "object",
              properties: {
                slug: { type: "string", description: "O slug da receita (ex: bolo-de-chocolate-vegano)" },
              },
              required: ["slug"],
            },
            execute: async ({ slug }: { slug: string }) => {
              router.push(`/recipes/${slug}`);
              return { status: "success", message: `Navegando para a receita: ${slug}` };
            },
          },
          {
            name: "goToCommunity",
            description: "Navegar para o feed da comunidade VegCom.",
            inputSchema: { type: "object", properties: {} },
            execute: async () => {
              router.push("/community");
              return { status: "success", message: "Navegando para a comunidade" };
            },
          }
        ],
      });
    }
  }, [router]);

  return null;
};
