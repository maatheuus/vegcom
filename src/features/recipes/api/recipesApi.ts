import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateRecipePayload,
  CreateRecipeResponse,
  FavoriteRecipeResponse,
  GetRecipeBySlugResponse,
  GetRecipesByIdsResponse,
  GetRecipesResponse,
  IncrementViewResponse,
  UpdateRecipePayload,
} from "./types";

const recipeApi = {
  createRecipe: async (data: CreateRecipePayload) => {
    const { data: responseData } = await api.post<CreateRecipeResponse>(
      "/recipes/create",
      data,
    );
    return responseData;
  },
  getRecipes: async () => {
    const { data } = await api.get<GetRecipesResponse>("/recipes/list");
    return data;
  },
  getRecipeBySlug: async (slug: string) => {
    const { data } = await api.get<GetRecipeBySlugResponse>(
      `/recipes/get/slug/${slug}`,
    );
    return data;
  },
  updateRecipe: async (id: number, data: UpdateRecipePayload) => {
    const { data: responseData } = await api.put<CreateRecipeResponse>(
      `/recipes/update/${id}`,
      data,
    );
    return responseData;
  },
  deleteRecipe: async (id: number) => {
    const { data } = await api.delete<CreateRecipeResponse>(
      `/recipes/delete/${id}`,
    );
    return data;
  },
  favoriteRecipe: async (id: number) => {
    const { data } = await api.patch<FavoriteRecipeResponse>(
      `/recipes/${id}/favorite`,
    );
    return data;
  },
  getRecipesByIds: async (ids: number[]) => {
    const { data } = await api.post<GetRecipesByIdsResponse>("/recipes/batch", {
      ids,
    });
    return data;
  },
  incrementView: async (id: number) => {
    const { data } = await api.post<IncrementViewResponse>(
      `/recipes/${id}/view`,
    );
    return data;
  },
  getMyRecipes: async () => {
    const { data } = await api.get<GetRecipesResponse>("/recipes/my");
    return data;
  },
};
export { recipeApi };
