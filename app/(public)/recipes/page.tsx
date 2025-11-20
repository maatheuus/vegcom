import { Categories } from "@/features/recipes/components/Categories";
import Header from "@/features/recipes/components/details/Header";
import HeaderComponent from "@/features/recipes/components/HeaderComponent";
import RecipeParent from "@/features/recipes/components/RecipeParent";
import { SearchBar } from "@/features/recipes/components/SearchBar";
import Layout from "@/shared/ui/Layout";
import Row from "@/shared/ui/Layout/Helpers/Row";

export default function Page() {
  return (
    <Layout.Default className="style-scrollbar h-auto">
      <section className="container mx-auto space-y-12 px-4">
        <Row className="items-center justify-between">
          <HeaderComponent>
            <Header title="Receitas" className="border-0 p-0" />

            <Row className="hidden gap-4 md:flex">
              <SearchBar />
              <Categories />
            </Row>
          </HeaderComponent>
        </Row>

        <RecipeParent />
      </section>
    </Layout.Default>
  );
}
