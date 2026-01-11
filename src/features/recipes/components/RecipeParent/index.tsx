import type { Recipe } from "@/features/recipes/api/types";
import RecipeEmptyState from "@/features/recipes/components/RecipeEmptyState";
import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Suspense } from "react";
import RecipeContent from "./RecipeContent";

import { RecipeHero } from "@/features/recipes/components/RecipeHero";

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
        title="Nenhuma receita encontrada"
        description="Parece que ainda não adicionamos nenhuma receita à plataforma. Volte em breve para conferir novidades!"
      />
    );
  }

  return (
    <Col as="section" className="gap-y-10 md:gap-y-12">
      {featuredRecipe && (
        <RecipeHero hightlightedRecipe={featuredRecipe} />
      )}
      <Suspense fallback={<RecipeGridSkeleton count={ITEMS_PER_PAGE} />}>
        <RecipeContent
          recipes={recipes}
          title="Mais Bem Avaliadas"
          queryKey="bestRated"
          sortBy="rating"
        />
      </Suspense>
      <Suspense fallback={<RecipeGridSkeleton count={ITEMS_PER_PAGE} />}>
        <RecipeContent
          recipes={recipes}
          title="Mais Vistas"
          queryKey="mostViewed"
          sortBy="views"
        />
      </Suspense>
    </Col>
  );
}
