import FluctuantTip from "@/components/new-recipe/FluctuantTip";
import NewRecipeForm from "@/components/new-recipe/NewRecipeForm";
import Header from "@/components/recipes/details/Header";
import Layout from "@/components/ui/Layout";

export default function page() {
  return (
    <Layout.Default className="overflow-y-auto style-scrollbar">
      <div className="px-4 py-8 space-y-8 relative">
        <FluctuantTip />
        <Header title="Nova receita" />

        <NewRecipeForm />
      </div>
    </Layout.Default>
  );
}
