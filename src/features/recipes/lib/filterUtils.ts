import type { Recipe } from "@/entities/recipe";
import { CATEGORY_TO_API } from "../components/utils";

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterRecipes(
  recipes: Recipe[],
  query?: string,
  mealType?: string,
  prepTime?: string,
  highlight?: string,
): Recipe[] {
  let filtered = [...recipes];

  if (query) {
    const normalizedQuery = normalizeText(query);
    filtered = filtered.filter((recipe) => {
      const matchTitle = normalizeText(recipe.title).includes(normalizedQuery);
      const matchDesc = normalizeText(recipe.description).includes(
        normalizedQuery,
      );
      return matchTitle || matchDesc;
    });
  }

  if (mealType) {
    const normalized = normalizeText(mealType);
    const apiValues = CATEGORY_TO_API[normalized];
    if (apiValues) {
      filtered = filtered.filter(
        (recipe) =>
          (recipe.category && apiValues.includes(recipe.category)) ||
          (recipe.mealType && apiValues.includes(recipe.mealType)),
      );
    }
  }

  if (prepTime) {
    const normalized = normalizeText(prepTime);
    if (normalized.includes("rapida")) {
      filtered = filtered.filter(
        (recipe) => recipe.prepTimeCategory === "QUICK",
      );
    } else if (normalized.includes("elaborada")) {
      filtered = filtered.filter(
        (recipe) => recipe.prepTimeCategory === "ELABORATE",
      );
    }
  }

  if (highlight) {
    const normalized = normalizeText(highlight);
    if (normalized.includes("popular")) {
      filtered = filtered.filter((recipe) => (recipe.views || 0) > 1000);
    } else if (normalized.includes("melhor avaliada")) {
      filtered = filtered.filter((recipe) => (recipe.rating || 0) >= 4.5);
    } else if (normalized.includes("novidade")) {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      filtered = filtered.filter((recipe) =>
        recipe.createdAt
          ? new Date(recipe.createdAt).getTime() >= sevenDaysAgo
          : false,
      );
    }
  }

  return filtered;
}

export function sortRecipes(recipes: Recipe[], sortOption?: string): Recipe[] {
  const sorted = [...recipes];
  if (!sortOption) return sorted;

  switch (sortOption) {
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "views":
      return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    case "recent":
      return sorted.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    case "old":
      return sorted.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateA - dateB;
      });
    default:
      return sorted;
  }
}
