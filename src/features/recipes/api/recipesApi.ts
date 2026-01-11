import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateRecipePayload,
  CreateRecipeResponse,
  FavoriteRecipeResponse,
  GetRecipeByIdResponse,
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
  getRecipeById: async (id: number) => {
    const { data } = await api.get<GetRecipeByIdResponse>(`/recipes/get/${id}`);
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
};
export { recipeApi };
