import { food } from "@/assets";
import type { Recipe } from "./types";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Risoto de Cogumelos",
    image: food,
    rating: 5,
    prepTime: "45 min",
    servings: 4,
    description:
      "Um cremoso risoto italiano com mix de cogumelos frescos e ervas aromáticas.",
  },
  {
    id: "2",
    title: "Salada Colorida",
    image: food,
    prepTime: "15 min",
    servings: 2,
    description:
      "Salada refrescante com mix de folhas, tomates cereja e molho especial.",
  },
  {
    id: "3",
    title: "Hambúrguer de Grão-de-Bico",
    image: food,
    rating: 5,
    prepTime: "30 min",
    servings: 4,
    description:
      "Hambúrguer vegano proteico feito com grão-de-bico e especiarias.",
  },
  {
    id: "4",
    title: "Alimentos Veganos Low Carb",
    image: food,
    prepTime: "25 min",
    servings: 3,
    description:
      "Receitas veganas baixas em carboidratos, perfeitas para sua dieta.",
  },
];

export const categories = {
  "Tipo de Refeição": ["Café da manhã", "Almoço", "Jantar", "Sobremesas"],
  "Tempo de Preparo": ["Rápidas (≤ 30min)", "Elaboradas"],
  "Destaques da Comunidade": [
    "Mais populares",
    "Melhor avaliadas",
    "Novidades",
  ],
};
