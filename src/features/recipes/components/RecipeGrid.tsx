import Grid from "@/shared/ui/Layout/Helpers/Grid";
import type { RecipeGridProps } from "../types";
import RecipeCard from "./Cards/RecipeCard";

interface Props {
  recipes: RecipeGridProps["recipes"];
  recipesLenght?: number;
}

export const getColumnsCount = (length?: number) => {
  if (!length) return "1fr";
  if (length === 1) return "1fr";
  if (length === 2) return "repeat(2, minmax(0, 1fr))";
  if (length === 3) return "repeat(3, minmax(0, 1fr))";
  return "repeat(4, minmax(0, 1fr))";
};

export function RecipeGrid({ recipes, recipesLenght }: Props) {
  return (
    <Grid
      className="grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
      style={{
        gridTemplateColumns: getColumnsCount(recipesLenght),
      }}
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
}
