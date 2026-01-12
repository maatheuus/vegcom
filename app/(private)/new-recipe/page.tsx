import NewRecipeForm from "@/features/new-recipe/components/NewRecipeForm";
import Header from "@/features/recipe-details/Header";
import Layout from "@/shared/ui/Layout";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar overflow-y-auto">
      <section className="relative space-y-8 overflow-hidden">
        <Header title="Nova receita" />

        <NewRecipeForm />
      </section>
    </Layout.Default>
  );
}
