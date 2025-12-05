"use client";

import { food } from "@/assets";
import RecipeCard from "@/features/account/components/(recipes)/RecipeCard";
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
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const sortBy = (searchParams.get("sort") as SortValues) || "";

  const filteredData = useMemo(() => {
    let data: DataRecipeCardAccount[] = mockExploreData;

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
    items: filteredData,
    itemsPerPage: ITEMS_PER_PAGE,
    loadingDelay: 400,
    queryKey: "page",
  });

  const shouldShowPagination = filteredData.length > ITEMS_PER_PAGE;

  if (!isLoading && currentPage > 1 && currentItems.length === 0) {
    goToPage(1);
  }

  return (
    <>
      <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:justify-between">
        <RecipeFilter />
      </div>

      {isLoading ? (
        <RecipeGridSkeleton count={ITEMS_PER_PAGE} className="lg:grid-cols-3" />
      ) : (
        <>
          <div className="grid w-full grid-cols-1 items-center justify-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((card, index) => (
              <RecipeCard
                key={index}
                data={card}
                isFavorites={isFavorites}
                className="col-span-1"
              />
            ))}
            {currentItems.length === 0 && (
              <RecipeEmptyState
                isFavorites={isFavorites}
                filteredData={filteredData}
                searchQuery={query}
              />
            )}
          </div>

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
      )}
    </>
  );
}

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString();
}

const mockExploreData: DataRecipeCardAccount[] = [
  {
    id: "1",
    isFavorite: true,
    rating: 4.5,
    title: "Creamy Garlic Chicken",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1203,
    description:
      "Frango suculento com molho de alho cremoso, perfeito para um jantar especial.",
    recipeType: "Janta",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    id: "2",
    isFavorite: false,
    rating: 3.9,
    title: "Avocado Toast Deluxe",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 982,
    description:
      "Torrada crocante com abacate temperado, ovos e toque de limão.",
    recipeType: "Café da manhã",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    id: "3",
    isFavorite: true,
    rating: 4.2,
    title: "Summer Berry Parfait",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 743,
    description:
      "Camadas de frutas vermelhas frescas, iogurte grego e granola crocante.",
    recipeType: "Sobremesa",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    id: "4",
    isFavorite: false,
    rating: 3.5,
    title: "Beef Stroganoff",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1120,
    description: "Clássico russo com carne macia, cogumelos e creme de leite.",
    recipeType: "Almoço",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    id: "5",
    isFavorite: true,
    rating: 4.7,
    title: "Pão de Queijo Mineiro",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1650,
    description:
      "Tradicional pão de queijo brasileiro com casquinha crocante e interior macio.",
    recipeType: "Café da tarde",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    id: "6",
    isFavorite: false,
    rating: 3.8,
    title: "Vegetarian Sushi Rolls",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 870,
    description:
      "Rolinhos de sushi com vegetais frescos, arroz temperado e alga nori.",
    recipeType: "Almoço",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    id: "7",
    isFavorite: true,
    rating: 4.0,
    title: "Panquecas de Banana Fit",
    imageUrl: food,
    user: {
      name: "Liam Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1342,
    description:
      "Panquecas leves feitas com banana e aveia, perfeitas para começar o dia.",
    recipeType: "Café da manhã",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
];
