"use client";

import StarRating from "@/features/community/components/AsideContent/StarRating";
import { getFeaturedRecipeClient } from "@/features/recipes/api/client/getFeaturedRecipe";
import type { Recipe } from "@/features/recipes/api/types";
import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import {
  CaretDown,
  ClockIcon,
  EyeIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecipeHeroProps extends React.HTMLAttributes<HTMLLinkElement> {
  hightlightedRecipe: Recipe;
}

const filterOptions = [
  { label: "Mais vista do mês", value: "most_viewed_month" },
  { label: "Mais vista da semana", value: "most_viewed_week" },
  { label: "Mais avaliada do mês", value: "best_rated_month" },
  { label: "Mais avaliada da semana", value: "best_rated_week" },
];

export function RecipeHero({ className, hightlightedRecipe }: RecipeHeroProps) {
  const [recipe, setRecipe] = useState<Recipe>(hightlightedRecipe);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { title, description, cookTime, quantity, rating, images, views, slug } =
    recipe;

  const image = images[0];

  const handleFilterChange = async (filterValue: string) => {
    setSelectedFilter(filterValue);
    setIsDropdownOpen(false);
    setIsLoading(true);
    try {
      const data = await getFeaturedRecipeClient(filterValue);
      // The API response structure in client fetch assumes { data: Recipe }
      // If the backend returns the recipe directly as per spec, adjustments might be needed.
      // Assuming getFeaturedRecipeClient returns { data: Recipe } based on its implementation.
      if (data && data.data) {
        setRecipe(data.data);
      } else if (data) {
         // Fallback if the response is just the recipe
         setRecipe(data as unknown as Recipe);
      }
    } catch (error) {
      console.error("Failed to fetch featured recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLabel = filterOptions.find(
    (opt) => opt.value === selectedFilter,
  )?.label;

  return (
    <div className={clsx("relative w-full", className)}>
      <Link href={`/recipes/${slug}`} className="group relative block min-h-[340px] overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:shadow-lg md:min-h-auto">
        <div className="relative min-h-[340px] md:aspect-[21/9] md:min-h-auto">
          <Image
            src={image}
            fill
            alt={title}
            className={clsx(
              "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
              isLoading && "scale-105 blur-sm grayscale",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 transition-opacity duration-500 ease-out lg:opacity-0 lg:group-hover:opacity-100" />
        </div>

        <div className="absolute inset-0 flex w-full flex-col justify-end gap-y-4 p-4 sm:p-6 md:p-8">
          <div className="translate-y-0 opacity-100 transition-all duration-500 ease-out lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            <Text
              as="h2"
              type={Text.Type.HeadingOne}
              weight={Text.Weight.Medium}
              className="font-lora text-2xl leading-tight font-semibold text-green-50 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {title}
            </Text>

            <Text
              as="p"
              type={Text.Type.BodyOne}
              weight={Text.Weight.Medium}
              className="font-maitree mt-2 line-clamp-3 text-sm text-green-50/90 sm:text-base md:text-lg"
            >
              {description}
            </Text>
          </div>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-maitree flex translate-y-0 flex-wrap items-center gap-x-2 font-semibold text-green-50 opacity-100 transition-all delay-100 duration-500 ease-out sm:gap-x-6 lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              {rating && (
                <div className="flex gap-1">
                  <StarRating
                    rating={rating}
                    iconClassName="!text-green-50 !w-4 !h-4 sm:!w-5 sm:h-5"
                  />
                </div>
              )}
              <div className="flex items-center gap-1 text-sm sm:text-sm">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{cookTime}</span>
              </div>
              <div className="flex items-center gap-1 text-sm sm:text-sm">
                <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{quantity} porções</span>
              </div>
              {views && (
                <div className="flex items-center gap-1 text-sm sm:text-sm">
                  <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{views || 0}</span>
                </div>
              )}
            </div>

            <Button
              size="lg"
              className="font-lora w-full translate-y-0 cursor-pointer rounded-full bg-green-50 px-6 py-2.5 text-sm text-green-500 italic opacity-100 transition-all delay-200 duration-500 ease-out sm:w-auto sm:text-base lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:scale-105 lg:group-hover:opacity-100"
            >
              Ver receita
            </Button>
          </div>
        </div>
      </Link>

      {/* Filter Dropdown */}
      <div className="absolute right-4 top-4 z-10 md:right-8 md:top-8">
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/50"
          >
            {selectedLabel}
            <CaretDown
              className={clsx(
                "h-4 w-4 transition-transform",
                isDropdownOpen && "rotate-180",
              )}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/5">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterChange(option.value);
                    }}
                    className={clsx(
                      "block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50",
                      selectedFilter === option.value
                        ? "font-medium text-green-600"
                        : "text-gray-700",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
