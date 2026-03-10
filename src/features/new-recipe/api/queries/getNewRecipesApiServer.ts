"use server";

import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import type {
  CreateRecipePayload,
  CreateRecipeResponse,
} from "../../../recipes/api/types";

export const createRecipe = async (data: CreateRecipePayload) => {
  revalidatePath("/recipes/create");
  return serverFetch<CreateRecipeResponse>("/recipes/create", {
    method: "POST",
    body: data,
  });
};
