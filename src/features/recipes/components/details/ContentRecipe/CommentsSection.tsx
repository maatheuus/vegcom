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
import clsx from "clsx";
import { memo, useCallback, useState } from "react";

import type { Comment } from "../../types";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import ReviewForm from "./ReviewForm";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  comments: Comment[];
}

const ITEMS_PER_PAGE = 4;

const CommentsSection = memo(function CommentsSection({
  className,
  comments,
  ...props
}: Props) {
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(0);
  const [likedComments, setLikedComments] = useState<{ [id: number]: boolean }>(
    {},
  );
  const [likesCount, setLikesCount] = useState<{ [id: number]: number }>(
    Object.fromEntries(comments.map((c) => [c.id, c.likes])),
  );

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

    const review: Comment = {
      id: nextId,
      author: "You",
      timeAgo: "just now",
      content: newReview,
      likes: 0,
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
        ) : (
          currentItems.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              likes={likesCount[comment.id] ?? comment.likes}
              isLiked={!!likedComments[comment.id]}
              onLike={() => handleLike(comment.id)}
            />
          ))
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
