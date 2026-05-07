"use client";

import RecipeCard from "@/features/account/components/(recipes)/RecipeCard";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { hasActiveSubscription } from "@/features/auth/api/types";
import { recipeApi } from "@/features/recipes/api/recipesApi";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import { usePagination } from "@/shared/hooks/usePagination";
import Grid from "@/shared/ui/Layout/Helpers/Grid";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import RecipeEmptyState from "./RecipeEmptyState";
import RecipeFilter, { type SortValues } from "./RecipeFilter";

const ITEMS_PER_PAGE = 6;

interface Props {
  isFavorites?: boolean;
}

function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const FREE_LIMIT = 3;
const PREMIUM_LIMIT = 12;

export default function RecipeActions({ isFavorites }: Props) {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const recipes = user?.recipes;
  const savedRecipes = user?.savedRecipes;

  const searchParams = useSearchParams();

  const recipeIds = useMemo((): number[] => {
    const sourceData = isFavorites ? savedRecipes : recipes;
    if (!sourceData || sourceData.length === 0) return [];

    return sourceData.map((item) =>
      typeof item === "object" && item !== null && "id" in item
        ? (item as { id: number }).id
        : (item as unknown as number),
    );
  }, [isFavorites, savedRecipes, recipes]);

  const { data: recipesResponse, isLoading: isLoadingRecipes } = useQuery({
    queryKey: ["recipes", "batch", recipeIds],
    queryFn: () => recipeApi.getRecipesByIds(recipeIds),
    enabled: recipeIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const allRecipes = recipesResponse?.data ?? [];

  const query = searchParams.get("q") || "";
  const sortBy = (searchParams.get("sort") as SortValues) || "";
  const categoryFilter = searchParams.get("category") || "";

  const recipesWithNormalizedFields = useMemo(() => {
    return allRecipes.map((recipe) => ({
      recipe,
      normalizedTitle: recipe.title ? normalizeSearchText(recipe.title) : "",
      normalizedDescription: recipe.description
        ? normalizeSearchText(recipe.description)
        : "",
      normalizedCategory: recipe.category
        ? normalizeSearchText(recipe.category)
        : "",
    }));
  }, [allRecipes]);

  const filteredData = useMemo(() => {
    if (recipesWithNormalizedFields.length === 0) return [];

    let data = [...recipesWithNormalizedFields];

    if (query) {
      const normalizedQuery = normalizeSearchText(query);
      data = data.filter(
        (item) =>
          item.normalizedTitle.includes(normalizedQuery) ||
          item.normalizedDescription.includes(normalizedQuery) ||
          item.normalizedCategory.includes(normalizedQuery),
      );
    }

    if (categoryFilter) {
      const normalizedCategory = normalizeSearchText(categoryFilter);
      data = data.filter((item) =>
        item.normalizedCategory.includes(normalizedCategory),
      );
    }

    let finalData = data.map((item) => item.recipe);

    if (sortBy === "averageRating") {
      finalData = [...finalData].sort(
        (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
      );
    } else if (sortBy === "views") {
      finalData = [...finalData].sort(
        (a, b) => (b.views || 0) - (a.views || 0),
      );
    } else if (sortBy === "recent") {
      finalData = [...finalData].sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "old") {
      finalData = [...finalData].sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateA - dateB;
      });
    }

    return finalData;
  }, [query, categoryFilter, sortBy, recipesWithNormalizedFields]);

  const {
    currentItems,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
    hasNextPage,
    hasPreviousPage,
    isLoading: isPaginationLoading,
  } = usePagination({
    items: filteredData,
    itemsPerPage: ITEMS_PER_PAGE,
    loadingDelay: 400,
    queryKey: "page",
  });

  const currentItemsRecipe = currentItems as DetailedRecipe[];
  const shouldShowPagination = filteredData.length > ITEMS_PER_PAGE;

  const isLoading = isUserLoading || isLoadingRecipes || isPaginationLoading;

  if (!isLoading && currentPage > 1 && currentItems?.length === 0) {
    goToPage(1);
  }

  const isSubscribed = hasActiveSubscription(user?.subscription);
  const recipeLimit = isSubscribed ? PREMIUM_LIMIT : FREE_LIMIT;
  const recipeCount = user?.recipesCount ?? 0;
  const atLimit = !isFavorites && recipeCount >= recipeLimit;
  const nearLimit = !isFavorites && !atLimit && recipeCount >= recipeLimit - 1;

  if (isLoading) {
    return (
      <RecipeGridSkeleton count={ITEMS_PER_PAGE} className="lg:grid-cols-3" />
    );
  }

  const LimitBanner = !isFavorites && (
    <div
      className={clsx(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm",
        atLimit
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : nearLimit
            ? "border-yellow-200 bg-yellow-50 text-yellow-800"
            : "border-green-200 bg-green-50 text-green-800",
      )}
    >
      <span className="font-medium">
        {recipeCount}/{recipeLimit} receitas usadas
        {atLimit && " — limite atingido"}
      </span>
      {!isSubscribed && (
        <Link
          href="/account/subscription"
          className="shrink-0 rounded-lg bg-green-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-green-600"
        >
          Upgrade para Premium
        </Link>
      )}
    </div>
  );

  return (
    <>
      {LimitBanner}
      {currentItemsRecipe && currentItemsRecipe.length > 0 ? (
        <>
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:justify-between">
            <RecipeFilter />
          </div>

          <Grid
            className={clsx(
              "grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8",
              isFavorites && "lg:grid-cols-2 lg:gap-6 xl:grid-cols-3",
            )}
          >
            {currentItemsRecipe.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorites={isFavorites}
              />
            ))}
          </Grid>
        </>
      ) : (
        <RecipeEmptyState
          isFavorites={isFavorites}
          isEmpty={currentItems?.length === 0}
          searchQuery={query}
        />
      )}

      {shouldShowPagination && currentItemsRecipe.length > 0 && (
        <div className="flex w-full justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  disabled={!hasPreviousPage || isLoading}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) =>
                pageNumber === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => goToPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                      disabled={isLoading}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  disabled={!hasNextPage || isLoading}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
