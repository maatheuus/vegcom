/**
 * Recipes API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockRecipes, type Recipe } from "@/entities/recipe";
import { mockDelay, generateMockId } from "@/shared/api/mock";
import type { CreateRecipeData, UpdateRecipeData } from "../types";

/**
 * Get all recipes
 */
export const getRecipes = async (): Promise<Recipe[]> => {
  await mockDelay(800);
  return mockRecipes;
};

/**
 * Get recipe by ID
 */
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  await mockDelay(600);
  const recipe = mockRecipes.find((r) => r.id === id);
  return recipe || null;
};

/**
 * Create new recipe
 */
export const createRecipe = async (
  data: CreateRecipeData,
): Promise<Recipe> => {
  await mockDelay(1000);

  const newRecipe: Recipe = {
    id: generateMockId(),
    ...data,
    imageUrl: data.imageUrl || "",
    userId: "mock_user_id",
    user: {
      name: "Current User",
      avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
    rating: 0,
    views: 0,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newRecipe;
};

/**
 * Update recipe
 */
export const updateRecipe = async (
  data: UpdateRecipeData,
): Promise<Recipe> => {
  await mockDelay(900);

  const existingRecipe = mockRecipes.find((r) => r.id === data.id);

  if (!existingRecipe) {
    throw new Error("Recipe not found");
  }

  return {
    ...existingRecipe,
    ...data,
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Delete recipe
 */
export const deleteRecipe = async (id: string): Promise<void> => {
  await mockDelay(700);
  console.log("Deleted recipe:", id);
};

/**
 * Toggle favorite
 */
export const toggleFavorite = async (
  recipeId: string,
): Promise<{ isFavorite: boolean }> => {
  await mockDelay(500);

  const recipe = mockRecipes.find((r) => r.id === recipeId);
  const newFavoriteState = !recipe?.isFavorite;

  return { isFavorite: newFavoriteState };
};
