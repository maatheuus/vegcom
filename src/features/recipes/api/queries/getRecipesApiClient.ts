import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recipeApi } from "../recipesApi";
import type { UpdateRecipePayload } from "../types";

export const recipeKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  myRecipes: () => [...recipeKeys.all, "my"] as const,
  detailBySlug: (slug: string) =>
    [...recipeKeys.all, "detail", "slug", slug] as const,
};

export const useGetRecipes = () => {
  return useQuery({
    queryKey: recipeKeys.lists(),
    queryFn: recipeApi.getRecipes,
  });
};

export const useGetMyRecipes = () => {
  return useQuery({
    queryKey: recipeKeys.myRecipes(),
    queryFn: recipeApi.getMyRecipes,
    enabled: !!getAccessToken(),
  });
};

export const useGetRecipeBySlug = (slug: string) => {
  return useQuery({
    queryKey: recipeKeys.detailBySlug(slug),
    queryFn: () => recipeApi.getRecipeBySlug(slug),
    enabled: !!slug,
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRecipePayload }) =>
      recipeApi.updateRecipe(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
    onError: (error) => {
      console.error("Erro ao atualizar receita:", error);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recipeApi.deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
    onError: (error) => {
      console.error("Erro ao deletar receita:", error);
    },
  });
};

export const useFavoriteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recipeApi.favoriteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recipeKeys.all });
    },
    onError: (error) => {
      console.error("Erro ao favoritar receita:", error);
    },
  });
};
