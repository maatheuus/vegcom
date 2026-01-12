import {
  getFeaturedRecipe,
  getRecipes,
} from "@/features/recipes/api/queries/getRecipesApiServer";

import { Categories } from "@/features/recipes/components/Categories";
import { ClearFiltersButton } from "@/features/recipes/components/ClearFiltersButton";
import HeaderComponent from "@/features/recipes/components/HeaderComponent";

import RecipeParent from "@/features/recipes/components/RecipeParent";
import { SearchBar } from "@/features/recipes/components/SearchBar";
import Layout from "@/shared/ui/Layout";
import Row from "@/shared/ui/Layout/Helpers/Row";

import type { Recipe } from "@/entities/recipe";
import Header from "@/features/recipe-details/Header";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import { filterRecipes, sortRecipes } from "@/features/recipes/lib/filterUtils";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const [recipesResult, featuredResult] = await Promise.allSettled([
    getRecipes(),
    getFeaturedRecipe("most_viewed_month"),
  ]);

  let recipesData: Recipe[] = [];
  if (recipesResult.status === "fulfilled") {
    recipesData = recipesResult.value.data || [];
  } else {
    console.error("Failed to fetch recipes:", recipesResult.reason);
  }

  let featuredRecipe: DetailedRecipe | Recipe | undefined = undefined;
  if (featuredResult.status === "fulfilled") {
    featuredRecipe = featuredResult.value?.data || undefined;
  } else {
    console.warn("Failed to fetch featured recipe:", featuredResult.reason);
  }

  let recipes = filterRecipes(recipesData, params.q, params.category);
  recipes = sortRecipes(recipes, params.sort);

  return (
    <Layout.Default className="style-scrollbar h-auto">
      <section className="space-y-8 md:space-y-12">
        <Row className="items-center justify-between">
          <HeaderComponent>
            <Header title="Receitas" className="border-0 p-0" />

            <Row className="hidden items-center gap-1 md:flex">
              <Row className="gap-2">
                <SearchBar />
                <Categories />
              </Row>
              <ClearFiltersButton />
            </Row>
          </HeaderComponent>
        </Row>

        <RecipeParent recipes={recipes} featuredRecipe={featuredRecipe} />
      </section>
    </Layout.Default>
  );
}
