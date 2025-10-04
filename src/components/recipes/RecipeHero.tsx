"use client";

import { food } from "@/assets";
import clsx from "clsx";
import Image from "next/image";
import StarRating from "../community/AsideContent/StarRating";
import { ClockOutlinedIcon, UsersOutlinedIcon } from "../icons";
import Button from "../ui/Button";
import Text from "../ui/Text";

interface RecipeHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  time?: string;
  servings?: string;
  rating?: number;
}

export function RecipeHero({ className, rating, ...props }: RecipeHeroProps) {
  return (
    <div
      className={clsx("group relative overflow-hidden rounded-lg", className)}
      {...props}
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9]">
        <Image
          src={food}
          fill
          alt="Tofu Stir-Fry com legumes"
          className="h-full w-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 transition-all duration-500 ease-out md:group-hover:from-black/80" />
      </div>

      <div className="absolute inset-0 flex w-full flex-col justify-end gap-y-4 p-4 sm:p-6 md:p-8">
        <div className="md:translate-y-16 md:transform md:transition-transform md:duration-500 md:ease-out md:group-hover:translate-y-0">
          <Text
            as="h2"
            type={Text.Type.HeadingOne}
            weight={Text.Weight.Medium}
            className="font-lora text-2xl leading-tight font-semibold text-green-50 sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Tofu Stir-Fry com legumes
          </Text>

          <Text
            as="p"
            type={Text.Type.BodyOne}
            weight={Text.Weight.Medium}
            className="font-maitree mt-1 text-sm text-green-50/90 sm:text-base md:text-lg"
          >
            Tofu com legumes em molho agridoce.
          </Text>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-maitree flex flex-wrap items-center gap-x-4 font-semibold text-green-50 transition-all duration-500 ease-out sm:gap-x-6 md:translate-y-8 md:transform md:opacity-0 md:delay-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <div className="flex items-center gap-1 text-sm sm:text-base">
              <ClockOutlinedIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>30 min</span>
            </div>
            <div className="flex items-center gap-1 text-sm sm:text-base">
              <UsersOutlinedIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>4 porções</span>
            </div>
            {rating && (
              <div className="mt-1 flex gap-1 sm:mt-0">
                <StarRating
                  rating={rating}
                  iconClassName="!text-green-50 !w-4 !h-4 sm:!w-5 sm:h-5"
                />
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="font-lora w-full cursor-pointer rounded-full bg-green-50 px-6 py-2.5 text-sm text-green-500 italic transition-all duration-500 ease-out sm:w-auto sm:text-base md:translate-y-8 md:transform md:opacity-0 md:delay-200 md:group-hover:translate-y-0 md:group-hover:scale-105 md:group-hover:opacity-100"
          >
            Ver receita
          </Button>
        </div>
      </div>
    </div>
  );
}
