"use client";

import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import { memo, useCallback, useState } from "react";

import type { Comment } from "../../types";
import CommentCard from "./CommentCard";
import RecipeCommentsModal from "./RecipeCommentsModal";
import ReviewForm from "./ReviewForm";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  comments: Comment[];
}

const MAX_COMMENTS_LENGTH = 3;

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
  }, [newReview, localComments]);

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

  const visibleComments = localComments.slice(0, MAX_COMMENTS_LENGTH);
  const remainingComments = localComments.slice(MAX_COMMENTS_LENGTH);

  return (
    <Col
      className={clsx(
        "gap-y-6 pt-6 before:h-0.5 before:w-full before:rounded-full before:bg-green-200 before:content-['']",
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

      <div role="list" aria-label="Lista de comentários" className="space-y-8">
        {visibleComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            likes={likesCount[comment.id] ?? comment.likes}
            isLiked={!!likedComments[comment.id]}
            onLike={() => handleLike(comment.id)}
          />
        ))}
      </div>

      <RecipeCommentsModal
        data={remainingComments}
        likesCount={likesCount}
        likedComments={likedComments}
        handleLike={handleLike}
      >
        {remainingComments.length > 0 && (
          <Text
            type={Text.Type.BodyFive}
            className="w-fit cursor-pointer rounded-md p-1 text-green-500 transition-colors duration-200 hover:bg-green-100"
            role="button"
            tabIndex={0}
            aria-label={`Ver mais ${remainingComments.length} comentários`}
          >
            {`+${remainingComments.length} ${
              remainingComments.length > 1 ? "comentários" : "comentário"
            }`}
          </Text>
        )}
      </RecipeCommentsModal>
    </Col>
  );
});

export default CommentsSection;
