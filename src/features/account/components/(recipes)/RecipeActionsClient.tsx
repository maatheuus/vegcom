"use client";

import RecipeCard from "@/features/account/components/(recipes)/RecipeCard";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
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
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import RecipeEmptyState from "./RecipeEmptyState";
import RecipeFilter, { type SortValues } from "./RecipeFilter";
import type { DataRecipeCardAccount } from "./types";

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
  const { data: user } = useGetUser();
  const recipes = user?.recipes;
  const savedRecipes = user?.savedRecipes;

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const sortBy = (searchParams.get("sort") as SortValues) || "";

  const filteredData = useMemo(() => {
    let data: DataRecipeCardAccount[] = isFavorites ? savedRecipes! : recipes!;

    if (query) {
      const normalizedQuery = normalizeSearchText(query);

      data = data.filter((recipe) => {
        if (normalizeSearchText(recipe.title).includes(normalizedQuery)) {
          return true;
        }

        if (
          recipe.description &&
          normalizeSearchText(recipe.description).includes(normalizedQuery)
        ) {
          return true;
        }

        if (
          recipe.recipeType &&
          normalizeSearchText(recipe.recipeType).includes(normalizedQuery)
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
      data = [...data].sort(
        (a, b) =>
          new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime(),
      );
    }

    return data;
  }, [query, sortBy]);

  const {
    currentItems,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
    hasNextPage,
    hasPreviousPage,
    isLoading,
  } = usePagination({
    items: filteredData || [],
    itemsPerPage: ITEMS_PER_PAGE,
    loadingDelay: 400,
    queryKey: "page",
  });

  const shouldShowPagination = filteredData?.length > ITEMS_PER_PAGE;

  if (!isLoading && currentPage > 1 && currentItems?.length === 0) {
    goToPage(1);
  }

  return isLoading ? (
    <RecipeGridSkeleton count={ITEMS_PER_PAGE} className="lg:grid-cols-3" />
  ) : (
    <>
      {currentItems && currentItems.length > 0 ? (
        <>
          <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:justify-between">
            <RecipeFilter />
          </div>
          <div className="grid w-full grid-cols-1 items-center justify-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((card, index) => (
              <RecipeCard
                key={index}
                data={card}
                isFavorites={isFavorites}
                className="col-span-1"
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

      {shouldShowPagination && currentItems.length > 0 && (
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
