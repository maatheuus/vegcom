import type { GetRecipesResponse } from "@/features/recipes/api/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  ArrowBendUpRightIcon,
  ChefHatIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface RecipeSuggestionsProps {
  data: GetRecipesResponse | undefined;
  isLoading: boolean;
}
export default function RecipeSuggestions({
  data,
  isLoading,
}: RecipeSuggestionsProps) {
  const recipes = data?.data
    ? [...data.data].sort(() => Math.random() - 0.5).slice(0, 4)
    : [];

  return (
    <Col className="gap-y-3 rounded-xl border border-green-200/60 bg-green-50 p-3">
      <Row className="items-center gap-x-2">
        <ChefHatIcon size={15} className="text-green-500" />
        <Text
          as="p"
          type={Text.Type.BodyFive}
          weight={Text.Weight.Bold}
          className="font-lora text-green-500 italic"
        >
          Receitas pra você
        </Text>
        <Link
          href="/recipes"
          className="ml-auto text-green-500/40 transition-colors hover:text-green-500"
        >
          <ArrowBendUpRightIcon size={13} />
        </Link>
      </Row>

      {isLoading ? (
        <Col className="gap-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-green-100"
            />
          ))}
        </Col>
      ) : recipes.length === 0 ? (
        <Text
          as="p"
          type={Text.Type.BodyFive}
          className="font-maitree text-green-500/40"
        >
          Nenhuma receita disponível.
        </Text>
      ) : (
        <Col className="gap-y-1.5">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className="group block"
            >
              <Row className="items-center gap-x-2.5 rounded-lg p-1.5 transition-colors hover:bg-green-100/60">
                {recipe.images?.[0] && (
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={recipe.images[0]}
                      alt={recipe.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <Col className="min-w-0 gap-y-0.5">
                  <Text
                    as="p"
                    type={Text.Type.BodyFive}
                    weight={Text.Weight.Medium}
                    className="font-lora line-clamp-1 text-green-500"
                  >
                    {recipe.title}
                  </Text>
                  {recipe.cookTime && (
                    <Row className="items-center gap-x-1">
                      <ClockIcon size={10} className="text-green-500/40" />
                      <Text
                        as="span"
                        type={Text.Type.BodyFive}
                        className="font-maitree text-green-500/40"
                      >
                        {recipe.cookTime}
                      </Text>
                    </Row>
                  )}
                </Col>
              </Row>
            </Link>
          ))}
        </Col>
      )}
    </Col>
  );
}
