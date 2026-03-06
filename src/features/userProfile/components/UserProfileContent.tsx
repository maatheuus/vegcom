import { UserProfileDetails } from "../types";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import Text from "@/shared/ui/Text";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Image from "next/image";
import PostCardRoot from "@/features/community/components/Post/Cards/Root";
import RecipeCard from "@/features/recipes/components/Cards/RecipeCard";
import Button from "@/shared/ui/Button";

interface UserProfileContentProps {
  user: UserProfileDetails;
  activeTab: "recipes" | "posts";
}

export function UserProfileContent({ user, activeTab }: UserProfileContentProps) {
  const { data: currentUser } = useGetUser();
  const isAuthenticated = !!currentUser?.id;

  if (!isAuthenticated) {
    return (
      <Col className="relative w-full overflow-hidden min-h-[400px]">
        {/* Blurred Content Preview */}
        <Col className="absolute inset-0 filter blur-sm pointer-events-none opacity-50 select-none">
          {activeTab === "recipes" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 p-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-xl w-full" />
              ))}
            </div>
          )}
        </Col>

        {/* Overlay CTA */}
        <Col className="absolute inset-0 z-10 items-center justify-center bg-white/30 backdrop-blur-[2px]">
          <Col className="bg-white p-8 rounded-2xl shadow-lg items-center text-center gap-y-4 max-w-md mx-4">
            <Text as="h3" type={Text.Type.H4} weight={Text.Weight.Bold}>
              Faça login para continuar
            </Text>
            <Text as="p" type={Text.Type.BodyThree} className="text-gray-600">
              Cadastre-se ou faça login para ver as receitas e publicações completas deste chef na comunidade.
            </Text>
            <Button
              className="mt-2 w-full bg-green-500 text-white"
              onClick={() => {
                window.location.href = "/auth";
              }}
            >
              Fazer Login
            </Button>
          </Col>
        </Col>
      </Col>
    );
  }

  return (
    <Col className="w-full">
      {activeTab === "recipes" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.recipes.length > 0 ? (
            user.recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe as any}
                favoriteRecipes={recipe.isFavorite || false}
                handleFavorite={() => {}}
              />
            ))
          ) : (
            <Col className="col-span-full items-center py-12 text-center text-gray-500">
              <Text as="p">Este usuário ainda não publicou nenhuma receita.</Text>
            </Col>
          )}
        </div>
      ) : (
        <Col className="gap-y-6">
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
              <PostCardRoot key={post.id} data={post}>
                <div className="py-2">
                  <Text as="p" type={Text.Type.BodyThree}>
                    {post.postContent?.postResources?.content || post.postTitle}
                  </Text>
                </div>
              </PostCardRoot>
            ))
          ) : (
            <Col className="items-center py-12 text-center text-gray-500">
              <Text as="p">Este usuário ainda não fez publicações na comunidade.</Text>
            </Col>
          )}
        </Col>
      )}
    </Col>
  );
}
