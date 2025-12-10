/**
 * Recipes API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockRecipes, type Recipe } from "@/entities/recipe";
import { mockDelay, generateMockId } from "@/shared/api/mock";
import type { CreateRecipeData, UpdateRecipeData } from "../types";

/**
 * Retrieves a list of all recipes.
 *
 * @returns {Promise<Recipe[]>} A promise resolving to an array of recipes.
 */
export const getRecipes = async (): Promise<Recipe[]> => {
  await mockDelay(800);
  return mockRecipes;
};

/**
 * Retrieves a single recipe by its ID.
 *
 * @param {string} id - The unique identifier of the recipe.
 * @returns {Promise<Recipe | null>} A promise resolving to the recipe or null if not found.
 */
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  await mockDelay(600);
  const recipe = mockRecipes.find((r) => r.id === id);
  return recipe || null;
};

/**
 * Creates a new recipe.
 *
 * @param {CreateRecipeData} data - The content and metadata for the new recipe.
 * @returns {Promise<Recipe>} A promise resolving to the newly created recipe.
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
 * Updates an existing recipe.
 *
 * @param {UpdateRecipeData} data - The ID of the recipe to update and the new data.
 * @returns {Promise<Recipe>} A promise resolving to the updated recipe.
 * @throws {Error} If the recipe is not found.
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
 * Deletes a recipe.
 *
 * @param {string} id - The ID of the recipe to delete.
 * @returns {Promise<void>} A promise indicating completion.
 */
export const deleteRecipe = async (id: string): Promise<void> => {
  await mockDelay(700);
  console.log("Deleted recipe:", id);
};

/**
 * Toggles the favorite status of a recipe for the current user.
 *
 * @param {string} recipeId - The ID of the recipe to favorite/unfavorite.
 * @returns {Promise<{ isFavorite: boolean }>} A promise resolving to the new favorite state.
 */
export const toggleFavorite = async (
  recipeId: string,
): Promise<{ isFavorite: boolean }> => {
  await mockDelay(500);

  const recipe = mockRecipes.find((r) => r.id === recipeId);
  const newFavoriteState = !recipe?.isFavorite;

  return { isFavorite: newFavoriteState };
};
