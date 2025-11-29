"use client";

import {
  HeartFilledIcon,
  HeartOutlinedIcon,
  OpenEyeOutlinedIcon,
} from "@/shared/icons";
import type { DataRecipeCard } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
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
        "h-fit w-full max-w-[290px] rounded-sm border border-green-500",
        className,
      )}
      {...props}
    >
      <div className="relative h-full max-h-[173px] w-full">
        <Image
          width={296}
          height={173}
          src={data.recipeImageUrl}
          alt={data.title}
          className="size-full object-cover"
        />

        <Button.Icon
          onClick={() => setIsFavorite(!isFavorite)}
          variant="filled-white"
          size="md"
          className="absolute top-2 right-2 rounded-full bg-green-100 text-green-500 [&_svg]:!size-5"
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

      <Col className="w-full gap-y-5 px-3 py-3">
        <div className="space-y-2">
          <Row className="items-center gap-x-2">
            <StarRating rating={rating} />

            <Text
              as="span"
              type={Text.Type.BodyFour}
              className="font-rancho text-green-500"
            >
              {rating} rating
            </Text>
          </Row>
          <Text
            as="h3"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Medium}
            className="font-frank text-green-500"
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
              className="font-frank text-green-500"
            >
              {data.user.name}
            </Text>
          </Row>
          <Row className="items-center">
            <OpenEyeOutlinedIcon size={16} className="text-green-500" />
            <span className="mx-1 size-0.5 rounded-full bg-green-500"></span>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-frank text-green-500"
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
