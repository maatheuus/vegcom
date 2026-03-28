import BackButton from "@/features/recipe-details/BackButton";
import ContentRecipe from "@/features/recipe-details/ContentRecipe";
import { ViewTracker } from "@/features/recipe-details/ViewTracker";
import {
  getRecipeById,
  getRecipeBySlug,
} from "@/features/recipes/api/queries/getRecipesApiServer";
import Layout from "@/shared/ui/Layout";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound, permanentRedirect } from "next/navigation";

import RecipeDetailsHeader from "@/features/recipe-details/RecipeDetailsHeader";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const isNumericId = /^\d+$/.test(slug);
  let recipe;

  try {
    if (isNumericId) {
      const response = await getRecipeById(parseInt(slug, 10));
      recipe = response.data;
    } else {
      const response = await getRecipeBySlug(slug);
      recipe = response.data;
    }
  } catch (_error) {
    console.error("Error fetching recipe metadata: ", _error);
    return { title: "Receita não encontrada" };
  }

  if (!recipe) return { title: "Receita não encontrada" };

  return {
    title: recipe.title,
    description:
      recipe.description ||
      `Veja como preparar ${recipe.title} de forma simples e deliciosa.`,
    openGraph: {
      title: `${recipe.title} | VegCom`,
      description:
        recipe.description ||
        `Aprenda a fazer ${recipe.title} na comunidade VegCom.`,
      url: `https://vegcom.life/recipes/${recipe.slug || slug}`,
      images: recipe.images?.length ? [{ url: recipe.images[0] }] : [],
    },
    alternates: {
      canonical: `/recipes/${recipe.slug || slug}`,
    },
  };
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
    } catch (_error) {
      notFound();
    }
  } else {
    try {
      const response = await getRecipeBySlug(slug);
      recipe = response.data;
    } catch (_error) {
      notFound();
    }
  }

  const timeAgo = formatDistanceToNow(new Date(recipe.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: recipe.images || [],
    author: {
      "@type": "Person",
      name: recipe?.user?.name || "Autor Desconhecido",
    },
    datePublished: recipe.createdAt,
    description: recipe.description || `Como preparar ${recipe.title}.`,
    recipeIngredient: recipe?.steps?.ingredients || [],
    recipeInstructions:
      recipe?.steps?.instructions?.map((inst: string, index: number) => ({
        "@type": "HowToStep",
        name: `Passo ${index + 1}`,
        text: inst,
      })) || [],
  };

  return (
    <Layout.Default className="style-scrollbar h-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker recipeId={recipe.id} />
      <section className="space-y-6 md:space-y-8">
        <BackButton />
        <RecipeDetailsHeader
          recipeSlug={recipe.slug}
          isRecipePage
          views={recipe.views || 0}
          isSaved={false}
          authorName={recipe.user?.name}
          commentsCount={recipe.totalComments || 0}
          rating={recipe.averageRating || 0}
          timeAgo={timeAgo}
          title={recipe.title}
          reviewStatus={recipe.reviewStatus}
        />
        <ContentRecipe recipe={recipe} />
      </section>
    </Layout.Default>
  );
}
