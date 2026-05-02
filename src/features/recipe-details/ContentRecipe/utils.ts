import { jorgeTest } from "@/assets";
import type { Comment } from "@/features/recipes";
import { Difficulty, MealType } from "@/features/recipes/api/types";

type RecipeType = "ingredients" | "instructions" | "cookingNotes";

interface TypeConfig {
  button: {
    base: string;
    uncheckedBg?: string;
    checkedBg?: string;
    checked?: string;
    checkedIconBg?: string | null;
  };
  text: {
    base?: string;
    lineThrough: boolean;
    weight: string;
    color: string;
    checkedColor: string;
  };
  interactive: boolean;
}

export const formatCategoryLabel = (category: MealType | string) => {
  if (!category) return;

  const categoryLabel = category.toUpperCase();

  switch (categoryLabel) {
    case MealType.BREAKFAST:
      return "Café da manhã";
    case MealType.LUNCH:
      return "Almoço";
    case MealType.DINNER:
      return "Jantar";
    case MealType.DESSERT:
      return "Sobremesas";
    case MealType.SNACKS:
      return "Lanches";
    case MealType.GENERAL:
      return "Geral";
    default:
      return category;
  }
};

export const formatTimeLabel = (time: string) => {
  const timeLabel = "minutos";

  if (time.includes(timeLabel)) return time.replace(timeLabel, "min");

  return time;
};

export const formatDifficultyLabel = (difficulty: Difficulty) => {
  if (!difficulty) return;

  const difficultyLabel = difficulty.toUpperCase();

  switch (difficultyLabel) {
    case Difficulty.EASY:
      return "Fácil";
    case Difficulty.MEDIUM:
      return "Média";
    case Difficulty.HARD:
      return "Difícil";
  }
};

export const typeConfig: Record<RecipeType, TypeConfig> = {
  ingredients: {
    button: {
      base: "cursor-pointer size-6 min-w-6 min-h-6 rounded-full font-medium border border-green-500 text-green-500",
      checked: "opacity-70",
      checkedIconBg: null as string | null,
    },
    text: {
      lineThrough: true,
      weight: "font-bold",
      color: "text-green-500",
      checkedColor: "text-green-200",
    },
    interactive: true,
  },
  instructions: {
    button: {
      base: "cursor-pointer size-6 min-w-6 min-h-6 rounded-full font-medium !text-white",
      uncheckedBg: "bg-green-200 text-green-500",
      checkedBg: "bg-green-500",
      checked: "opacity-70",
    },
    text: {
      lineThrough: true,
      weight: "font-bold",
      color: "text-green-500",
      checkedColor: "text-green-200",
    },
    interactive: true,
  },
  cookingNotes: {
    button: {
      base: "size-6 min-w-6 min-h-6 rounded-full font-medium border border-green-500 text-green-500 cursor-default",
    },
    text: {
      base: "!cursor-default",
      lineThrough: false,
      weight: "font-bold",
      color: "text-green-500",
      checkedColor: "",
    },
    interactive: false,
  },
};

export const mockComments: Comment[] = [
  {
    author: "Sara Johnson",
    avatarUrl: jorgeTest.src,
    id: 1,
    content:
      "Wow, this Mixed Greens with Sun-Dried Tomato Dressing recipe is a flavor explosion in my mouth! Very delicious.",
    timeAgo: "40min ago",
    likes: 26,
  },
  {
    id: 2,
    author: "Jessica Martinez",
    avatarUrl: jorgeTest.src,
    content: "I agree with you, very delicious.",
    timeAgo: "20min ago",
    likes: 10,
  },
  {
    id: 3,
    author: "David Wilson",
    avatarUrl: jorgeTest.src,
    content:
      "The combination of fresh greens and the zesty sun-dried tomato dressing is a total game-changer. It’s become a staple in my weekly menu. So easy to make and so incredibly delicious!",
    timeAgo: "1hr ago",
    likes: 46,
  },
  {
    id: 4,
    author: "David Wilson",
    avatarUrl: jorgeTest.src,
    content:
      "The combination of fresh greens and the zesty sun-dried tomato dressing is a total game-changer. It’s become a staple in my weekly menu. So easy to make and so incredibly delicious!",
    timeAgo: "1hr ago",
    likes: 46,
  },
  {
    id: 5,
    author: "David Wilson",
    avatarUrl: jorgeTest.src,
    content:
      "The combination of fresh greens and the zesty sun-dried tomato dressing is a total game-changer. It’s become a staple in my weekly menu. So easy to make and so incredibly delicious!",
    timeAgo: "1hr ago",
    likes: 46,
  },
  {
    id: 6,
    author: "David Wilson",
    avatarUrl: jorgeTest.src,
    content:
      "The combination of fresh greens and the zesty sun-dried tomato dressing is a total game-changer. It’s become a staple in my weekly menu. So easy to make and so incredibly delicious!",
    timeAgo: "1hr ago",
    likes: 46,
  },
  {
    id: 7,
    author: "David Wilson",
    avatarUrl: jorgeTest.src,
    content:
      "The combination of fresh greens and the zesty sun-dried tomato dressing is a total game-changer. It’s become a staple in my weekly menu. So easy to make and so incredibly delicious!",
    timeAgo: "1hr ago",
    likes: 46,
  },
  {
    id: 8,
    author: "David Wilson",
    avatarUrl: jorgeTest.src,
    content:
      "The combination of fresh greens and the zesty sun-dried tomato dressing is a total game-changer. It’s become a staple in my weekly menu. So easy to make and so incredibly delicious!",
    timeAgo: "1hr ago",
    likes: 46,
  },
];

export const mockIngredients = [
  {
    id: 1,
    label: "1 xícara de folhas verdes mistas (alface, rúcula, espinafre)",
  },
  {
    id: 2,
    label: "1/2 xícara de tomate-cereja cortado ao meio",
  },
  { id: 3, label: "1/4 de xícara de milho cozido" },
  { id: 4, label: "1/4 de pepino japonês fatiado" },
  { id: 5, label: "1/4 de cebola roxa fatiada" },
  { id: 6, label: "1 colher de sopa de sementes de girassol" },
  { id: 7, label: "1 colher de sopa de azeite de oliva" },
  { id: 8, label: "1 colher de sopa de suco de limão" },
  { id: 9, label: "1 pitada de sal e pimenta-do-reino a gosto" },
];

export const mockInstructions = [
  { id: 1, label: "Soak tomatoes in soy milk for 1 hour." },
  { id: 2, label: "Blend and serve." },
  { id: 3, label: "Add the tofu and mix well." },
  { id: 4, label: "Serve with a drizzle of olive oil." },
  { id: 5, label: "Garnish with fresh herbs." },
  { id: 6, label: "Enjoy your meal!" },
];

export const mockCookingNotes = [
  {
    id: 1,
    label: "Deixe o molho descansar por 10 minutos antes de servir.",
  },
  {
    id: 2,
    label: "Se preferir mais cremoso, adicione 1 colher de sopa de tahine.",
  },
  {
    id: 3,
    label: "Experimente adicionar outros legumes de sua preferência.",
  },
];
