import BackButton from "@/features/recipe-details/BackButton";
import ContentRecipe from "@/features/recipe-details/ContentRecipe";
import Header from "@/features/recipe-details/Header";
import { ViewTracker } from "@/features/recipe-details/ViewTracker";
import {
  getRecipeById,
  getRecipeBySlug,
} from "@/features/recipes/api/queries/getRecipesApiServer";
import Layout from "@/shared/ui/Layout";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound, permanentRedirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  const { slug } = await params;

  const isNumericId = /^\d+$/.test(slug);

  let recipe;

  if (isNumericId) {
    try {
      const recipeId = parseInt(slug, 10);
      const response = await getRecipeById(recipeId);
      recipe = response.data;

      permanentRedirect(`/recipes/${recipe.slug}`);
    } catch (error) {
      console.log(error);
      notFound();
    }
  } else {
    try {
      const response = await getRecipeBySlug(slug);
      recipe = response.data;
    } catch (error) {
      console.log(error);
      notFound();
    }
  }

  const timeAgo = formatDistanceToNow(new Date(recipe.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Layout.Default className="style-scrollbar h-auto">
      <ViewTracker recipeId={recipe.id} />
      <div className="mx-auto space-y-6 md:space-y-8">
        <BackButton />
        <Header
          isRecipePage
          views={recipe.views || 0}
          isSaved={false}
          authorName={recipe.user.name}
          commentsCount={recipe.totalComments || 0}
          rating={recipe.averageRating || 0}
          timeAgo={timeAgo}
          title={recipe.title}
        />
        <ContentRecipe recipe={recipe} />
      </div>
    </Layout.Default>
  );
}
