"use client";

import RecipeCard from "@/features/account/components/(recipes)/RecipeCard";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { recipeApi } from "@/features/recipes/api/recipesApi";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import { usePagination } from "@/shared/hooks/usePagination";
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

export default function RecipeActions({ isFavorites }: Props) {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const recipes = user?.recipes;
  const savedRecipes = user?.savedRecipes;

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const sortBy = (searchParams.get("sort") as SortValues) || "";

  const recipeIds = useMemo(() => {
    const sourceData = isFavorites ? savedRecipes : recipes;
    if (!sourceData || sourceData.length === 0) return [];

    return sourceData.map((item) =>
      typeof item === "object" && item !== null && "id" in item
        ? (item as { id: number }).id
        : (item as number),
    );
  }, [isFavorites, savedRecipes, recipes]);

  const { data: recipesResponse, isLoading: isLoadingRecipes } = useQuery({
    queryKey: ["recipes", "batch", recipeIds],
    queryFn: () => recipeApi.getRecipesByIds(recipeIds),
    enabled: recipeIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const allRecipes = recipesResponse?.data ?? [];

  const filteredData = useMemo(() => {
    if (allRecipes.length === 0) return [];

    let data = [...allRecipes];

    if (query) {
      const normalizedQuery = normalizeSearchText(query);

      data = data.filter((recipe) => {
        if (
          recipe.title &&
          normalizeSearchText(recipe.title).includes(normalizedQuery)
        ) {
          return true;
        }

        if (
          recipe.description &&
          normalizeSearchText(recipe.description).includes(normalizedQuery)
        ) {
          return true;
        }

        if (
          recipe.category &&
          normalizeSearchText(recipe.category).includes(normalizedQuery)
        ) {
          return true;
        }

        return false;
      });
    }

    if (sortBy === "rating") {
      data = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "views") {
      data = [...data].sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === "recent") {
      data = [...data].sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "old") {
      data = [...data].sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateA - dateB;
      });
    }

    return data;
  }, [query, sortBy, allRecipes]);

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

  if (isLoading) {
    return (
      <RecipeGridSkeleton count={ITEMS_PER_PAGE} className="lg:grid-cols-3" />
    );
  }

  return (
    <>
      {currentItemsRecipe && currentItemsRecipe.length > 0 ? (
        <>
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:justify-between">
            <RecipeFilter />
          </div>

          <div className="grid w-full grid-cols-1 items-center justify-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentItemsRecipe.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorites={isFavorites}
              />
            ))}
          </div>
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
