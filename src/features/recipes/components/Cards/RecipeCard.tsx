import StarRating from "@/features/community/components/AsideContent/StarRating";
import {
  ClockOutlinedIcon,
  HeartFilledIcon,
  HeartOutlinedIcon,
  OpenEyeOutlinedIcon,
  UsersOutlinedIcon,
} from "@/shared/icons";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import type { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  favoriteRecipes: boolean;
  handleFavorite: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function RecipeCard({
  recipe,
  favoriteRecipes,
  handleFavorite,
}: Props) {
  const slug = recipe.title.trim().split(" ").join("-").toLowerCase();

  return (
    <Link href={`/recipes/${slug}`} className="relative contents">
      <span className="sr-only">link for {recipe.title}</span>

      <Col className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-green-200 bg-green-50 shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-square max-h-[220px] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={500}
            height={500}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <Button.Icon
            className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-green-500/80 p-2 backdrop-blur-sm transition-colors hover:bg-green-500"
            aria-label={
              favoriteRecipes ? "Desfavoritar receita" : "Favoritar receita"
            }
            onClick={handleFavorite}
            icon={
              favoriteRecipes ? (
                <HeartFilledIcon className="size-6 text-green-50" />
              ) : (
                <HeartOutlinedIcon className="size-6 text-green-50" />
              )
            }
          />
        </div>

        <div className="grid h-full flex-[1] space-y-2 p-4">
          <div className="space-y-2">
            <Text
              as="h3"
              weight={Text.Weight.SemiBold}
              className="font-lora line-clamp-2 text-lg font-semibold text-green-500"
            >
              {recipe.title}
            </Text>

            {recipe.description && (
              <p className="font-maitree text-black-100 line-clamp-3 text-sm">
                {recipe.description}
              </p>
            )}
          </div>

          <div className="mt-auto flex w-full items-center justify-between">
            {recipe.rating && (
              <div
                className="flex items-center"
                aria-label={`Avaliação: ${recipe.rating} estrelas`}
              >
                <StarRating
                  rating={recipe.rating}
                  iconClassName="w-4 h-4"
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="font-maitree text-black-100 flex items-center gap-x-2 text-xs font-semibold">
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

              {recipe.views && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Serve: ${recipe.views || 0}`}
                >
                  <OpenEyeOutlinedIcon size={16} aria-hidden="true" />
                  <span>{recipe.views || 0}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
    </Link>
  );
}

RecipeCard.displayName = "RecipesRecipeCard";
