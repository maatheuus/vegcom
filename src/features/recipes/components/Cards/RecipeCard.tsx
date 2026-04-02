import type { Recipe } from "@/entities/recipe/types";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import StarRating from "@/features/community/components/StarRating";
import { formatCategoryLabel } from "@/features/recipe-details/ContentRecipe/utils";
import Button from "@/shared/ui/Button";
import ImageCarouselModal, {
  type CarouselImage,
} from "@/shared/ui/ImageCarouselModal";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { ChefHatIcon } from "@phosphor-icons/react";
import {
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ImagesIcon,
  UsersIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { favoriteRecipe } from "../../api/queries/getRecipesApiServer";

interface Props {
  recipe: Recipe;
  className?: string;
}

export default function RecipeCard({ recipe, className }: Props) {
  const { data: currentUser } = useGetUser();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(false);
  const [isUserRecipe, setIsUserRecipe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userHasSaved =
      recipe?.likes?.some((like) => like.userId === currentUser?.id) ?? false;
    setIsSaved(userHasSaved);
    setIsUserRecipe(recipe?.userId === currentUser?.id);
  }, [currentUser?.id, recipe?.likes]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!recipe?.id || isPending) return;

    const previousState = isSaved;
    setIsSaved(!previousState);

    try {
      startTransition(async () => {
        const data = await favoriteRecipe(recipe?.id);
        if (data && Boolean(data.saved)) {
          setIsSaved(data.saved);
        }
      });
    } catch (error) {
      console.error("Error favoriting recipe:", error);
      setIsSaved(previousState);
    }
  };

  return (
    <>
      <Col
        className={`group relative h-full w-full max-w-full overflow-hidden rounded-xl border border-green-200 bg-green-50 shadow-sm transition-all hover:shadow-md ${className || ""}`}
      >
        <div className="relative aspect-square max-h-[220px] overflow-hidden">
          <Link
            href={`/recipes/${recipe?.slug}`}
            className="block h-full w-full"
          >
            <span className="sr-only">link for {recipe?.title}</span>
            <Image
              src={recipe?.images?.[0]}
              alt={recipe?.title}
              width={500}
              height={500}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {recipe?.images && recipe?.images.length > 1 && (
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
              {recipe?.images.length}
            </button>
          )}

          <div className="absolute top-0 right-0 flex w-full items-center justify-between p-2">
            {isUserRecipe ? (
              <>
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
                  className="flex cursor-auto items-center justify-center rounded-full bg-green-500/80 p-2 backdrop-blur-sm transition-colors hover:bg-green-500"
                  aria-label="User recipe"
                  aria-disabled
                  role="div"
                  icon={
                    <ChefHatIcon
                      weight="fill"
                      className="size-6 text-green-50"
                    />
                  }
                />
              </>
            ) : (
              <>
                <div className="z-10 flex h-6 items-center justify-center rounded-full bg-green-500 px-3">
                  {Boolean(recipe.category) && (
                    <Text
                      as="span"
                      type={Text.Type.BodyFive}
                      weight={Text.Weight.SemiBold}
                      className="font-maitree rounded-full text-green-50"
                    >
                      {formatCategoryLabel(recipe.category)}
                    </Text>
                  )}
                </div>
                <Button.Icon
                  aria-label={
                    isSaved ? "Desfavoritar receita" : "Favoritar receita"
                  }
                  className="flex items-center justify-center rounded-full bg-green-500/80 p-2 transition-colors hover:bg-green-500"
                  onClick={handleFavorite}
                  icon={
                    !isMounted ? (
                      <HeartIcon
                        weight="regular"
                        className="size-6 text-green-50"
                      />
                    ) : isSaved ? (
                      <HeartIcon
                        weight="fill"
                        className="size-6 text-green-50"
                      />
                    ) : (
                      <HeartIcon
                        weight="regular"
                        className="size-6 text-green-50"
                      />
                    )
                  }
                />
              </>
            )}
          </div>
        </div>

        <Link
          href={`/recipes/${recipe?.slug}`}
          className="grid h-full flex-[1] space-y-2 p-4 md:space-y-4"
        >
          <div className="space-y-2">
            {Boolean(recipe.title) && (
              <Text
                as="h3"
                weight={Text.Weight.SemiBold}
                className="font-lora line-clamp-1 text-lg font-semibold text-green-500"
              >
                {recipe?.title}
              </Text>
            )}
            {Boolean(recipe.description) && (
              <p className="font-maitree text-black-100 line-clamp-2 text-sm">
                {recipe?.description}
              </p>
            )}
          </div>

          <div className="mt-auto flex w-full items-center justify-between">
            {Boolean(recipe.averageRating) && (
              <div
                className="flex items-center"
                aria-label={`Avaliação: ${recipe?.averageRating} estrelas`}
              >
                <StarRating
                  rating={recipe?.averageRating}
                  iconClassName="w-4 h-4"
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="font-maitree text-black-100 flex items-center gap-x-2 text-xs font-semibold">
              {Boolean(recipe.cookTime) && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Tempo: ${recipe?.cookTime}`}
                >
                  <ClockIcon size={16} aria-hidden="true" />
                  <span>{recipe?.cookTime}</span>
                </div>
              )}
              {Boolean(recipe.quantity) && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Serve: ${recipe?.quantity}`}
                >
                  <UsersIcon size={16} aria-hidden="true" />
                  <span>{recipe?.quantity}</span>
                </div>
              )}

              {Boolean(recipe.views) && (
                <div
                  className="flex items-center gap-1"
                  aria-label={`Serve: ${recipe?.views || 0}`}
                >
                  <EyeIcon size={16} aria-hidden="true" />
                  <span>{recipe?.views || 0}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </Col>

      {Boolean(recipe.images) && recipe.images.length > 0 && (
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
