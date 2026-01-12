"use client";

import Grid from "@/shared/ui/Layout/Helpers/Grid";
import { useState } from "react";
import type { RecipeGridProps } from "../types";
import RecipeCard from "./Cards/RecipeCard";

interface Props {
  recipes: RecipeGridProps["recipes"];
}
export function RecipeGrid({ recipes }: Props) {
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]);

  const handleFavorite = (e: React.MouseEvent, recipeId: number) => {
    e.preventDefault();

    setFavoriteRecipes((prevFavorites) => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter((id: number) => id !== recipeId);
      }

      return [...prevFavorites, recipeId];
    });
  };

  return (
    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          favoriteRecipes={favoriteRecipes.includes(Number(recipe.id))}
          handleFavorite={(e) => handleFavorite(e, Number(recipe.id))}
        />
      ))}
    </Grid>
  );
}
