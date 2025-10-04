import Grid from "../ui/Layout/Helpers/Grid";
import RecipeCard from "./Cards/RecipeCard";
import type { RecipeGridProps } from "./types";
import { recipes } from "./utils";

export function RecipeGrid({ recipes: customRecipes }: RecipeGridProps) {
  const displayRecipes = customRecipes || recipes;

  return (
    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-4">
      {displayRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
}
