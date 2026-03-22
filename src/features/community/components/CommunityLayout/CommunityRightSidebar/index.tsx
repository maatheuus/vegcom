"use client";

import { recipeApi } from "@/features/recipes";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useQuery } from "@tanstack/react-query";
import ChatWidget from "./ChatWidget";
import RecipeSuggestions from "./RecipeSuggestions";

export default function CommunityRightSidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ["sidebar-recipes"],
    queryFn: recipeApi.getRecipes,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Col className="h-full gap-y-4 overflow-y-auto py-2 pl-5">
      <ChatWidget />
      <RecipeSuggestions data={data} isLoading={isLoading} />
    </Col>
  );
}
