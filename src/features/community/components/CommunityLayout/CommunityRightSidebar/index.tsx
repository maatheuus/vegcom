import { recipeApi } from "@/features/recipes";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
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
    <aside className="sticky top-20 hidden h-full w-full max-w-[260px] shrink-0 self-start overflow-hidden border-l border-green-200/50 bg-green-50 lg:block">
      <Col className="h-full gap-y-4 overflow-y-auto py-2 pl-5">
        <ChatWidget />
        <RecipeSuggestions data={data} isLoading={isLoading} />
        <div className="mt-auto border-t border-green-200/30 pt-3">
          <Text
            type={Text.Type.BodyFive}
            className="font-maitree text-[10px] text-green-800/50"
          >
            © {new Date().getFullYear()} VegCom. Todos os direitos reservados.
          </Text>
          <Text
            type={Text.Type.BodyFive}
            className="font-maitree text-[10px] text-green-800/40"
          >
            Dedicado ao meu grande amigo, obrigado por tudo Rafa!
          </Text>
        </div>
      </Col>
    </aside>
  );
}
