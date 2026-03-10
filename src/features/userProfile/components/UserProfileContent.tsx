import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import PostCardRoot from "@/features/community/components/Post/Cards/Root";
import RecipeCard from "@/features/recipes/components/Cards/RecipeCard";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import type { UserProfileDetails } from "../types";
import { prepareHtmlContent } from "@/shared/utils";
import { usePagination } from "@/shared/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";

interface UserProfileContentProps {
  user: UserProfileDetails;
  activeTab: "recipes" | "posts";
}

export function UserProfileContent({
  user,
  activeTab,
}: UserProfileContentProps) {
  const { data: currentUser } = useGetUser();
  const isAuthenticated = !!currentUser?.id;

  const {
    currentItems: currentRecipes,
    currentPage: currentRecipesPage,
    goToPage: goToRecipesPage,
    goToNextPage: goToNextRecipesPage,
    goToPreviousPage: goToPreviousRecipesPage,
    getPageNumbers: getRecipesPageNumbers,
    hasNextPage: hasNextRecipesPage,
    hasPreviousPage: hasPreviousRecipesPage,
    isLoading: isLoadingRecipes,
  } = usePagination({
    items: user?.recipes || [],
    itemsPerPage: 6,
    queryKey: "recipesPage",
  });

  const {
    currentItems: currentPosts,
    currentPage: currentPostsPage,
    goToPage: goToPostsPage,
    goToNextPage: goToNextPostsPage,
    goToPreviousPage: goToPreviousPostsPage,
    getPageNumbers: getPostsPageNumbers,
    hasNextPage: hasNextPostsPage,
    hasPreviousPage: hasPreviousPostsPage,
    isLoading: isLoadingPosts,
  } = usePagination({
    items: user?.posts || [],
    itemsPerPage: 5,
    queryKey: "postsPage",
  });

  if (!isAuthenticated) {
    return (
      <Col className="relative min-h-[400px] w-full overflow-hidden">
        <Col className="pointer-events-none absolute inset-0 opacity-50 blur-sm filter select-none">
          {activeTab === "recipes" ? (
            <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 p-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 w-full rounded-xl bg-gray-200" />
              ))}
            </div>
          )}
        </Col>

        <Col className="absolute inset-0 z-10 items-center justify-center bg-white/30 backdrop-blur-[2px]">
          <Col className="mx-4 max-w-md items-center gap-y-4 rounded-2xl bg-white p-8 text-center shadow-lg">
            <Text
              as="h3"
              type={Text.Type.HeadingFour}
              weight={Text.Weight.Bold}
              className="font-maitree text-green-500"
            >
              Faça login para continuar
            </Text>
            <Text
              as="p"
              type={Text.Type.BodyThree}
              className="text-black-100 font-lora"
            >
              Cadastre-se ou faça login para ver as receitas e publicações
              completas deste chef na comunidade.
            </Text>
            <Button.Link
              href="/login"
              className="mt-2 w-full bg-green-500 text-white"
            >
              Fazer Login
            </Button.Link>
          </Col>
        </Col>
      </Col>
    );
  }

  return (
    <Col className="w-full">
      {activeTab === "recipes" ? (
        <Col className="gap-y-6">
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isLoadingRecipes ? "opacity-50 transition-opacity" : "transition-opacity"}`}
          >
            {currentRecipes.length > 0 ? (
              currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={
                    recipe as unknown as React.ComponentProps<
                      typeof RecipeCard
                    >["recipe"]
                  }
                />
              ))
            ) : (
              <Col className="col-span-full items-center py-12 text-center text-gray-500">
                <Text as="p">
                  Este usuário ainda não publicou nenhuma receita.
                </Text>
              </Col>
            )}
          </div>

          {(user?.recipes?.length || 0) > 6 && currentRecipes.length > 0 && (
            <div className="mt-4 block">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={goToPreviousRecipesPage}
                      disabled={!hasPreviousRecipesPage || isLoadingRecipes}
                    />
                  </PaginationItem>

                  {getRecipesPageNumbers().map((pageNumber, index) =>
                    pageNumber === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => goToRecipesPage(pageNumber as number)}
                          isActive={currentRecipesPage === pageNumber}
                          disabled={isLoadingRecipes}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={goToNextRecipesPage}
                      disabled={!hasNextRecipesPage || isLoadingRecipes}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Col>
      ) : (
        <Col className="gap-y-6">
          <Col
            className={`gap-y-6 ${isLoadingPosts ? "opacity-50 transition-opacity" : "transition-opacity"}`}
          >
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => {
                const content = post.postContent.postResources?.content;
                const contentHTML = post.postContent.postResources?.contentHTML;

                return (
                  <PostCardRoot key={post.id} data={post} className="!mt-0">
                    <Col className="h-fit w-full gap-y-1 text-green-500">
                      <Text
                        as="h2"
                        type={Text.Type.BodyTwo}
                        weight={Text.Weight.Medium}
                        className="font-lora font-semibold"
                      >
                        {post.postTitle}
                      </Text>

                      {contentHTML ? (
                        <div
                          className="font-maitree mt-2 text-base break-words text-green-500 [&>p]:text-justify [&>p]:hyphens-auto"
                          lang="pt-BR"
                          dangerouslySetInnerHTML={{
                            __html: prepareHtmlContent(contentHTML),
                          }}
                        />
                      ) : (
                        <Text
                          as="p"
                          type={Text.Type.BodyFour}
                          weight={Text.Weight.Normal}
                          className="font-maitree mt-2 text-justify text-base hyphens-auto whitespace-pre-wrap"
                        >
                          {content}
                        </Text>
                      )}
                    </Col>
                  </PostCardRoot>
                );
              })
            ) : (
              <Col className="items-center py-12 text-center text-gray-500">
                <Text as="p">
                  Este usuário ainda não fez publicações na comunidade.
                </Text>
              </Col>
            )}
          </Col>

          {user.posts.length > 5 && currentPosts.length > 0 && (
            <div className="mt-4 block">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={goToPreviousPostsPage}
                      disabled={!hasPreviousPostsPage || isLoadingPosts}
                    />
                  </PaginationItem>

                  {getPostsPageNumbers().map((pageNumber, index) =>
                    pageNumber === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => goToPostsPage(pageNumber as number)}
                          isActive={currentPostsPage === pageNumber}
                          disabled={isLoadingPosts}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={goToNextPostsPage}
                      disabled={!hasNextPostsPage || isLoadingPosts}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Col>
      )}
    </Col>
  );
}
