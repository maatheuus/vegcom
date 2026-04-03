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
    <aside className="sticky top-20 hidden h-full w-[260px] shrink-0 self-start overflow-hidden border-l border-green-200/50 bg-green-50 lg:block">
      <Col className="h-full gap-y-4 overflow-y-auto py-2 pl-5">
        <ChatWidget />
        <RecipeSuggestions data={data} isLoading={isLoading} />
      </Col>
    </aside>
  );
}
