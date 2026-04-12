import { type CreateRecipeFormData } from "@/features/new-recipe/api/recipesApi";
import { newRecipeFormSchema } from "@/features/recipes/components/utils";
import { type Toast, type ToasterToast } from "@/shared/hooks/use-toast";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const TIPS_BY_STEP: Record<number, string[]> = {
  1: [
    "Escolha um nome claro e descritivo para a receita.",
    "Adicione uma descrição curta e apetitosa.",
    "Defina o tempo de preparo para ajudar no planejamento.",
  ],
  2: [
    "Liste todos os ingredientes necessários.",
    "Especifique as quantidades corretamente.",
    "Se possível, indique marcas ou tipos específicos de ingredientes.",
  ],
  3: [
    "Escreva instruções simples e passo a passo.",
    "Seja claro sobre tempos e temperaturas.",
  ],
  4: [
    "Use notas de preparo para compartilhar truques ou sugestões extras.",
    "Mencione substituições possíveis para ingredientes.",
  ],
  5: [
    "A primeira foto será a de destaque da receita.",
    "Arraste as imagens para reorganizá-las.",
    "Adicione fotos do prato pronto.",
    "Mostre detalhes da textura.",
    "Fotos do processo também ajudam muito!",
  ],
};

export const validateStep = (
  step: number,
  values: z.infer<typeof newRecipeFormSchema>,
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  },
): boolean => {
  switch (step) {
    case 1:
      if (!values.recipe_title?.trim() || values.recipe_title?.length < 4) {
        toast({
          title: "O título precisa ter pelo menos 4 letras!",
          variant: "destructive",
        });
        return false;
      } else if (values.recipe_title?.length > 50) {
        toast({
          title: "Esse título tá meio longo demais, hein? 🤔",
          variant: "destructive",
        });
        return false;
      }

      if (!values.recipe_description?.trim()) {
        toast({
          title: "Uma boa receita merece uma descrição bacana",
          variant: "destructive",
        });
        return false;
      } else if (values.recipe_description?.length > 500) {
        toast({
          title: "Vamos manter a descrição mais objetiva 😉",
          variant: "destructive",
        });
        return false;
      }

      if (!values.recipe_preparationMinutes) {
        toast({
          title: "Quantos minutinhos?",
          variant: "destructive",
        });
        return false;
      }

      if (!values.recipe_servings) {
        toast({
          title: "Quantas pessoas vão se deliciar com essa receita?",
          variant: "destructive",
        });
        return false;
      }

      if (!values.recipe_category) {
        toast({
          title: "Por favor, selecione uma categoria",
          variant: "destructive",
        });
        return false;
      }

      if (!values.recipe_difficulty) {
        toast({
          title: "Por favor, selecione uma dificuldade",
          variant: "destructive",
        });
        return false;
      }

      return true;

    case 2:
      // Ingredients
      if (values.recipe_ingredients.length < 2) {
        toast({
          title: "Por favor, adicione no minimo dois ingredientes",
          variant: "destructive",
        });
        return false;
      }
      return true;

    case 3:
      // Instructions
      if (values.recipe_instructions.length < 2) {
        toast({
          title:
            "Por favor, adicione pelo menos duas instruções. Você precisa ensinar como fazer, né? 😅",
          variant: "destructive",
        });
        return false;
      }
      return true;

    case 5:
      // Images
      if (values.recipe_images.length === 0) {
        toast({
          title: "Adicione pelo menos uma imagem",
          variant: "destructive",
        });
        return false;
      }
      return true;

    default:
      return true;
  }
};

export type NewRecipeFormValues = z.infer<typeof newRecipeFormSchema>;
export type NewRecipeForm = UseFormReturn<NewRecipeFormValues>;

export const transformFormToApiPayload = (
  formData: NewRecipeFormValues,
): { data: CreateRecipeFormData; images: File[] } => {
  const hours = Number(formData.recipe_preparationHours) || 0;
  const minutes = Number(formData.recipe_preparationMinutes) || 0;

  const formatPreparationTime = () => {
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}min`;
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
    }
  };

  const data: CreateRecipeFormData = {
    title: formData.recipe_title,
    description: formData.recipe_description,
    timeForPreparation: formatPreparationTime(),
    quantity: formData.recipe_servings,
    cookTime: formatPreparationTime(),
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

  const images = formData.recipe_images.map((img) => img.file);

  return { data, images };
};
