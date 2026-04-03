import type { Recipe } from "@/entities/recipe";

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseCookTimeMinutes(cookTime: string): number {
  const hoursMatch = cookTime.match(/(\d+)\s*h/i);
  const minsMatch = cookTime.match(/(\d+)\s*min/i);
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const mins = minsMatch ? parseInt(minsMatch[1]) : 0;
  return hours * 60 + mins;
}

export function filterRecipes(
  recipes: Recipe[],
  query?: string,
  prepTime?: string,
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

  if (prepTime) {
    const normalized = normalizeText(prepTime);
    if (normalized.includes("rapida")) {
      filtered = filtered.filter(
        (recipe) => parseCookTimeMinutes(recipe.cookTime) <= 30,
      );
    } else if (normalized.includes("elaborada")) {
      filtered = filtered.filter(
        (recipe) => parseCookTimeMinutes(recipe.cookTime) > 30,
      );
    }
  }

  return filtered;
}

export function sortRecipes(recipes: Recipe[], sortOption?: string): Recipe[] {
  const sorted = [...recipes];
  if (!sortOption) return sorted;

  switch (sortOption) {
    case "averageRating":
      return sorted.sort(
        (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
      );
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
