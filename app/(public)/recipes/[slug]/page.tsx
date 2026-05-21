import BackButton from "@/features/recipe-details/BackButton";
import ContentRecipe from "@/features/recipe-details/ContentRecipe";
import { getRecipeBySlug } from "@/features/recipes/api/queries/getRecipesApiServer";
import Layout from "@/shared/ui/Layout";
import { notFound } from "next/navigation";

import RecipeDetailsHeader from "@/features/recipe-details/RecipeDetailsHeader";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getRecipeBySlug(slug).catch(() => null);
  const recipe = result?.data;

  if (!recipe) return { title: "Receita não encontrada" };

  const description =
    recipe.description ||
    `Aprenda a fazer ${recipe.title} na comunidade VegCom!`;
  const url = `https://www.vegcom.life/recipes/${recipe.slug || slug}`;
  const ogImage = recipe.images?.length
    ? [{ url: recipe.images[0], width: 1200, height: 630, alt: recipe.title }]
    : [];

  return {
    title: recipe.title,
    description,
    openGraph: {
      title: `${recipe.title} | VegCom`,
      description,
      url,
      siteName: "VegCom",
      type: "article",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipe.title} | VegCom`,
      description,
      images: recipe.images?.length ? [recipe.images[0]] : [],
    },
    alternates: {
      canonical: `/recipes/${recipe.slug || slug}`,
    },
  };
}

export default async function page({ params }: Props) {
  const { slug } = await params;

  const result = await getRecipeBySlug(slug).catch((error) =>
    console.error("Error fetching recipe by slug:", error),
  );
  const recipe = result?.data;
  if (!recipe) {
    notFound();
  }

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

      <section className="space-y-2 md:space-y-4">
        <BackButton />
        <RecipeDetailsHeader recipe={recipe} isRecipePage />
        <ContentRecipe recipe={recipe} />
      </section>
    </Layout.Default>
  );
}
