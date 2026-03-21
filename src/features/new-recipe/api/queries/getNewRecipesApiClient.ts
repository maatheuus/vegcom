import { useMutation, useQueryClient } from "@tanstack/react-query";

import { newRecipeApi, type CreateRecipeFormData } from "../recipesApi";

export const newRecipeKeys = {
  all: ["new-recipe"] as const,
  create: () => [...newRecipeKeys.all, "create"] as const,
};

interface CreateRecipeParams {
  data: CreateRecipeFormData;
  images: File[];
}

export const useCreateNewRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, images }: CreateRecipeParams) =>
      newRecipeApi.createRecipe(data, images),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newRecipeKeys.create(),
      });
    },
    onError: (error) => {
      console.error("Erro ao criar receita:", error);
    },
  });
};
