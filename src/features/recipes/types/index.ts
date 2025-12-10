/**
 * Recipes feature types
 */

export * from "@/entities/recipe";

/**
 * Data required to create a new recipe.
 */
export interface CreateRecipeData {
  /** The title of the recipe. */
  title: string;
  /** A short description of the recipe. */
  description?: string;
  /** The URL of the recipe image. */
  imageUrl?: string;
  /** List of ingredients required. */
  ingredients?: string[];
  /** Step-by-step cooking instructions. */
  instructions?: string[];
  /** Preparation time in minutes. */
  prepTime?: number;
  /** Cooking time in minutes. */
  cookTime?: number;
  /** Number of servings the recipe yields. */
  servings?: number;
  /** Difficulty level of the recipe. */
  difficulty?: "easy" | "medium" | "hard";
  /** Tags for categorization. */
  tags?: string[];
}

/**
 * Data required to update an existing recipe.
 * Includes the ID and any fields from CreateRecipeData that should be changed.
 */
export interface UpdateRecipeData extends Partial<CreateRecipeData> {
  /** The ID of the recipe to update. */
  id: string;
}
