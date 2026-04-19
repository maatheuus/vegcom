"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import StarRating from "@/features/community/components/StarRating";
import {
  getAvailableFiltersClient,
  getFeaturedRecipeClient,
  type GetAvailableFiltersResponse,
} from "@/features/recipes/api/queries/getFeaturedRecipe";
import Button from "@/shared/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import Text from "@/shared/ui/Text";
import { ClockIcon, EyeIcon, UsersIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Recipe } from "../types";

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
  const [availableFilters, setAvailableFilters] =
    useState<GetAvailableFiltersResponse["data"]>();

  const {
    title,
    description,
    cookTime,
    quantity,
    averageRating,
    userId,
    images,
    views,
    slug,
  } = recipe;

  const hasAvailableFilters =
    availableFilters != null &&
    Object.values(availableFilters).some((v) => v != null);

  const image = images[0];
  const { data: currentUser } = useGetUser();
  const isUserRecipe = userId === currentUser?.id;

  useEffect(() => {
    const fetchAvailableFilters = async () => {
      try {
        const data = await getAvailableFiltersClient();
        setAvailableFilters(data?.data);
      } catch (error) {
        console.error("Failed to fetch available filters:", error);
      }
    };
    fetchAvailableFilters();
  }, []);

  const handleFilterChange = async (filterValue: string) => {
    setSelectedFilter(filterValue);
    setIsLoading(true);
    try {
      const data = await getFeaturedRecipeClient(filterValue);

      if (data && data.data) {
        setRecipe(data.data);
      } else if (data) {
        setRecipe(data as unknown as Recipe);
      }
    } catch (error) {
      console.error("Failed to fetch featured recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx("relative w-full", className)}>
      <Link
        href={`/recipes/${slug}`}
        className="group relative block min-h-[340px] overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:shadow-lg md:min-h-auto"
      >
        {isUserRecipe && (
          <div className="absolute top-4 left-4 z-10 md:top-8 md:left-8">
            <div className="flex h-7 items-center justify-center rounded-full bg-green-500 px-3 backdrop-blur-sm">
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.SemiBold}
                className="font-maitree text-sm text-green-50"
              >
                Sua receita
              </Text>
            </div>
          </div>
        )}

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
            {title && (
              <Text
                as="h2"
                type={Text.Type.HeadingOne}
                weight={Text.Weight.Medium}
                className="font-lora text-2xl leading-tight font-semibold text-green-50 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {title}
              </Text>
            )}

            {description && (
              <Text
                as="p"
                type={Text.Type.BodyOne}
                weight={Text.Weight.Medium}
                className="font-maitree mt-2 line-clamp-3 text-sm text-green-50/90 sm:text-base md:text-lg"
              >
                {description}
              </Text>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-maitree flex translate-y-0 flex-wrap items-center gap-x-2 font-semibold text-green-50 opacity-100 transition-all delay-100 duration-500 ease-out sm:gap-x-6 lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              {Boolean(averageRating) ? (
                <div className="flex gap-1">
                  <StarRating
                    rating={averageRating}
                    iconClassName="!text-green-50 !w-4 !h-4 sm:!w-5 sm:h-5"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="flex gap-1">
                  <StarRating
                    rating={0}
                    iconClassName="!text-green-50 !w-4 !h-4 sm:!w-5 sm:h-5"
                    aria-hidden="true"
                  />
                </div>
              )}

              {cookTime && (
                <div className="flex items-center gap-1 text-sm sm:text-sm">
                  <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{cookTime}</span>
                </div>
              )}
              {quantity && (
                <div className="flex items-center gap-1 text-sm sm:text-sm">
                  <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{quantity} porções</span>
                </div>
              )}
              {views && (
                <div className="flex items-center gap-1 text-sm sm:text-sm">
                  <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{views || 0} visualizações</span>
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

      {/* Filter Select */}
      {hasAvailableFilters && (
          <div className="absolute top-4 right-4 z-10 md:top-8 md:right-8">
            <Select
              value={selectedFilter || "Filtrar"}
              onValueChange={handleFilterChange}
            >
              <SelectTrigger className="w-auto gap-2 rounded-lg border-0 bg-black/40 px-3 py-1.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-black/50 [&_span]:data-[slot=select-value]:!text-white [&_svg]:!text-white">
                {availableFilters && (
                  <SelectValue
                    placeholder="Filtrar"
                    defaultValue={selectedFilter || "Filtrar"}
                  />
                )}
              </SelectTrigger>
              <SelectContent className="w-56 rounded-lg border-0 bg-green-50 ring-1 shadow-xl ring-black/5">
                {filterOptions.map((option) => {
                  const isAvailable =
                    availableFilters?.[
                      option.value as keyof GetAvailableFiltersResponse["data"]
                    ];

                  if (!isAvailable) return null;

                  return (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="my-2 cursor-pointer px-4 py-2 text-sm text-green-500 last:my-0 focus:bg-green-200/60 focus:text-green-50 data-[state=checked]:bg-green-500 data-[state=checked]:font-medium data-[state=checked]:text-green-50"
                    >
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
    </div>
  );
}
