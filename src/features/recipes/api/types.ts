import type { Recipe } from "@/entities/recipe/types";

export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  DESSERT = "DESSERT",
  SNACKS = "SNACKS",
  GENERAL = "GENERAL",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum PrepTimeCategory {
  QUICK = "QUICK",
  ELABORATE = "ELABORATE",
}

export enum ReviewStatus {
  IN_REVIEW = "IN_REVIEW",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
}

export interface RecipeSteps {
  ingredients: string[];
  instructions: string[];
  cookingNotes: string[];
}

export interface RecipeUser {
  id: number;
  name: string;
  email: string;
}

export interface RecipeComment {
  id: number;
  userId: number;
  recipeId: number;
  content: string;
  createdAt: string;
  user: RecipeUser;
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface DetailedRecipe extends Recipe {
  user: RecipeUser;
  comments: RecipeComment[];
  averageRating: number;
  totalComments: number;
}

export interface CreateRecipePayload {
  userId: number;
  title: string;
  slug?: string;
  description: string;
  timeForPreparation: string;
  cookTime: string;
  quantity: string;
  category: string;
  difficulty: string;
  rating?: number;
  images: string[];
  steps: RecipeSteps;
  mealType?: MealType;
}

export interface UpdateRecipePayload extends Partial<CreateRecipePayload> {
  userId: number;
}

export interface CreateRecipeResponse {
  success: boolean;
  data: {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    difficulty: string;
    images: string[];
    steps: RecipeSteps;
    createdAt: string;
    reviewStatus: ReviewStatus;
  };
}
export interface GetRecipesResponse {
  success: boolean;
  data: Recipe[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
export interface GetRecipeByIdResponse {
  success: boolean;
  data: DetailedRecipe;
}
export type GetRecipeBySlugResponse = GetRecipeByIdResponse;
export interface FavoriteRecipeResponse {
  saved: boolean;
}

export interface RecipeFilterDto {
  mealType?: MealType;
  prepTimeCategory?: PrepTimeCategory;
  sort?: "popular" | "rated" | "newest";
}

export interface GetRecipesByIdsResponse {
  success: boolean;
  data: DetailedRecipe[];
}

