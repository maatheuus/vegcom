import type { Recipe } from "@/entities/recipe/types";
import StarRating from "@/features/community/components/AsideContent/StarRating";
import Button from "@/shared/ui/Button";
import ImageCarouselModal, {
  type CarouselImage,
} from "@/shared/ui/ImageCarouselModal";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { HeartIcon, ImagesIcon } from "@phosphor-icons/react";
import { ClockIcon, EyeIcon, UsersIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";

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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <>
      <Col className="group relative h-full w-full overflow-hidden rounded-xl border border-green-200 bg-green-50 shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-square max-h-[220px] overflow-hidden">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="block h-full w-full"
          >
            <span className="sr-only">link for {recipe.title}</span>
            <Image
              src={recipe.images[0]}
              alt={recipe.title}
              width={500}
              height={500}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {recipe.images && recipe.images.length > 1 && (
            <button
              className="absolute bottom-2 left-2 z-50 flex items-center gap-1 rounded-full bg-green-500/80 px-2 py-1 text-xs text-green-50 backdrop-blur-sm transition-colors hover:bg-green-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedImageIndex(0);
                setIsGalleryOpen(true);
              }}
              aria-label="Ver todas as imagens"
            >
              <ImagesIcon size={14} />
              {recipe.images.length}
            </button>
          )}

          <Button.Icon
            className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-green-500/80 p-2 backdrop-blur-sm transition-colors hover:bg-green-500"
            aria-label={
              favoriteRecipes ? "Desfavoritar receita" : "Favoritar receita"
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFavorite(e);
            }}
            icon={
              <HeartIcon
                weight={favoriteRecipes ? "fill" : "regular"}
                className="size-6 text-green-50"
              />
            }
          />
        </div>

        <Link
          href={`/recipes/${recipe.slug}`}
          className="grid h-full flex-[1] space-y-2 p-4"
        >
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
              {recipe.cookTime && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Tempo: ${recipe.cookTime}`}
                >
                  <ClockIcon size={16} aria-hidden="true" />
                  <span>{recipe.cookTime}</span>
                </div>
              )}
              {recipe.quantity && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Serve: ${recipe.quantity}`}
                >
                  <UsersIcon size={16} aria-hidden="true" />
                  <span>{recipe.quantity}</span>
                </div>
              )}

              {recipe.views && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Serve: ${recipe.views || 0}`}
                >
                  <EyeIcon size={16} aria-hidden="true" />
                  <span>{recipe.views || 0}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </Col>

      {recipe.images && recipe.images.length > 0 && (
        <ImageCarouselModal
          isOpen={isGalleryOpen}
          onClose={setIsGalleryOpen}
          images={recipe.images.map(
            (img): CarouselImage => ({
              src: img,
              alt: recipe.title,
            }),
          )}
          initialIndex={selectedImageIndex}
          showCounter
        />
      )}
    </>
  );
}

RecipeCard.displayName = "RecipesRecipeCard";
