import type { Recipe } from "@/entities/recipe";

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

export interface RecipeGridProps {
  recipes: Recipe[];
}

export interface Comment {
  id: number;
  author: string;
  avatarUrl?: string;
  timeAgo: string;
  content: string;
  likes: number;
}
