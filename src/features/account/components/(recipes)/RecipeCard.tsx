import StarRating from "@/features/community/components/StarRating";
import {
  formatCategoryLabel,
  formatTimeLabel,
} from "@/features/recipe-details/ContentRecipe/utils";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import Button from "@/shared/ui/Button";
import ImageCarouselModal, {
  type CarouselImage,
} from "@/shared/ui/ImageCarouselModal";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import {
  ChefHatIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ImagesIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  recipe: DetailedRecipe;
  isEditing?: boolean;
  isFavorites?: boolean;
  className?: string;
}

export default function RecipeCard({
  className,
  isEditing,
  isFavorites,
  recipe,
}: Props) {
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRecipeFavorite(!isRecipeFavorite);
  };

  return (
    <>
      <div
        className={`group relative grid h-full w-full max-w-full overflow-hidden rounded-xl border border-green-200 bg-green-50 shadow-sm transition-all hover:shadow-md lg:max-w-[334px] ${className || ""}`}
      >
        <div className="relative aspect-[16/9] h-full w-full overflow-hidden">
          <Image
            fill
            src={recipe.images?.[0] || "/placeholder-recipe.jpg"}
            alt={recipe.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {recipe.images && recipe.images.length > 1 && (
            <button
              className="absolute bottom-2 left-2 z-50 flex items-center gap-1 rounded-full bg-green-500/80 px-2 py-1 text-xs text-green-50 backdrop-blur-sm transition-colors hover:bg-green-500"
              onClick={(e) => {
                e.preventDefault();
                setSelectedImageIndex(0);
                setIsGalleryOpen(true);
              }}
              aria-label="Ver todas as imagens"
            >
              <ImagesIcon size={14} />
              {recipe.images.length}
            </button>
          )}
          <div className="absolute top-0 right-0 flex w-full items-center justify-between p-2">
            <div className="flex h-6 items-center justify-center rounded-full bg-green-500 px-3">
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.SemiBold}
                className="font-maitree rounded-full text-green-50"
              >
                {formatCategoryLabel(recipe.category)}
              </Text>
            </div>
            <Button.Icon
              onClick={(e) => isFavorites && handleFavorite(e)}
              className={`flex items-center justify-center rounded-full bg-green-500/80 p-2 backdrop-blur-sm transition-colors hover:bg-green-500 ${isFavorites ? "cursor-pointer" : "cursor-default"}`}
              aria-label={
                isFavorites ? "Desfavoritar receita" : "Favoritar receita"
              }
              role="div"
              icon={
                isFavorites ? (
                  <HeartIcon
                    weight={isRecipeFavorite ? "fill" : "regular"}
                    className="size-6 text-green-50"
                  />
                ) : (
                  <ChefHatIcon weight="fill" className="size-6 text-green-50" />
                )
              }
            />
          </div>
        </div>

        <Link
          className="contents"
          href={
            isEditing ? `/new-recipe/${recipe.id}` : `/recipes/${recipe.slug}`
          }
        >
          <Col className="flex-1 flex-col space-y-2 p-4 md:space-y-4">
            <div className="space-y-2">
              <Text
                as="h3"
                weight={Text.Weight.SemiBold}
                className="font-lora line-clamp-1 text-lg font-semibold text-green-500"
              >
                {recipe?.title}
              </Text>

              {recipe?.description && (
                <p className="font-maitree text-black-100 line-clamp-3 text-sm">
                  {recipe?.description}
                </p>
              )}
            </div>

            <div className="mt-auto flex w-full items-center justify-between">
              {recipe?.rating && (
                <div
                  className="flex items-center"
                  aria-label={`Avaliação: ${recipe?.rating} estrelas`}
                >
                  <StarRating
                    rating={recipe?.rating}
                    iconClassName="w-4 h-4"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div className="font-maitree text-black-100 flex items-center gap-x-4 text-xs font-semibold">
                {recipe?.cookTime && (
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Tempo: ${recipe?.cookTime}`}
                  >
                    <ClockIcon size={16} aria-hidden="true" />
                    <span>{formatTimeLabel(recipe?.cookTime)}</span>
                  </div>
                )}

                {recipe?.quantity && (
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Serve: ${recipe?.quantity}`}
                  >
                    <UsersIcon size={16} aria-hidden="true" />
                    <span>{recipe?.quantity}</span>
                  </div>
                )}

                {recipe?.views !== 0 && (
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Serve: ${recipe?.views}`}
                  >
                    <EyeIcon size={16} aria-hidden="true" />
                    <span>{recipe?.views}</span>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Link>
      </div>

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

RecipeCard.displayName = "AccountRecipesCard";
