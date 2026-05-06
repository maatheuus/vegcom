import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateRecipePayload,
  CreateRecipeResponse,
  FavoriteRecipeResponse,
  GetRecipeBySlugResponse,
  GetRecipesByIdsResponse,
  GetRecipesResponse,
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
  updateRecipe: async (id: number, data: UpdateRecipePayload, newImages?: File[]) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    newImages?.forEach((file) => formData.append("images", file));
    const { data: responseData } = await api.patch<CreateRecipeResponse>(
      `/recipes/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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

  getMyRecipes: async () => {
    const { data } = await api.get<GetRecipesResponse>("/recipes/my");
    return data;
  },
};
export { recipeApi };
