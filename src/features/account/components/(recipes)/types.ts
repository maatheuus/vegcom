import type { RecipeCard } from "@/entities/recipe";

export interface DataRecipeCardAccount extends RecipeCard {
  description?: string;
  recipeType?: string;
  updated_at?: string;
}
