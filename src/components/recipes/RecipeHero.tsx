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

export function RecipeHero({
  className,
  rating,
  ...props
}: RecipeHeroProps) {
  return (
    <div
      className={clsx("relative rounded-lg overflow-hidden group", className)}
      {...props}
    >
      <div className="aspect-[21/9] sm:aspect-[21/9] relative">
        <Image
          src={food}
          fill
          alt="Tofu Stir-Fry com legumes"
          className="object-cover w-full h-full md:group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/50 to-transparent md:from-black/70 md:via-transparent" />

        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/30 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full">
        <div className="transform md:transition-transform md:duration-300 md:group-hover:-translate-y-4">
          <Text
            as="h2"
            type={Text.Type.HeadingOne}
            weight={Text.Weight.Medium}
            className="text-green-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Tofu Stir-Fry com legumes
          </Text>

          <Text
            as="p"
            type={Text.Type.BodyOne}
            weight={Text.Weight.Medium}
            className="text-gray-200 text-sm sm:text-base md:text-lg mt-1 sm:mt-2"
          >
            Tofu com legumes em molho agridoce.
          </Text>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 md:gap-8 
                      md:transform md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:transition-all md:duration-300
                      mt-4 sm:mt-6"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-1 text-gray-200 text-sm sm:text-base">
              <ClockOutlinedIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>30 min</span>
            </div>

            <div className="flex items-center gap-1 text-gray-200 text-sm sm:text-base">
              <UsersOutlinedIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>4 porções</span>
            </div>

            {rating && (
              <div className="flex gap-1">
                <StarRating
                  rating={rating}
                  iconClassName="!text-green-50  !w-4 !h-4 sm:!w-5 sm:!h-5"
                />
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="w-full cursor-pointer sm:w-auto sm:ml-auto bg-green-50 text-green-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
          >
            Ver receita
          </Button>
        </div>
      </div>
    </div>
  );
}
