import { api } from "@/shared/api/axios/axiosInstance";
import { compressImages } from "@shared/lib/compressImage";
import type { CreateRecipeResponse } from "../../recipes/api/types";

export interface CreateRecipeFormData {
  title: string;
  description: string;
  cookTime: string;
  quantity: string;
  category: string;
  difficulty: string;
  steps: {
    ingredients: string[];
    instructions: string[];
    cookingNotes?: string[];
  };
}

const newRecipeApi = {
  createRecipe: async (data: CreateRecipeFormData, images: File[]) => {
    const compressed = await compressImages(images);
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    compressed.forEach((image) => {
      formData.append("images", image);
    });

    const { data: responseData } = await api.post<CreateRecipeResponse>(
      "/recipes/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return responseData;
  },
};
export { newRecipeApi };
