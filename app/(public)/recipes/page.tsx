import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receitas Veganas — Pratos, Sobremesas e Muito Mais",
  description:
    "Explore nossa coleção de receitas veganas, desde pratos principais até sobremesas incríveis. Filtre por tipo de refeição, tempo de preparo e muito mais.",
  openGraph: {
    title: "Receitas Veganas — Pratos, Sobremesas e Muito Mais | VegCom",
    description:
      "Explore nossa coleção de receitas veganas, desde pratos principais até sobremesas incríveis. Filtre por tipo de refeição, tempo de preparo e muito mais.",
    url: "https://www.vegcom.life/recipes",
  },
  alternates: {
    canonical: "/recipes",
  },
};

import {
  getFeaturedRecipe,
  getRecipes,
} from "@/features/recipes/api/queries/getRecipesApiServer";

import { Categories } from "@/features/recipes/components/Categories";
import { ClearFiltersButton } from "@/features/recipes/components/ClearFiltersButton";
import HeaderComponent from "@/features/recipes/components/HeaderComponent";

import RecipeParent from "@/features/recipes/components/RecipeParent";
import { SearchBar } from "@/features/recipes/components/SearchBar";
import GtagPageViewConversion from "@/shared/components/GtagPageViewConversion";
import Layout from "@/shared/ui/Layout";
import Row from "@/shared/ui/Layout/Helpers/Row";

import type { Recipe } from "@/entities/recipe";
import RecipeDetailsHeader from "@/features/recipe-details/RecipeDetailsHeader";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import {
  filterRecipes,
  normalizeText,
  sortRecipes,
} from "@/features/recipes/lib/filterUtils";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    mealType?: string;
    prepTime?: string;
    highlight?: string;
    sort?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const MEAL_TYPE_MAP: Record<string, string> = {
    "cafe da manha": "BREAKFAST",
    almoco: "LUNCH",
    jantar: "DINNER",
    sobremesas: "DESSERT",
    lanches: "SNACKS",
    geral: "GENERAL",
  };

  const apiSort =
    params.highlight === "Mais populares"
      ? "popular"
      : params.highlight === "Melhor avaliadas"
        ? "rated"
        : params.highlight === "Novidades"
          ? "newest"
          : undefined;

  const apiMealType = params.mealType
    ? MEAL_TYPE_MAP[normalizeText(params.mealType)]
    : undefined;

  const [recipesResult, featuredResult] = await Promise.allSettled([
    getRecipes({ sort: apiSort, mealType: apiMealType }),
    getFeaturedRecipe("most_viewed_month"),
  ]);

  let recipesData: Recipe[] = [];
  if (recipesResult.status === "fulfilled") {
    recipesData = recipesResult.value.data || [];
  } else {
    console.error("Failed to fetch recipes:", recipesResult.reason);
  }

  let featuredRecipe: DetailedRecipe | Recipe | undefined = undefined;
  if (featuredResult.status === "fulfilled") {
    featuredRecipe = featuredResult.value?.data || undefined;
  } else {
    console.warn("Failed to fetch featured recipe:", featuredResult.reason);
  }

  let recipes = filterRecipes(recipesData, params.q, params.prepTime);
  recipes = sortRecipes(recipes, params.sort);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Receitas Veganas | VegCom",
    description:
      "Explore nossa coleção de receitas veganas, desde pratos principais até sobremesas incríveis.",
    url: "https://www.vegcom.life/recipes",
  };

  return (
    <Layout.Default className="style-scrollbar min-h-[90dvh]">
      <GtagPageViewConversion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="space-y-6 md:space-y-8 lg:space-y-11">
        <Row className="items-center justify-between">
          <HeaderComponent>
            <RecipeDetailsHeader title="Receitas" className="border-0 p-0" />

            <Row className="hidden items-center gap-1 md:flex">
              <Row className="gap-2">
                <SearchBar />
                <Categories />
              </Row>
              <ClearFiltersButton />
            </Row>
          </HeaderComponent>
        </Row>

        <RecipeParent recipes={recipes} featuredRecipe={featuredRecipe} />
      </section>
    </Layout.Default>
  );
}
