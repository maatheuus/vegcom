import type { Recipe } from "../api/types";
import { categories } from "../components/utils";

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterRecipes(
  recipes: Recipe[],
  query?: string,
  category?: string,
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

  if (category) {
    const normalizedCategory = normalizeText(category);

    filtered = filtered.filter((recipe) => {
      if (
        categories["Tipo de Refeição"]
          .map(normalizeText)
          .includes(normalizedCategory)
      ) {
        if (
          recipe.category &&
          normalizeText(recipe.category) === normalizedCategory
        )
          return true;

        if (
          recipe.mealType &&
          normalizeText(recipe.mealType) === normalizedCategory
        )
          return true;

        return false;
      }

      if (normalizedCategory.includes("rapida")) {
        const mins = parseInt(recipe.cookTime || "0", 10);
        return mins > 0 && mins <= 30;
      }

      if (normalizedCategory.includes("elaborada")) {
        const mins = parseInt(recipe.cookTime || "0", 10);
        return mins > 30;
      }

      if (
        categories["Destaques da Comunidade"]
          .map(normalizeText)
          .includes(normalizedCategory)
      ) {
        if (normalizedCategory.includes("melhor avaliada")) {
          return (recipe.rating || 0) >= 4.5;
        }
        if (normalizedCategory.includes("popular")) {
          return (recipe.views || 0) > 1000;
        }
      }

      return (
        recipe.category && normalizeText(recipe.category) === normalizedCategory
      );
    });
  }

  return filtered;
}

export function sortRecipes(recipes: Recipe[], sortOption?: string): Recipe[] {
  const sorted = [...recipes];

  if (!sortOption) return sorted;
  const normalizedSort = normalizeText(sortOption);

  if (
    normalizedSort.includes("melhor avaliada") ||
    normalizedSort === "rating"
  ) {
    sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (normalizedSort.includes("popular") || normalizedSort === "views") {
    sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (
    normalizedSort.includes("novidade") ||
    normalizedSort === "newest"
  ) {
    sorted.sort((a, b) => b.id - a.id);
  }

  return sorted;
}
