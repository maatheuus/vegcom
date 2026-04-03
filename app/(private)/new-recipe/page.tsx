import NewRecipeForm from "@/features/new-recipe/components/NewRecipeForm";
import RecipeDetailsHeader from "@/features/recipe-details/RecipeDetailsHeader";
import Layout from "@/shared/ui/Layout";
import { Suspense } from "react";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar overflow-hidden">
      <section className="relative space-y-8 overflow-hidden">
        <RecipeDetailsHeader title="Nova receita" />

        <Suspense fallback={<></>}>
          <NewRecipeForm />
        </Suspense>
      </section>
    </Layout.Default>
  );
}
