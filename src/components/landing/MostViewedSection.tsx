import { getRecipes } from "@/features/recipes/api/recipesApi";
import type { Recipe } from "@/features/recipes/components/types";
import { MostViewedClient } from "./MostViewedClient";

export async function MostViewedSection() {
  const recipes = await getRecipes();
  const mostViewed = recipes
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  const mappedRecipes: Recipe[] = mostViewed.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.imageUrl,
    rating: recipe.rating,
    category: "Vegetarian",
    prepTime: recipe.prepTime ? `${recipe.prepTime} min` : undefined,
    servings: recipe.servings,
    description: recipe.description,
    views: recipe.views,
  }));

  return <MostViewedClient recipes={mappedRecipes} />;
}
