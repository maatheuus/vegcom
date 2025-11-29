import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import { RecipeHero } from "@/features/recipes/components/RecipeHero";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Suspense } from "react";
import { recipes } from "../utils";
import RecipeContent from "./RecipeContent";

export const ITEMS_PER_PAGE = 8;

export default function RecipeParent() {
  // featured recipe need to be the most viewed and rated
  return (
    <Col as="section" className="gap-y-12">
      <RecipeHero hightlightedRecipe={recipes[0]} />
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
