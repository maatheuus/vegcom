"use client";

import RecipeEmptyState from "@/features/recipes/components/RecipeEmptyState";
import { RecipeGrid } from "@/features/recipes/components/RecipeGrid";
import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import {
  sortByPrepTime,
  sortByRating,
  sortByTitle,
  sortByViews,
} from "@/features/recipes/lib/sortFunctions";

import type { Recipe } from "@/entities/recipe";
import { usePagination } from "@/shared/hooks/usePagination";
import Col from "@/shared/ui/Layout/Helpers/Col";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";
import Text from "@/shared/ui/Text";
import { ITEMS_PER_PAGE } from ".";

export type SortType = "averageRating" | "views" | "title" | "prepTime" | "none";

interface RecipeContentProps {
  title?: string;
  recipes: Recipe[];
  queryKey?: string;
  sortBy?: SortType;
}

export default function RecipeContent({
  title,
  recipes,
  queryKey = "page",
  sortBy = "none",
}: RecipeContentProps) {
  const getSortFunction = (type: SortType) => {
    switch (type) {
      case "averageRating":
        return sortByRating;
      case "views":
        return sortByViews;
      case "title":
        return sortByTitle;
      case "prepTime":
        return sortByPrepTime;
      default:
        return undefined;
    }
  };

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
    items: recipes,
    itemsPerPage: ITEMS_PER_PAGE,
    loadingDelay: 400,
    queryKey,
    sortFn: getSortFunction(sortBy),
  });

  const shouldShowPagination = recipes.length > 8;

  if (!isLoading && currentPage > 1 && currentItems.length === 0) {
    goToPage(1);
  }

  return (
    <Col as="section" className="gap-y-6 md:gap-y-8 lg:gap-y-11">
      <div className="flex w-full items-center justify-between">
        <Text
          as="h2"
          type={Text.Type.HeadingFour}
          weight={Text.Weight.Bold}
          className="font-lora font-semibold text-green-500"
        >
          {title}
        </Text>
      </div>
      <Col className="justify-center gap-y-5">
        {isLoading ? (
          <RecipeGridSkeleton count={ITEMS_PER_PAGE} />
        ) : currentItems.length > 0 ? (
          <RecipeGrid recipes={currentItems} />
        ) : (
          <RecipeEmptyState
            title="Nenhuma receita encontrada"
            description={`Não encontramos nenhuma receita para "${title}".`}
          />
        )}

        {shouldShowPagination && currentItems.length > 0 && (
          <div className="block">
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
      </Col>
    </Col>
  );
}
