import { getRecipes } from "@/features/recipes/api/queries/getRecipesApiServer";
import { Categories } from "@/features/recipes/components/Categories";
import { ClearFiltersButton } from "@/features/recipes/components/ClearFiltersButton";
import Header from "@/features/recipes/components/details/Header";
import HeaderComponent from "@/features/recipes/components/HeaderComponent";
import RecipeParent from "@/features/recipes/components/RecipeParent";
import { SearchBar } from "@/features/recipes/components/SearchBar";
import Layout from "@/shared/ui/Layout";
import Row from "@/shared/ui/Layout/Helpers/Row";

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
  const { data } = await getRecipes();

  let recipes = filterRecipes(data, params.q, params.category);
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

        <RecipeParent recipes={recipes} />
      </section>
    </Layout.Default>
  );
}
