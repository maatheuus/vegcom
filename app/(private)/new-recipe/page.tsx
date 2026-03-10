import NewRecipeForm from "@/features/new-recipe/components/NewRecipeForm";
import Header from "@/features/recipe-details/Header";
import Layout from "@/shared/ui/Layout";
import { Suspense } from "react";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar overflow-y-auto">
      <section className="relative space-y-8 overflow-hidden">
        <Header title="Nova receita" />

        <Suspense fallback={<></>}>
          <NewRecipeForm />
        </Suspense>
      </section>
    </Layout.Default>
  );
}
