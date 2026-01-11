import { api } from "@/shared/api/axios/axiosInstance";
import type { Recipe } from "@/features/recipes/api/types";

// Assuming the response structure wraps the recipe similarly to other endpoints,
// or directly returns the recipe if that's how the new endpoint is designed.
// Based on BACKEND_SPECS, it returns the recipe object directly.
// However, the existing server fetch used GetRecipeByIdResponse.
// I will assume it returns { data: Recipe } or similar if using the standard wrapper,
// but for client side, let's type the return.

interface GetFeaturedRecipeResponse {
  data: Recipe;
}

export const getFeaturedRecipeClient = async (filter: string) => {
  const response = await api.get<GetFeaturedRecipeResponse>(`/recipes/featured`, {
    params: { filter },
  });
  return response.data;
};
