import ContentRecipe from "@/features/recipes/components/details/ContentRecipe";
import Header from "@/features/recipes/components/details/Header";
import Layout from "@/shared/ui/Layout";

export default async function page() {
  return (
    <Layout.Default className="style-scrollbar h-auto">
      <div className="mx-auto space-y-6 py-8 md:space-y-8">
        <Header
          isRecipePage
          savedCount={2}
          isSaved={false}
          authorName="Jorge"
          commentsCount={4}
          rating={4.5}
          timeAgo="2 horas"
          title="Salada mista com carne"
        />
        <ContentRecipe />
      </div>
    </Layout.Default>
  );
}
