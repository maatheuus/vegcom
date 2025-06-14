import ContentRecipe from "@/components/recipes/details/ContentRecipe";
import Header from "@/components/recipes/details/Header";
import Layout from "@/components/ui/Layout";

export default async function page({}: { params: { slug: string } }) {
  return (
    <Layout.Default className="overflow-y-auto style-scrollbar">
      <div className="max-w-[75rem] mx-auto px-4 py-8 space-y-8">
        <Header
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
