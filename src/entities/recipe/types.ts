/**
 * Recipe entity types
 */

import type { StaticImageData } from "next/image";

/**
 * Represents a complete recipe entity.
 */
export interface Recipe {
  /** Unique identifier for the recipe. */
  id: string;
  /** Title of the recipe. */
  title: string;
  /** Short description of the recipe. */
  description?: string;
  /** URL or static import for the recipe's main image. */
  imageUrl: string | StaticImageData;
  /** List of ingredients. */
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
  /** Tags associated with the recipe (e.g., "vegan", "dessert"). */
  tags?: string[];
  /** ID of the user who created the recipe. */
  userId: string;
  /** Basic details of the author. */
  user: {
    /** The author's name. */
    name: string;
    /** The author's avatar URL. */
    avatarUrl: string;
  };
  /** Average rating of the recipe. */
  rating?: number;
  /** Number of times the recipe has been viewed. */
  views?: number;
  /** Whether the current user has favorited this recipe. */
  isFavorite?: boolean;
  /** Timestamp when the recipe was created (ISO string). */
  createdAt: string;
  /** Timestamp when the recipe was last updated (ISO string). */
  updatedAt: string;
}

/**
 * Simplified recipe structure for displaying in a list or card view.
 */
export interface RecipeCard {
  /** Unique identifier for the recipe. */
  id: string;
  /** Title of the recipe. */
  title: string;
  /** URL or static import for the recipe's main image. */
  imageUrl: string | StaticImageData;
  /** Basic details of the author. */
  user: {
    /** The author's name. */
    name: string;
    /** The author's avatar URL. */
    avatarUrl: string;
  };
  /** Average rating. */
  rating?: number;
  /** Number of views. */
  views?: number;
  /** Whether the current user has favorited this recipe. */
  isFavorite?: boolean;
}

/**
 * Detailed recipe structure extending the base Recipe with additional stats.
 */
export interface RecipeDetail extends Recipe {
  /** Total number of comments. */
  commentsCount?: number;
  /** Total number of users who favorited this recipe. */
  favoritesCount?: number;
}
