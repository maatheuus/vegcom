import Image from "next/image";
import Link from "next/link";
import StarRating from "../../community/AsideContent/StarRating";
import { ClockOutlinedIcon, UsersOutlinedIcon } from "../../icons";
import Col from "../../ui/Layout/Helpers/Col";
import Row from "../../ui/Layout/Helpers/Row";
import Text from "../../ui/Text";
import type { Recipe } from "../types";

export default function RecipeCard({
  recipe,
  onClick,
}: {
  recipe: Recipe;
  onClick?: () => void;
}) {
  const slug = recipe.title.trim().split(" ").join("-").toLowerCase();

  return (
    <Link
      href={`/recipes/${slug}`}
      className="group cursor-pointer !no-underline contents w-full h-full"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <div className="hidden md:block relative aspect-square rounded-md overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={300}
          loading="lazy"
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="text-green-50">
            <Text
              as="h3"
              type={Text.Type.HeadingThree}
              weight={Text.Weight.SemiBold}
              className="text-green-50 text-lg sm:text-xl md:text-2xl"
            >
              {recipe.title}
            </Text>
            {recipe.rating && (
              <div
                className="flex gap-1 mb-2 sm:mb-3"
                aria-label={`Avaliação: ${recipe.rating} estrelas`}
              >
                <StarRating
                  rating={recipe.rating}
                  iconClassName="!text-green-50 !w-4 !h-4 sm:!w-5 sm:!h-5"
                />
              </div>
            )}

            <Col className="gap-y-2 sm:gap-y-4">
              <Text
                as="p"
                type={Text.Type.BodyThree}
                weight={Text.Weight.Medium}
                className="text-gray-200 text-sm sm:text-base line-clamp-2 sm:line-clamp-3"
              >
                {recipe.description}
              </Text>

              <Row className="items-center gap-3 sm:gap-4 text-sm text-gray-200">
                {recipe.prepTime && (
                  <Row
                    className="items-center gap-1"
                    aria-label={`Tempo de preparo: ${recipe.prepTime}`}
                  >
                    <ClockOutlinedIcon className="w-4 h-4" aria-hidden="true" />
                    <Text
                      as="span"
                      type={Text.Type.BodyFour}
                      weight={Text.Weight.Normal}
                      className="text-gray-200 text-xs sm:text-sm"
                    >
                      {recipe.prepTime}
                    </Text>
                  </Row>
                )}
                {recipe.servings && (
                  <Row
                    className="items-center gap-1"
                    aria-label={`Rendimento: ${recipe.servings} porções`}
                  >
                    <UsersOutlinedIcon className="w-4 h-4" aria-hidden="true" />
                    <Text
                      as="span"
                      type={Text.Type.BodyFour}
                      weight={Text.Weight.Normal}
                      className="text-gray-200 text-xs sm:text-sm"
                    >
                      {recipe.servings} porções
                    </Text>
                  </Row>
                )}
              </Row>
            </Col>
          </div>
        </div>
      </div>

      <div className="md:hidden space-y-3 sm:space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={300}
            height={300}
            loading="lazy"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="px-2 sm:px-3">
          <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">
            {recipe.title}
          </h3>

          {recipe.rating && (
            <div
              className="flex gap-1 mb-2 sm:mb-3"
              aria-label={`Avaliação: ${recipe.rating} estrelas`}
            >
              <StarRating
                rating={recipe.rating}
                iconClassName=" !w-4 !h-4 sm:!w-5 sm:!h-5"
              />
            </div>
          )}

          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-500">
            {recipe.prepTime && (
              <div
                className="flex items-center gap-1"
                aria-label={`Tempo de preparo: ${recipe.prepTime}`}
              >
                <ClockOutlinedIcon className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs sm:text-sm">{recipe.prepTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div
                className="flex items-center gap-1"
                aria-label={`Rendimento: ${recipe.servings} porções`}
              >
                <UsersOutlinedIcon className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs sm:text-sm">
                  {recipe.servings} porções
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
