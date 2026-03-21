"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import {
  useCreateComment,
  useDeleteComment,
  useGetCommentsByRecipe,
  useToggleLike,
} from "@/features/comments";
import { useToast } from "@/shared/hooks/use-toast";
import { usePagination } from "@/shared/hooks/usePagination";
import Col from "@/shared/ui/Layout/Helpers/Col";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";
import Text from "@/shared/ui/Text";
import { ChatTeardropTextIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import ReviewForm from "./ReviewForm";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  recipeId: number;
}

const ITEMS_PER_PAGE = 4;

const CommentsSection = memo(function CommentsSection({
  className,
  recipeId,
  ...props
}: Props) {
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);
  const { toast } = useToast();

  const { data: user } = useGetUser();
  const currentUserId = user?.id;

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    error: commentsError,
  } = useGetCommentsByRecipe(recipeId);

  const { mutate: createComment, isPending: isCreating } = useCreateComment();

  const { mutate: toggleLike } = useToggleLike(recipeId);

  const { mutate: deleteComment } = useDeleteComment(recipeId);

  const comments = commentsData?.data || [];

  const {
    currentItems,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
    hasNextPage,
    hasPreviousPage,
    isLoading: isPaginationLoading,
  } = usePagination({
    items: comments,
    itemsPerPage: ITEMS_PER_PAGE,
    loadingDelay: 0,
    queryKey: "comments_page",
  });

  const isLoading = isLoadingComments || isPaginationLoading;

  const handlePostReview = useCallback(() => {
    if (newRating === 0) return;
    if (newReview.trim().length > 0 && newReview.trim().length < 3) return;

    if (!currentUserId) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para comentar.",
        variant: "destructive",
      });
      return;
    }

    createComment(
      {
        recipeId,
        userId: currentUserId,
        text:
          newReview.trim() ||
          `Avaliação de ${newRating} estrela${newRating > 1 ? "s" : ""}`,
        rating: newRating,
      },
      {
        onSuccess: () => {
          setNewReview("");
          setNewRating(0);
          goToPage(1);
          toast({
            title: "Comentário enviado!",
            description: "Seu comentário foi publicado com sucesso.",
          });
        },
        onError: () => {
          toast({
            title: "Erro ao enviar comentário",
            description: "Tente novamente mais tarde.",
            variant: "destructive",
          });
        },
      },
    );
  }, [
    newReview,
    newRating,
    currentUserId,
    recipeId,
    createComment,
    goToPage,
    toast,
  ]);

  const handleLike = useCallback(
    (commentId: number) => {
      if (!currentUserId) {
        toast({
          title: "Atenção",
          description: "Você precisa estar logado para curtir.",
          variant: "destructive",
        });
        return;
      }
      toggleLike(commentId);
    },
    [currentUserId, toggleLike, toast],
  );

  const handleDelete = useCallback(
    (commentId: number) => {
      deleteComment(commentId, {
        onSuccess: () => {
          toast({
            title: "Comentário excluído",
            description: "Seu comentário foi removido.",
          });
        },
        onError: () => {
          toast({
            title: "Erro ao excluir",
            description: "Não foi possível excluir o comentário.",
            variant: "destructive",
          });
        },
      });
    },
    [deleteComment, toast],
  );

  const shouldShowPagination = comments.length > ITEMS_PER_PAGE;

  return (
    <Col
      className={clsx(
        "items-start gap-y-6 border-t border-t-green-200 pt-6",
        className || "",
      )}
      role="region"
      aria-label="Seção de comentários"
      {...props}
    >
      {currentUserId ? (
        <ReviewForm
          rating={newRating}
          review={newReview}
          onRatingChange={setNewRating}
          onReviewChange={setNewReview}
          onPost={handlePostReview}
          isSubmitting={isCreating}
          error={
            newReview.trim().length > 0 && newReview.trim().length < 3
              ? "O comentário deve ter pelo menos 3 caracteres."
              : undefined
          }
        />
      ) : (
        <Col className="w-full items-center rounded-md border border-green-200 py-4">
          <Text type={Text.Type.BodyThree} className="text-green-500">
            Faça login para deixar um comentário
          </Text>
        </Col>
      )}

      {currentItems.length > 0 && (
        <Text
          type={Text.Type.HeadingFive}
          weight={Text.Weight.Medium}
          className="text-green-500"
          as="h2"
        >
          Comentários
        </Text>
      )}

      {commentsError && (
        <Col className="w-full items-center py-4">
          <Text type={Text.Type.BodyThree} className="text-red-500">
            Erro ao carregar comentários. Tente novamente.
          </Text>
        </Col>
      )}

      <div
        role="list"
        aria-label="Lista de comentários"
        className="w-full space-y-8"
      >
        {isLoading ? (
          <CommentSkeleton count={ITEMS_PER_PAGE} />
        ) : currentItems.length > 0 ? (
          currentItems.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isLiked={comment.isLikedByCurrentUser}
              onLike={() => handleLike(comment.id)}
              currentUserId={currentUserId}
              onDelete={
                currentUserId === comment.user.id
                  ? () => handleDelete(comment.id)
                  : undefined
              }
            />
          ))
        ) : (
          <Col className="items-center py-8 opacity-60">
            <ChatTeardropTextIcon size={48} className="text-green-500" />
            <Text
              type={Text.Type.BodyThree}
              className="mt-2 text-center text-green-500"
            >
              Nenhum comentário ainda. <br /> Seja o primeiro a comentar!
            </Text>
          </Col>
        )}
      </div>

      {shouldShowPagination && (
        <div className="block w-full">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  disabled={!hasPreviousPage || isLoading}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) =>
                pageNumber === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => goToPage(pageNumber as number)}
                      isActive={currentPage === pageNumber}
                      disabled={isLoading}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  disabled={!hasNextPage || isLoading}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Col>
  );
});

export default CommentsSection;
