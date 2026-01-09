import { getRecipes } from "@/features/recipes/api/queries/getRecipesApiServer";
import type { Recipe } from "@/features/recipes/api/types";
import { MostViewedClient } from "./MostViewedClient";

export async function MostViewedSection() {
  const { data: recipes } = await getRecipes();
  console.log("recipes", recipes);

  const mostViewed = recipes
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  const mappedRecipes: Recipe[] = mostViewed.map((recipe) => ({
    id: String(recipe.id),
    title: recipe.title,
    image: recipe.images[0],
    rating: recipe.rating,
    category: "Vegetarian",
    prepTime: recipe.cookTime ? `${recipe.cookTime} min` : undefined,
    servings: recipe.quantity,
    description: recipe.description,
    views: recipe.views,
  }));

  return <MostViewedClient recipes={mappedRecipes} />;
}
