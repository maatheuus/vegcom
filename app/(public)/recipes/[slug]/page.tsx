import ContentRecipe from "@/components/recipes/details/ContentRecipe";
import Header from "@/components/recipes/details/Header";
import Layout from "@/components/ui/Layout";

export default async function page() {
  return (
    <Layout.Default className="overflow-y-auto style-scrollbar">
      <div className="mx-auto px-4 py-8 space-y-8">
        <Header
          isRecipePage
          savedCount={2}
          isSaved={false}
          authorName="Jorge"
          commentsCount={4}
          rating={4}
          timeAgo="2 horas"
          title="Salada mista com carne"
        />
        <ContentRecipe />
      </div>
    </Layout.Default>
  );
}
