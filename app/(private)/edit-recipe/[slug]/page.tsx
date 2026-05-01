import { getUser } from "@/features/auth/api/queries/getAuthApiServer";
import NewRecipeForm from "@/features/new-recipe/components/NewRecipeForm";
import RecipeDetailsHeader from "@/features/recipe-details/RecipeDetailsHeader";
import { getRecipeBySlug } from "@/features/recipes/api/queries/getRecipesApiServer";
import Layout from "@/shared/ui/Layout";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditRecipePage({ params }: Props) {
  const { slug } = await params;

  const user = await getUser().catch(() => null);
  const result = await getRecipeBySlug(slug).catch(() => null);
  const recipe = result?.data;

  if (!recipe || recipe.userId !== user?.data.id) notFound();

  return (
    <Layout.Default className="style-scrollbar h-auto">
      <section className="relative space-y-2 overflow-hidden md:space-y-8">
        <RecipeDetailsHeader title={`Editando: ${recipe.title}`} />

        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <NewRecipeForm initialRecipe={recipe} />
        </Suspense>
      </section>
    </Layout.Default>
  );
}
