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
 * Sort recipes by creation date (newest first)
 */
export const sortByCreatedAt = (a: Recipe, b: Recipe): number => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

export const cookTimeToMinutes = (time?: string | number): number => {
  if (!time) return 0;
  const str = time.toString();
  const hMatch = str.match(/(\d+)\s*h/);
  const mMatch = str.match(/(\d+)\s*min(uto)?s?/i);
  const hours = hMatch ? parseInt(hMatch[1]) : 0;
  const minutes = mMatch ? parseInt(mMatch[1]) : 0;
  if (hours === 0 && minutes === 0) {
    const fallback = str.match(/(\d+)/);
    return fallback ? parseInt(fallback[1]) : 0;
  }
  return hours * 60 + minutes;
};

/**
 * Sort recipes by preparation time (shortest first)
 */
export const sortByPrepTime = (a: Recipe, b: Recipe): number => {
  return cookTimeToMinutes(a.cookTime) - cookTimeToMinutes(b.cookTime);
};
