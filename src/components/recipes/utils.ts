import { food } from "@/assets";
import { z } from "zod";
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


export const newRecipeFormSchema = z.object({
  recipe_title: z
    .string()
    .min(4, { message: "O título precisa ter pelo menos 4 letras!" })
    .max(100, { message: "Esse título tá meio longo demais, hein? 🤔" }),

  recipe_description: z
    .string()
    .min(10, { message: "Uma boa receita merece uma descrição bacana." })
    .max(500, { message: "Vamos manter a descrição mais objetiva 😉" }),

  new_recipe_ingredient_text: z
    .string()
    // .min(1, { message: "Digite o ingrediente antes de adicionar!" }),
    .min(1, { message: "Adicione pelo menos um ingrediente." }),

  new_recipe_instruction_text: z
    .string()
    // .min(1, { message: "Digite a instrução antes de adicionar!" }),
    .min(1, { message: "Você precisa ensinar como fazer, né? 😅" }),

  new_recipe_cooking_note_text: z
    .string()
    // .min(1, { message: "Digite a nota antes de adicionar!" }),
    .min(1, { message: "Deixe pelo menos uma dica!" }),

  recipe_ingredients: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    })
  ),

  recipe_instructions: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    })
  ),

  recipe_cookingNotes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    })
  ),

  recipe_preparationHours: z
    .string()
    .min(1, { message: "Informe as horas, mesmo que seja zero." }),

  recipe_preparationMinutes: z
    .string()
    .min(1, { message: "Quantos minutinhos? Não esquece!" }),

  recipe_preparationTime: z.string(),

  recipe_servings: z
    .string()
    .min(1, { message: "Quantas pessoas vão se deliciar com essa receita?" }),

  recipe_category: z
    .string()
    .min(1, { message: "Escolha uma categoria pra organizar melhor." }),

  recipe_difficulty: z
    .string()
    .min(1, { message: "Qual o nível de dificuldade da receita?" }),

  recipe_images: z
    .array(
      z.object({
        id: z.string(),
        file: z.instanceof(File),
        preview: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: "Pelo menos uma imagem ajuda bastante!" })
    .max(4, { message: "Você pode subir no máximo 4 imagens, tá bom?" }),
});

export const defaultValues = {
  new_recipe_ingredient_text: "",
  new_recipe_instruction_text: "",
  new_recipe_cooking_note_text: "",
  recipe_title: "",
  recipe_description: "",
  recipe_preparationTime: "",
  recipe_preparationHours: "",
  recipe_preparationMinutes: "",
  recipe_servings: "",
  recipe_category: "",
  recipe_difficulty: "",
  recipe_ingredients: [],
  recipe_instructions: [],
  recipe_cookingNotes: [],
  recipe_images: [],
};
