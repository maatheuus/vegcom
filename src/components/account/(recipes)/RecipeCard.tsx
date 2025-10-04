"use client";

import StarRating from "@/components/community/AsideContent/StarRating";
import {
  ChefHatOutlinedIcon,
  HeartFilledIcon,
  HeartOutlinedIcon,
  OpenEyeOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import Image from "next/image";
import Link from "next/link";
import { useState, type LinkHTMLAttributes } from "react";
import type { DataRecipeCardAccount } from "../../../../app/(private)/account/recipes/page";

interface Props extends LinkHTMLAttributes<HTMLLinkElement> {
  data: DataRecipeCardAccount;
  isEditing?: boolean;
  isFavorites?: boolean;
}

export default function RecipeCard({
  className,
  isEditing,
  isFavorites,
  data,
}: Props) {
  const rating = data.rating ?? 0;
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(true);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRecipeFavorite(!isRecipeFavorite);
  };

  return (
    <Link
      className={`flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200/60 shadow-sm transition-shadow duration-300 hover:shadow-lg ${className || ""}`}
      href={isEditing ? `/new-recipe/${data.title}` : `/recipe/${data.title}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          fill
          src={data.recipeImageUrl}
          alt={data.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-green-500/80 p-2 backdrop-blur-sm transition-colors hover:bg-green-500"
          aria-label={
            isFavorites ? "Desfavoritar receita" : "Favoritar receita"
          }
          onClick={handleFavorite}
        >
          {isFavorites ? (
            isRecipeFavorite ? (
              <HeartFilledIcon className="size-6 text-green-50" />
            ) : (
              <HeartOutlinedIcon className="size-6 text-green-50" />
            )
          ) : (
            <ChefHatOutlinedIcon className="size-6 text-green-50" />
          )}
        </button>
      </div>

      <Col className="flex flex-1 flex-col p-4">
        <div className="space-y-2">
          <Row className="items-start justify-between">
            <Text
              as="h3"
              type={Text.Type.BodyThree}
              weight={Text.Weight.SemiBold}
              className="font-lora line-clamp-2 text-green-500"
            >
              {data.title}
            </Text>
            <StarRating rating={rating} />
          </Row>
          <Text
            as="p"
            type={Text.Type.BodyFour}
            weight={Text.Weight.SemiBold}
            className="font-maitree line-clamp-2 text-green-500/90"
          >
            {data.description}
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
              {data.recipeType}
            </Text>
          </div>
          <Row className="items-center">
            <OpenEyeOutlinedIcon size={16} className="text-green-500" />
            <span className="mx-1 size-0.5 rounded-full bg-green-500"></span>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.SemiBold}
              className="font-maitree text-green-500"
            >
              {data.views}
            </Text>
          </Row>
        </Row>
      </Col>
    </Link>
  );
}

RecipeCard.displayName = "AccountRecipesCard";
