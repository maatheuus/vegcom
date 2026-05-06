import { type CreateRecipeFormData } from "@/features/new-recipe/api/recipesApi";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import { newRecipeFormSchema } from "@/features/recipes/components/utils";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const TIPS_BY_STEP: Record<number, string[]> = {
  1: [
    "Escolha um nome claro e descritivo para a receita.",
    "Adicione uma descrição curta e apetitosa.",
    "Fotos com luz natural engajam muito mais!",
  ],
  2: [
    "Liste todos os ingredientes necessários.",
    "Escreva o modo de preparo passo a passo.",
    "Seja claro sobre tempos e temperaturas.",
  ],
  3: [
    "Confira as informações antes de publicar.",
    "A dica do chef é opcional, mas agrega muito valor!",
    "Adicione mais fotos para mostrar detalhes e o processo.",
  ],
};

export const formatPreparationTime = (
  hours: string,
  minutes: string,
): string => {
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  if (h > 0 && m > 0) return `${h}h ${m}min`;
  if (h > 0) return `${h} hora${h > 1 ? "s" : ""}`;
  if (m > 0) return `${m} minuto${m > 1 ? "s" : ""}`;
  return "—";
};

export type NewRecipeFormValues = z.infer<typeof newRecipeFormSchema>;
export type NewRecipeForm = UseFormReturn<NewRecipeFormValues>;

const parsePreparationTime = (
  cookTime: string,
): { hours: string; minutes: string } => {
  const hMatch = cookTime.match(/(\d+)\s*h/);
  const mMatch = cookTime.match(/(\d+)\s*min(uto)?s?/i);
  return {
    hours: hMatch ? hMatch[1] : "0",
    minutes: mMatch ? mMatch[1] : "0",
  };
};

export const recipeToFormValues = (
  recipe: DetailedRecipe,
): NewRecipeFormValues => {
  const { hours, minutes } = parsePreparationTime(recipe.cookTime ?? "");

  const toListItem = (label: string, index: number) => ({
    id: `item-${index}-${Math.random().toString(36).substring(2, 7)}`,
    label,
    value: label.toLowerCase().replace(/\s+/g, "_"),
  });

  return {
    recipe_title: recipe.title ?? "",
    recipe_description: recipe.description ?? "",
    recipe_preparationHours: hours,
    recipe_preparationMinutes: minutes || "0",
    recipe_preparationTime: recipe.cookTime ?? "",
    recipe_servings: recipe.quantity ?? "",
    recipe_category: recipe.category ?? "",
    recipe_difficulty: recipe.difficulty ?? "",
    recipe_ingredients: (recipe.steps?.ingredients ?? []).map(toListItem),
    recipe_instructions: (recipe.steps?.instructions ?? []).map(toListItem),
    recipe_cookingNotes: (recipe.steps?.cookingNotes ?? []).map(toListItem),
    recipe_images: (recipe.images ?? []).map((url, i) => ({
      id: `existing-img-${i}`,
      file: null,
      preview: url,
      name: url.split("/").pop() ?? `imagem-${i + 1}`,
    })),
    new_recipe_ingredient_text: "",
    new_recipe_instruction_text: "",
    new_recipe_cookingNote_text: "",
  };
};

export const transformFormToApiPayload = (
  formData: NewRecipeFormValues,
  userId: number,
): { data: CreateRecipeFormData; images: File[] } => {
  const timeStr = formatPreparationTime(
    formData.recipe_preparationHours ?? "0",
    formData.recipe_preparationMinutes,
  );

  const data: CreateRecipeFormData = {
    userId,
    title: formData.recipe_title,
    description: formData.recipe_description,
    quantity: formData.recipe_servings,
    cookTime: timeStr,
    category: formData.recipe_category.toUpperCase(),
    difficulty: formData.recipe_difficulty.toUpperCase(),
    steps: {
      ingredients: formData.recipe_ingredients.map((item) => item.label),
      instructions: formData.recipe_instructions.map((item) => item.label),
      cookingNotes: (formData.recipe_cookingNotes ?? []).map(
        (item) => item.label,
      ),
    },
  };

  const images = formData.recipe_images
    .filter((img) => img.file !== null)
    .map((img) => img.file as File);

  return { data, images };
};
