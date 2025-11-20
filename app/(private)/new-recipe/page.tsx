import Header from "@/features/recipes/components/details/Header";
import NewRecipeForm from "@/features/recipes/components/new-recipe/NewRecipeForm";
import Layout from "@/shared/ui/Layout";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar overflow-y-auto">
      <section className="relative container mx-auto space-y-8 px-4">
        <Header title="Nova receita" />

        <NewRecipeForm />
      </section>
    </Layout.Default>
  );
}
