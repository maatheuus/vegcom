import { getRecipes } from "@/features/recipes/api/queries/getRecipesApiServer";
import { MostViewedClient } from "./MostViewedClient";

export async function MostViewedSection() {
  const { data: recipes } = await getRecipes();

  const mostViewed = recipes
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  return <MostViewedClient recipes={mostViewed} />;
}
