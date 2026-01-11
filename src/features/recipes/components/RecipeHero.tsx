import StarRating from "@/features/community/components/AsideContent/StarRating";
import type { Recipe } from "@/features/recipes/api/types";
import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import { ClockIcon, EyeIcon, UsersIcon } from "@phosphor-icons/react/ssr";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface RecipeHeroProps extends React.HTMLAttributes<HTMLLinkElement> {
  hightlightedRecipe: Recipe;
}

// featured recipe need to be the most viewed and rated
export function RecipeHero({ className, hightlightedRecipe }: RecipeHeroProps) {
  const { title, description, cookTime, quantity, rating, images, views, slug } =
    hightlightedRecipe;

  const image = images[0];

  return (
    <Link href={`/recipes/${slug}`} className={clsx("contents", className)}>
      <span className="sr-only">{title}</span>

      <div className="group relative min-h-[340px] overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:shadow-lg md:min-h-auto">
        <div className="relative min-h-[340px] md:aspect-[21/9] md:min-h-auto">
          <Image
            src={image}
            fill
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 transition-opacity duration-500 ease-out lg:opacity-0 lg:group-hover:opacity-100" />
        </div>

        <div className="absolute inset-0 flex w-full flex-col justify-end gap-y-4 p-4 sm:p-6 md:p-8">
          <div className="translate-y-0 opacity-100 transition-all duration-500 ease-out lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            <Text
              as="h2"
              type={Text.Type.HeadingOne}
              weight={Text.Weight.Medium}
              className="font-lora text-2xl leading-tight font-semibold text-green-50 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {title}
            </Text>

            <Text
              as="p"
              type={Text.Type.BodyOne}
              weight={Text.Weight.Medium}
              className="font-maitree mt-2 line-clamp-3 text-sm text-green-50/90 sm:text-base md:text-lg"
            >
              {description}
            </Text>
          </div>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-maitree flex translate-y-0 flex-wrap items-center gap-x-2 font-semibold text-green-50 opacity-100 transition-all delay-100 duration-500 ease-out sm:gap-x-6 lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              {rating && (
                <div className="flex gap-1">
                  <StarRating
                    rating={rating}
                    iconClassName="!text-green-50 !w-4 !h-4 sm:!w-5 sm:h-5"
                  />
                </div>
              )}
              <div className="flex items-center gap-1 text-sm sm:text-sm">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{cookTime}</span>
              </div>
              <div className="flex items-center gap-1 text-sm sm:text-sm">
                <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{quantity} porções</span>
              </div>
              {views && (
                <div className="flex items-center gap-1 text-sm sm:text-sm">
                  <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{views || 0}</span>
                </div>
              )}
            </div>

            <Button
              size="lg"
              className="font-lora w-full translate-y-0 cursor-pointer rounded-full bg-green-50 px-6 py-2.5 text-sm text-green-500 italic opacity-100 transition-all delay-200 duration-500 ease-out sm:w-auto sm:text-base lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:scale-105 lg:group-hover:opacity-100"
            >
              Ver receita
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
