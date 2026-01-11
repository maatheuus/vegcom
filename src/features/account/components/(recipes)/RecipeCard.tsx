import StarRating from "@/features/community/components/AsideContent/StarRating";
import { getRecipeById } from "@/features/recipes/api/queries/getRecipesApiServer";
import type { DetailedRecipe } from "@/features/recipes/api/types";
import { RecipeCardSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import ImageCarouselModal, {
  type CarouselImage,
} from "@/shared/ui/ImageCarouselModal";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  ChefHatIcon,
  EyeIcon,
  HeartIcon,
  ImagesIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  recipeId: number;
  isEditing?: boolean;
  isFavorites?: boolean;
  className?: string;
}

export default function RecipeCard({
  className,
  isEditing,
  isFavorites,
  recipeId,
}: Props) {
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(true);
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRecipeFavorite(!isRecipeFavorite);
  };

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        const { data } = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (isLoading) return <RecipeCardSkeleton />;

  if (!recipe) return null;

  return (
    <>
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200/60 shadow-sm transition-shadow duration-300 hover:shadow-lg ${className || ""}`}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
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
          <button
            className={`absolute top-2 right-2 flex items-center justify-center rounded-full bg-green-500/80 p-2 backdrop-blur-sm transition-colors hover:bg-green-500 ${isFavorites ? "cursor-pointer" : "cursor-default"}`}
            aria-label={
              isFavorites ? "Desfavoritar receita" : "Favoritar receita"
            }
            onClick={(e) => isFavorites && handleFavorite(e)}
          >
            {isFavorites ? (
              <HeartIcon
                weight={isRecipeFavorite ? "fill" : "regular"}
                className="size-6 text-green-50"
              />
            ) : (
              <ChefHatIcon className="size-6 text-green-50" />
            )}
          </button>
        </div>

        <Link
          className="contents"
          href={isEditing ? `/new-recipe/${recipe.id}` : `/recipe/${recipe.id}`}
        >
          <Col className="flex flex-1 flex-col p-4">
            <div className="space-y-2">
              <Row className="items-start justify-between">
                <Text
                  as="h3"
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.SemiBold}
                  className="font-lora line-clamp-2 text-green-500"
                >
                  {recipe.title}
                </Text>
                <StarRating rating={recipe.rating} />
              </Row>
              <Text
                as="p"
                type={Text.Type.BodyFour}
                weight={Text.Weight.SemiBold}
                className="font-maitree line-clamp-2 text-green-500/90"
              >
                {recipe.description}
              </Text>
            </div>

            <Row className="mt-auto items-center justify-between pt-4">
              <div className="flex h-6 items-center justify-center rounded-full bg-green-500 px-3">
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  weight={Text.Weight.SemiBold}
                  className="font-maitree rounded-full text-green-50"
                >
                  {recipe.category}
                </Text>
              </div>
              <Row className="items-center">
                <EyeIcon size={16} className="text-green-500" />
                <span className="mx-1 size-0.5 rounded-full bg-green-500"></span>
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  weight={Text.Weight.SemiBold}
                  className="font-maitree text-green-500"
                >
                  {recipe.views}
                </Text>
              </Row>
            </Row>
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
