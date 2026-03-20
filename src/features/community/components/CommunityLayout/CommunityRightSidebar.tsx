"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { recipeApi } from "@/features/recipes/api/recipesApi";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  ArrowBendUpRightIcon,
  ChatCircleTextIcon,
  ChefHatIcon,
  ClockIcon,
  LockSimpleIcon,
  PaperPlaneRightIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ChatWidget() {
  const { data: user } = useGetUser();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const isAuthenticated = !!user?.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push(`/chat?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  return (
    <Col className="gap-y-3 rounded-xl border border-green-200/60 bg-green-50 p-3">
      <Row className="items-center gap-x-2">
        <ChatCircleTextIcon size={15} className="text-green-500" />
        <Text
          as="p"
          type={Text.Type.BodyFive}
          weight={Text.Weight.Bold}
          className="font-lora text-green-500 italic"
        >
          Chat VegCom
        </Text>
        <Link
          href="/chat"
          className="ml-auto text-green-500/40 transition-colors hover:text-green-500"
        >
          <ArrowBendUpRightIcon size={13} />
        </Link>
      </Row>

      <Text
        as="p"
        type={Text.Type.BodyFive}
        className="font-maitree text-green-500/60"
      >
        Tire dúvidas sobre receitas, ingredientes e vida vegana.
      </Text>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="relative">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pergunte algo..."
            className="font-maitree w-full rounded-lg border border-green-200 bg-white/60 py-2 pr-9 pl-3 text-xs text-green-500 placeholder:text-green-500/40 focus:border-green-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!prompt.trim()}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-green-500/40 transition-colors hover:text-green-500 disabled:opacity-30"
          >
            <PaperPlaneRightIcon size={14} />
          </button>
        </form>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-x-1.5 rounded-lg border border-green-200/60 bg-green-100/40 px-3 py-2 transition-colors hover:bg-green-100"
        >
          <LockSimpleIcon size={12} className="text-green-500/50" />
          <Text
            as="span"
            type={Text.Type.BodyFive}
            className="font-maitree text-green-500/60"
          >
            Faça login para usar o chat
          </Text>
        </Link>
      )}
    </Col>
  );
}

function RecipeSuggestions() {
  const { data, isLoading } = useQuery({
    queryKey: ["sidebar-recipes"],
    queryFn: recipeApi.getRecipes,
    staleTime: 1000 * 60 * 5,
  });

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

export default function CommunityRightSidebar() {
  return (
    <Col className="h-full gap-y-4 overflow-y-auto py-2 pl-5">
      <ChatWidget />
      <RecipeSuggestions />
    </Col>
  );
}
