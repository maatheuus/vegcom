/**
 * Recipe entity types
 */

import type {
  MealType,
  PrepTimeCategory,
  RecipeSteps,
} from "@/features/recipes/api/types";
import type { StaticImageData } from "next/image";

export interface Recipe {
  id: number;
  userId: number;
  title: string;
  slug: string;
  description: string;
  cookTime: string;
  prepTimeCategory?: PrepTimeCategory;
  quantity: string;
  category: string;
  difficulty: string;
  images: string[];
  steps: RecipeSteps;
  mealType?: MealType;
  isPublished: boolean;
  views: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeCard {
  id: string;
  title: string;
  imageUrl: string | StaticImageData;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating?: number;
  views?: number;
  isFavorite?: boolean;
}

export interface RecipeDetail extends Recipe {
  commentsCount?: number;
  favoritesCount?: number;
}
