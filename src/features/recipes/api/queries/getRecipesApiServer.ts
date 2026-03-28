"use server";
import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import type {
  CreateRecipePayload,
  CreateRecipeResponse,
  FavoriteRecipeResponse,
  GetRecipeByIdResponse,
  GetRecipeBySlugResponse,
  GetRecipesResponse,
  UpdateRecipePayload,
} from "../types";

interface GetRecipesParams {
  sort?: "popular" | "rated" | "newest";
  mealType?: string;
}

export const getRecipes = async (params?: GetRecipesParams) => {
  const query = new URLSearchParams();
  if (params?.sort) query.set("sort", params.sort);
  if (params?.mealType) query.set("mealType", params.mealType);
  const qs = query.toString();

  return serverFetch<GetRecipesResponse>(
    `/recipes/list${qs ? `?${qs}` : ""}`,
    {
      method: "GET",
      next: { tags: ["recipes"] },
    },
  );
};

export const getRecipeById = async (id: number) => {
  return serverFetch<GetRecipeByIdResponse>(`/recipes/get/${id}`, {
    method: "GET",
  });
};

export const getRecipeBySlug = async (slug: string) => {
  return serverFetch<GetRecipeBySlugResponse>(`/recipes/get/slug/${slug}`, {
    method: "GET",
  });
};

export const createRecipe = async (data: CreateRecipePayload) => {
  revalidatePath("/recipes/list");
  return serverFetch<CreateRecipeResponse>("/recipes/create", {
    method: "POST",
    body: data,
  });
};

export const updateRecipe = async (id: number, data: UpdateRecipePayload) => {
  revalidatePath("/recipes/list");
  return serverFetch<CreateRecipeResponse>(`/recipes/update/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const deleteRecipe = async (id: number) => {
  revalidatePath("/recipes/list");
  return serverFetch<CreateRecipeResponse>(`/recipes/delete/${id}`, {
    method: "DELETE",
  });
};

export const favoriteRecipe = async (id: number) => {
  revalidatePath("/recipes/list");
  return serverFetch<FavoriteRecipeResponse>(`/recipes/${id}/favorite`, {
    method: "PATCH",
  });
};

export const getFeaturedRecipe = async (filter: string) => {
  return serverFetch<GetRecipeByIdResponse>(
    `/recipes/featured?filter=${filter}`,
    {
      method: "GET",
      next: { tags: ["featured-recipe"] },
    },
  );
};
