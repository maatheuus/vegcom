import type { Recipe } from "../types";

/**
 * Sort recipes by rating (highest first)
 */
export const sortByRating = (a: Recipe, b: Recipe): number => {
  return (b.averageRating || 0) - (a.averageRating || 0);
};

/**
 * Sort recipes by views (most viewed first)
 */
export const sortByViews = (a: Recipe, b: Recipe): number => {
  return (b.views || 0) - (a.views || 0);
};

/**
 * Sort recipes by title alphabetically
 */
export const sortByTitle = (a: Recipe, b: Recipe): number => {
  return a.title.localeCompare(b.title);
};

/**
 * Sort recipes by preparation time (shortest first)
 */
export const sortByPrepTime = (a: Recipe, b: Recipe): number => {
  const getMinutes = (time?: string | number) => {
    if (!time) return 0;
    const match = time.toString().match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return getMinutes(a.cookTime) - getMinutes(b.cookTime);
};
