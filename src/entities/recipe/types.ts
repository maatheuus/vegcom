/**
 * Recipe entity types
 */

import type {
  Difficulty,
  MealType,
  PrepTimeCategory,
  RecipeSteps,
  ReviewStatus,
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
  category: MealType;
  difficulty: Difficulty;
  images: string[];
  steps: RecipeSteps;
  mealType?: MealType;
  isPublished: boolean;
  reviewStatus?: ReviewStatus;
  views: number;
  averageRating: number;
  likes: { id: number; userId: number }[];
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
