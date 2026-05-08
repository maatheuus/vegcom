import RecipeEmptyState from "@/features/recipes/components/RecipeEmptyState";
import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Suspense } from "react";
import RecipeContent from "./RecipeContent";

import type { Recipe } from "@/entities/recipe";
import { RecipeHero } from "@/features/recipes/components/RecipeHero";
import { cookTimeToMinutes } from "@/features/recipes/lib/sortFunctions";

export const ITEMS_PER_PAGE = 8;

export default function RecipeParent({
  recipes,
  featuredRecipe,
}: {
  recipes: Recipe[];
  featuredRecipe?: Recipe;
}) {
  if (!recipes || recipes.length === 0) {
    return (
      <RecipeEmptyState
        title="Nenhuma receita adicionada"
        description="Seja o primeiro a adicionar uma receita à plataforma!"
      />
    );
  }

  const quickRecipes = recipes.filter((r) => cookTimeToMinutes(r.cookTime) <= 30);

  return (
    <Col as="section" className="gap-y-10 md:gap-y-12">
      {featuredRecipe && <RecipeHero hightlightedRecipe={featuredRecipe} />}
      {/* <Suspense fallback={<RecipeGridSkeleton count={ITEMS_PER_PAGE} />}>
        <RecipeContent
          recipes={recipes}
          title="Mais Bem Avaliadas"
          queryKey="bestRated"
          sortBy="averageRating"
        />
      </Suspense> */}
      <Suspense fallback={<RecipeGridSkeleton count={ITEMS_PER_PAGE} />}>
        <RecipeContent
          recipes={recipes}
          title="Mais Vistas"
          queryKey="mostViewed"
          sortBy="views"
        />
      </Suspense>
      <Suspense fallback={<RecipeGridSkeleton count={ITEMS_PER_PAGE} />}>
        <RecipeContent
          recipes={recipes}
          title="Adicionadas Recentemente"
          queryKey="recentlyAdded"
          sortBy="createdAt"
        />
      </Suspense>
      <Suspense fallback={<RecipeGridSkeleton count={ITEMS_PER_PAGE} />}>
        <RecipeContent
          recipes={quickRecipes}
          title="Receitas Rápidas"
          queryKey="quickRecipes"
          sortBy="prepTime"
        />
      </Suspense>
    </Col>
  );
}
