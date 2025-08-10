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
      className={`flex flex-col w-full h-full overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        className || ""
      }`}
      href={isEditing ? `/new-recipe/${data.title}` : `/recipe/${data.title}`}
    >
      <div className="w-full h-full max-h-[173px] relative overflow-hidden">
        <Image
          width={296}
          height={173}
          src={data.recipeImageUrl}
          alt={data.title}
          className="object-cover size-full"
        />

        <div
          className="p-2 bg-green-500 rounded-full absolute top-2 right-2 text-green-500 flex items-center justify-center"
          aria-label={isFavorites ? "favoritas do chef" : "receitas do chef"}
          onClick={handleFavorite}
        >
          {isFavorites ? (
            isRecipeFavorite ? (
              <HeartFilledIcon className="text-green-50 size-6" />
            ) : (
              <HeartOutlinedIcon className="text-green-50 size-6" />
            )
          ) : (
            <ChefHatOutlinedIcon className="text-green-50 size-6" />
          )}
        </div>
      </div>

      <Col className="w-full px-3 py-3 gap-y-5">
        <div className="space-y-2">
          <Row className="justify-between items-center">
            <Text
              as="h3"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Medium}
              className="text-green-500 font-frank"
            >
              {data.title}
            </Text>
            <StarRating rating={rating} />
          </Row>
          <Text
            as="p"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="text-green-500 font-frank line-clamp-2"
          >
            {data.description}
          </Text>
        </div>
        <Row className="justify-between">
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="text-green-500 font-frank"
          >
            {data.recipeType}
          </Text>
          <Row className="items-center">
            <OpenEyeOutlinedIcon size={16} className="text-green-500" />
            <span className="size-0.5 rounded-full bg-green-500 mx-1"></span>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="text-green-500 font-frank"
            >
              {data.views} visualizações
            </Text>
          </Row>
        </Row>
      </Col>
    </Link>
  );
}

RecipeCard.displayName = "AccountRecipesCard";
