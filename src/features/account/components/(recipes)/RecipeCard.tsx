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
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ImagesIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
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

  const recipeHref = isEditing
    ? `/new-recipe/${recipe.id}`
    : `/recipes/${recipe.slug}`;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRecipeFavorite(!isRecipeFavorite);
  };

  return (
    <>
      <Col className={`relative size-full max-w-full ${className || ""}`}>
        <Col
          className={clsx(
            "group relative size-full max-w-full overflow-hidden rounded-xl border border-green-200/50 bg-green-50 transition-all hover:-translate-y-0.5 hover:border-green-200",
            isFavorites ? "lg:max-w-none" : "lg:max-w-[334px]",
          )}
        >
          <div className="relative aspect-square max-h-[220px] overflow-hidden">
            <Link href={recipeHref} className="block size-full">
              <span className="sr-only">link for {recipe?.title}</span>
              <Image
                src={recipe.images?.[0] || "/placeholder-recipe.jpg"}
                alt={recipe.title}
                width={500}
                height={500}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-0 right-0 flex w-full items-center justify-between p-2">
              <div className="z-10 flex h-6 items-center justify-center rounded-full bg-white/90 px-3 backdrop-blur-md">
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  weight={Text.Weight.Normal}
                  className="font-lora rounded-full text-green-500 italic"
                >
                  {formatCategoryLabel(recipe.category)}
                </Text>
              </div>
              {isFavorites && (
                <Button.Icon
                  onClick={handleFavorite}
                  className="flex items-center justify-center rounded-full bg-green-50 p-2 transition-colors hover:bg-green-50/80"
                  aria-label="Desfavoritar receita"
                  icon={
                    <HeartIcon
                      weight={isRecipeFavorite ? "fill" : "regular"}
                      className="size-6 text-green-500"
                    />
                  }
                />
              )}
            </div>
          </div>

          <Link href={recipeHref} className="flex h-full flex-[1] flex-col gap-3 p-4">
            <div className="space-y-1.5">
              <Text
                as="h3"
                weight={Text.Weight.SemiBold}
                className="font-lora line-clamp-1 truncate text-lg font-semibold text-green-500"
              >
                {recipe?.title}
              </Text>
              {recipe?.description && (
                <p className="font-maitree text-black-100 line-clamp-2 text-sm leading-relaxed">
                  {recipe?.description}
                </p>
              )}
            </div>

            <div className="mt-auto space-y-2.5 border-t border-green-100/80 pt-3">
              <div
                className="flex items-center"
                aria-label={`Avaliação: ${recipe?.averageRating ?? 0} estrelas`}
              >
                <StarRating
                  rating={recipe?.averageRating ?? 0}
                  iconClassName="w-3.5 h-3.5"
                  aria-hidden="true"
                />
              </div>

              <div className="font-maitree flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-green-600">
                {recipe?.cookTime && (
                  <span
                    className="inline-flex items-center gap-1"
                    aria-label={`Tempo: ${recipe?.cookTime}`}
                  >
                    <ClockIcon size={13} aria-hidden="true" />
                    {formatTimeLabel(recipe?.cookTime)}
                  </span>
                )}

                {recipe?.quantity && (
                  <>
                    <span className="text-xs text-green-500 opacity-50">•</span>
                    <span
                      className="inline-flex items-center gap-1"
                      aria-label={`Serve: ${recipe?.quantity}`}
                    >
                      <UsersIcon size={13} aria-hidden="true" />
                      {recipe?.quantity}
                    </span>
                  </>
                )}

                {recipe?.views !== 0 && (
                  <>
                    <span className="text-xs text-green-500 opacity-50">•</span>
                    <span
                      className="inline-flex items-center gap-1"
                      aria-label={`Visualizações: ${recipe?.views}`}
                    >
                      <EyeIcon size={13} aria-hidden="true" />
                      {recipe?.views}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        </Col>
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

RecipeCard.displayName = "AccountRecipesCard";
