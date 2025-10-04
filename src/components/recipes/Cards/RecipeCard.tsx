import Image from "next/image";
import Link from "next/link";
import StarRating from "../../community/AsideContent/StarRating";
import { ClockOutlinedIcon, UsersOutlinedIcon } from "../../icons";
import Text from "../../ui/Text";
import type { Recipe } from "../types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const slug = recipe.title.trim().split(" ").join("-").toLowerCase();

  return (
    <Link
      href={`/recipes/${slug}`}
      className="group contents h-full w-full cursor-pointer !no-underline"
    >
      <span className="sr-only">link for {recipe.title}</span>

      <div className="relative hidden aspect-square overflow-hidden rounded-md md:block">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={300}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 w-full translate-y-6 transform p-3 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <Text
            as="h3"
            weight={Text.Weight.SemiBold}
            className="font-lora line-clamp-2 text-lg leading-tight font-semibold"
          >
            {recipe.title}
          </Text>

          <div className="mt-2 flex w-full items-center justify-between">
            {recipe.rating ? (
              <div
                className="flex"
                aria-label={`Avaliação: ${recipe.rating} estrelas`}
              >
                <StarRating
                  rating={recipe.rating}
                  iconClassName="!text-green-50 w-4 h-4"
                />
              </div>
            ) : null}

            <div className="font-maitree flex items-center gap-x-3 text-xs font-semibold">
              {recipe.prepTime && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Tempo: ${recipe.prepTime}`}
                >
                  <ClockOutlinedIcon size={16} aria-hidden="true" />
                  <span>{recipe.prepTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Serve: ${recipe.servings}`}
                >
                  <UsersOutlinedIcon size={16} aria-hidden="true" />
                  <span>{recipe.servings}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 md:hidden">
        <div className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={300}
            height={300}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-1">
          <div className="flex w-full items-center justify-between">
            <Text
              as="h3"
              className="font-lora mb-1 line-clamp-2 text-base font-medium text-green-500"
            >
              {recipe.title}
            </Text>
            {recipe.rating ? (
              <div
                className="flex"
                aria-label={`Avaliação: ${recipe.rating} estrelas`}
              >
                <StarRating
                  rating={recipe.rating}
                  iconClassName="!text-green-500 w-4 h-4"
                />
              </div>
            ) : null}
          </div>

          <div className="font-maitree flex items-center gap-3 text-xs font-semibold text-gray-500">
            {recipe.prepTime && (
              <div
                className="flex items-center gap-1"
                aria-label={`Tempo de preparo: ${recipe.prepTime}`}
              >
                <ClockOutlinedIcon size={18} aria-hidden="true" />
                <span>{recipe.prepTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div
                className="flex items-center gap-1"
                aria-label={`Rendimento: ${recipe.servings} porções`}
              >
                <UsersOutlinedIcon size={18} aria-hidden="true" />
                <span>{recipe.servings}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

RecipeCard.displayName = "RecipesRecipeCard";
