import { type CreateRecipeFormData } from "@/features/new-recipe/api/recipesApi";
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

export const formatPreparationTime = (hours: string, minutes: string): string => {
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  if (h > 0 && m > 0) return `${h}h ${m}min`;
  if (h > 0) return `${h} hora${h > 1 ? "s" : ""}`;
  if (m > 0) return `${m} minuto${m > 1 ? "s" : ""}`;
  return "—";
};


export type NewRecipeFormValues = z.infer<typeof newRecipeFormSchema>;
export type NewRecipeForm = UseFormReturn<NewRecipeFormValues>;

export const transformFormToApiPayload = (
  formData: NewRecipeFormValues,
): { data: CreateRecipeFormData; images: File[] } => {
  const timeStr = formatPreparationTime(
    formData.recipe_preparationHours ?? "0",
    formData.recipe_preparationMinutes,
  );

  const data: CreateRecipeFormData = {
    title: formData.recipe_title,
    description: formData.recipe_description,
    timeForPreparation: timeStr,
    quantity: formData.recipe_servings,
    cookTime: timeStr,
    category: formData.recipe_category,
    difficulty: formData.recipe_difficulty,
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
