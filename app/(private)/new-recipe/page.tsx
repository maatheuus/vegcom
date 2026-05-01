import NewRecipeForm from "@/features/new-recipe/components/NewRecipeForm";
import RecipeDetailsHeader from "@/features/recipe-details/RecipeDetailsHeader";
import Layout from "@/shared/ui/Layout";
import { Suspense } from "react";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar h-auto">
      <section className="relative space-y-2 overflow-hidden md:space-y-8">
        <RecipeDetailsHeader title="Nova receita" />

        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <NewRecipeForm />
        </Suspense>
      </section>
    </Layout.Default>
  );
}
