import { food } from "@/assets";
import { z } from "zod";

export const recipes = [
  {
    id: 1,
    title: "Risoto de Cogumelos",
    images: [food],
    rating: 4.8,
    cookTime: "45 min",
    quantity: 4,
    description:
      "Um cremoso risoto italiano com mix de cogumelos frescos e ervas aromáticas.",
    views: 1542,
  },
  {
    id: 2,
    title: "Salada Colorida",
    images: [food],
    rating: 4.2,
    cookTime: "15 min",
    views: 987,
    quantity: 2,
    description:
      "Salada refrescante com mix de folhas, tomates cereja e molho especial.",
  },
  {
    id: 3,
    title: "Hambúrguer de Grão-de-Bico",
    images: [food],
    rating: 4.9,
    cookTime: "30 min",
    views: 2134,
    quantity: 4,
    description:
      "Hambúrguer vegano proteico feito com grão-de-bico e especiarias.",
  },
  {
    id: 4,
    title: "Alimentos Veganos Low Carb",
    images: [food],
    rating: 3.7,
    cookTime: "25 min",
    views: 863,
    quantity: 3,
    description:
      "Receitas veganas baixas em carboidratos, perfeitas para sua dieta.",
  },
  {
    id: 5,
    title: "Lasanha Vegetal",
    images: [food],
    rating: 4.5,
    cookTime: "60 min",
    views: 1920,
    quantity: 6,
    description:
      "Lasanha tradicional com camadas de vegetais grelhados e molho especial.",
  },
  {
    id: 6,
    title: "Sopa de Lentilha",
    images: [food],
    rating: 4.6,
    cookTime: "35 min",
    views: 1327,
    quantity: 4,
    description:
      "Sopa nutritiva e reconfortante com lentilhas e legumes frescos.",
  },
  {
    id: 7,
    title: "Tacos Mexicanos",
    images: [food],
    rating: 4.9,
    cookTime: "25 min",
    views: 1789,
    quantity: 4,
    description:
      "Tacos crocantes recheados com feijão preto temperado e guacamole.",
  },
  {
    id: 8,
    title: "Curry de Grão-de-Bico",
    images: [food],
    rating: 4.3,
    cookTime: "40 min",
    views: 2045,
    quantity: 4,
    description:
      "Curry aromático indiano com grão-de-bico e leite de coco cremoso.",
  },
  {
    id: 9,
    title: "Pizza Vegana",
    images: [food],
    rating: 5,
    cookTime: "30 min",
    views: 2756,
    quantity: 3,
    description:
      "Pizza artesanal com massa caseira e coberturas vegetais saborosas.",
  },
  {
    id: 10,
    title: "Wrap de Hummus",
    images: [food],
    rating: 3.9,
    cookTime: "10 min",
    views: 654,
    quantity: 2,
    description: "Wrap leve e nutritivo com hummus caseiro e vegetais frescos.",
  },
  {
    id: 11,
    title: "Bowl de Quinoa",
    images: [food],
    rating: 4.7,
    cookTime: "25 min",
    views: 1458,
    quantity: 2,
    description:
      "Bowl colorido e nutritivo com quinoa, vegetais assados e tahine.",
  },
  {
    id: 12,
    title: "Smoothie Verde",
    images: [food],
    rating: 4.0,
    cookTime: "5 min",
    views: 802,
    quantity: 1,
    description:
      "Smoothie energético com espinafre, banana e frutas tropicais.",
  },
  {
    id: 13,
    title: "Falafel Assado",
    images: [food],
    rating: 4.4,
    cookTime: "35 min",
    views: 1723,
    quantity: 4,
    description:
      "Bolinhos de grão-de-bico assados, crocantes por fora e macios por dentro.",
  },
  {
    id: 14,
    title: "Pad Thai Vegano",
    images: [food],
    rating: 4.8,
    cookTime: "30 min",
    views: 1945,
    quantity: 3,
    description:
      "Macarrão tailandês com vegetais salteados e molho de amendoim.",
  },
  {
    id: 15,
    title: "Brownie de Chocolate",
    images: [food],
    rating: 5,
    cookTime: "40 min",
    views: 2433,
    quantity: 8,
    description: "Brownie vegano super fudgy com pedaços de chocolate amargo.",
  },
];

export const categories = {
  "Tipo de Refeição": [
    "Café da manhã",
    "Almoço",
    "Jantar",
    "Sobremesas",
    "Lanches",
    "Geral",
  ],
  "Tempo de Preparo": ["Rápidas (≤ 30min)", "Elaboradas"],
  "Destaques da Comunidade": [
    "Mais populares",
    "Melhor avaliadas",
    "Novidades",
  ],
};

export const CATEGORY_TO_API: Record<string, string[]> = {
  "cafe da manha": ["breakfast", "BREAKFAST"],
  almoco: ["lunch", "LUNCH"],
  jantar: ["dinner", "DINNER"],
  sobremesas: ["dessert", "DESSERT"],
  lanches: ["snacks", "SNACKS"],
  geral: ["general", "GENERAL"],
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

  recipe_ingredients: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    }),
  ),

  recipe_instructions: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    }),
  ),

  recipe_cookingNotes: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional()
    .default([]),

  recipe_preparationHours: z.string().optional().default("0"),

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
      }),
    )
    .min(1, { message: "Pelo menos uma imagem ajuda bastante!" }),

  new_recipe_ingredient_text: z
    .string()
    .min(3, { message: "Pelo menos um ingrediente válido" })
    .max(100, { message: "Esse ingrediente tá meio longo demais, hein? 🤔" }),

  new_recipe_instruction_text: z
    .string()
    .min(3, { message: "Pelo menos uma instrução válida" })
    .max(100, { message: "Esse instrução tá meio longo demais, hein? 🤔" }),

  new_recipe_cookingNote_text: z.string().optional(),
});

export const defaultValues = {
  recipe_title: "",
  recipe_description: "",
  recipe_preparationTime: "",
  recipe_preparationHours: "0",
  recipe_preparationMinutes: "",
  recipe_servings: "",
  recipe_category: "",
  recipe_difficulty: "",
  recipe_ingredients: [],
  recipe_instructions: [],
  recipe_cookingNotes: [],
  recipe_images: [],
  new_recipe_ingredient_text: "",
  new_recipe_instruction_text: "",
  new_recipe_cookingNote_text: "",
};
