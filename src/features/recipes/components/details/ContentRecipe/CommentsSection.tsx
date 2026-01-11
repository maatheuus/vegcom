"use client";

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

import type { RecipeComment, RecipeUser } from "@/features/recipes/api/types";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import ReviewForm from "./ReviewForm";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  comments: RecipeComment[];
  user: RecipeUser;
  recipeId: number;
}

const ITEMS_PER_PAGE = 4;

const CommentsSection = memo(function CommentsSection({
  className,
  comments,
  user,
  recipeId,
  ...props
}: Props) {
  const [localComments, setLocalComments] = useState<RecipeComment[]>(comments);
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);
  const [likedComments, setLikedComments] = useState<{ [id: number]: boolean }>(
    {},
  );
  const [likesCount, setLikesCount] = useState<{ [id: number]: number }>(
    Object.fromEntries(comments.map((c) => [c.id, c.likesCount])),
  );

  console.log(user);
  const {
    currentItems,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
    hasNextPage,
    hasPreviousPage,
    isLoading,
  } = usePagination({
    items: localComments,
    itemsPerPage: ITEMS_PER_PAGE,
    loadingDelay: 0,
    queryKey: "comments_page",
  });

  const handlePostReview = useCallback(() => {
    if (!newReview) return;
    const nextId = localComments.length
      ? Math.max(...localComments.map((c) => c.id)) + 1
      : 1;

    const review: RecipeComment = {
      id: nextId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      isLikedByCurrentUser: false,
      recipeId,
      user,
      likesCount: 0,
      content: newReview,
    };
    setLocalComments((prev) => [review, ...prev]);
    setNewReview("");
    setNewRating(0);
    goToPage(1);
  }, [newReview, localComments, goToPage]);

  const handleLike = useCallback(
    (id: number) => {
      setLikedComments((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      setLikesCount((prev) => {
        const alreadyLiked = likedComments[id] ?? false;
        const currentLikes = prev[id] ?? 0;

        return {
          ...prev,
          [id]: currentLikes + (alreadyLiked ? -1 : 1),
        };
      });
    },
    [likedComments],
  );

  const shouldShowPagination = localComments.length > ITEMS_PER_PAGE;

  const localComment = {
    id: 1,
    author: "Matheus",
    avatarUrl: "https://github.com/matheus.png",
    timeAgo: "2 days ago",
    content: "This is a comment",
    likes: 1,
  };

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
      <ReviewForm
        rating={newRating}
        review={newReview}
        onRatingChange={setNewRating}
        onReviewChange={setNewReview}
        onPost={handlePostReview}
      />
      <Text
        type={Text.Type.HeadingFive}
        weight={Text.Weight.Medium}
        className="text-green-500"
        as="h2"
      >
        Comentários
      </Text>
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
              comment={localComment}
              likes={likesCount[comment.id] ?? comment.likesCount}
              isLiked={!!likedComments[comment.id]}
              onLike={() => handleLike(comment.id)}
            />
          ))
        ) : (
          <Col className="items-center py-8 opacity-60">
            <ChatTeardropTextIcon size={48} className="text-green-500" />
            <Text
              type={Text.Type.BodyThree}
              className="mt-2 text-center text-green-900"
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
