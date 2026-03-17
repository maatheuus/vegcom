import Grid from "@/shared/ui/Layout/Helpers/Grid";
import type { RecipeGridProps } from "../types";
import RecipeCard from "./Cards/RecipeCard";

interface Props {
  recipes: RecipeGridProps["recipes"];
}

export function RecipeGrid({ recipes }: Props) {
  return (
    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} className="max-w-full" />
      ))}
    </Grid>
  );
}
