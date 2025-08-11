"use client";

import type { DataRecipeCard } from "@/components/@types";
import {
  HeartFilledIcon,
  HeartOutlinedIcon,
  OpenEyeOutlinedIcon,
} from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import clsx from "clsx";
import Image from "next/image";
import { useState, type HtmlHTMLAttributes } from "react";
import StarRating from "./StarRating";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  data: DataRecipeCard;
}

export default function RecipeCard({ className, data, ...props }: Props) {
  const rating = data.rating ?? 0;

  const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const favoriteCard = {
    ...data,
    isFavorite: isFavorite,
  };

  return (
    <Col
      className={clsx(
        "w-full h-fit max-w-[290px] border border-green-500 rounded-sm",
        className
      )}
      {...props}
    >
      <div className="w-full h-full max-h-[173px] relative">
        <Image
          width={296}
          height={173}
          src={data.recipeImageUrl}
          alt={data.title}
          className="object-cover size-full"
        />

        <Button.Icon
          onClick={() => setIsFavorite(!isFavorite)}
          variant="filled-white"
          size="md"
          className="bg-green-100 rounded-full absolute top-2 right-2 text-green-500 [&_svg]:!size-5"
          icon={
            favoriteCard.isFavorite ? (
              <HeartFilledIcon />
            ) : (
              <HeartOutlinedIcon />
            )
          }
          aria-label={
            favoriteCard.isFavorite
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"
          }
        />
      </div>

      <Col className="w-full px-3 py-3 gap-y-5">
        <div className="space-y-2">
          <Row className="gap-x-2 items-center">
            <StarRating rating={rating} />

            <Text
              as="span"
              type={Text.Type.BodyFour}
              className="text-green-500 font-rancho"
            >
              {rating} rating
            </Text>
          </Row>
          <Text
            as="h3"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Medium}
            className="text-green-500 font-frank"
          >
            {data.title}
          </Text>
        </div>
        <Row className="justify-between">
          <Row className="items-center gap-x-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="text-green-500 font-frank"
            >
              {data.user.name}
            </Text>
          </Row>
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
    </Col>
  );
}

RecipeCard.displayName = "AsideRecipeCard";
