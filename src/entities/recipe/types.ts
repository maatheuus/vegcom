/**
 * Recipe entity types
 */

import type { StaticImageData } from "next/image";

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  imageUrl: string | StaticImageData;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating?: number;
  views?: number;
  isFavorite?: boolean;
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
