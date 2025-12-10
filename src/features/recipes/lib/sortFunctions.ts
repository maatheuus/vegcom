import type { Recipe } from "../components/types";

/**
 * Sorts recipes by rating in descending order (highest first).
 *
 * @param {Recipe} a - The first recipe.
 * @param {Recipe} b - The second recipe.
 * @returns {number} A negative number if a > b, positive if b > a, or 0.
 */
export const sortByRating = (a: Recipe, b: Recipe): number => {
  return (b.rating || 0) - (a.rating || 0);
};

/**
 * Sorts recipes by number of views in descending order (most viewed first).
 *
 * @param {Recipe} a - The first recipe.
 * @param {Recipe} b - The second recipe.
 * @returns {number} A negative number if a > b, positive if b > a, or 0.
 */
export const sortByViews = (a: Recipe, b: Recipe): number => {
  return (b.views || 0) - (a.views || 0);
};

/**
 * Sorts recipes by title in ascending alphabetical order (A-Z).
 *
 * @param {Recipe} a - The first recipe.
 * @param {Recipe} b - The second recipe.
 * @returns {number} A negative number if a < b, positive if b < a, or 0.
 */
export const sortByTitle = (a: Recipe, b: Recipe): number => {
  return a.title.localeCompare(b.title);
};

/**
 * Sorts recipes by preparation time in ascending order (shortest first).
 * Note: Assumes `prepTime` is a string like "15 mins" or similar.
 *
 * @param {Recipe} a - The first recipe.
 * @param {Recipe} b - The second recipe.
 * @returns {number} A negative number if a < b, positive if b < a, or 0.
 */
export const sortByPrepTime = (a: Recipe, b: Recipe): number => {
  const getMinutes = (time?: string) => {
    if (!time) return 0;
    const match = time.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return getMinutes(a.prepTime) - getMinutes(b.prepTime);
};
