/**
 * Recipes feature types
 */

export * from "@/entities/recipe";

export interface CreateRecipeData {
  title: string;
  description?: string;
  imageUrl?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
}

export interface UpdateRecipeData extends Partial<CreateRecipeData> {
  id: string;
}
