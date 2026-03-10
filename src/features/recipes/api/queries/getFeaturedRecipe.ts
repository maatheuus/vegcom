import type { Recipe } from "@/entities/recipe/types";
import { api } from "@/shared/api/axios/axiosInstance";

interface GetFeaturedRecipeResponse {
  data: Recipe;
}

export interface GetAvailableFiltersResponse {
  data: {
    most_viewed_week: Recipe | null;
    most_viewed_month: Recipe | null;
    best_rated_week: Recipe | null;
    best_rated_month: Recipe | null;
  };
}

export const getFeaturedRecipeClient = async (filter: string) => {
  const response = await api.get<GetFeaturedRecipeResponse>(
    `/recipes/featured`,
    {
      params: { filter },
    },
  );
  return response.data;
};

export const getAvailableFiltersClient = async () => {
  const response = await api.get<GetAvailableFiltersResponse>(
    `/recipes/available-filters`,
  );
  return response.data;
};
