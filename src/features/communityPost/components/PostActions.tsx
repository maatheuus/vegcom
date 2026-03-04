"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { toggleLike } from "@/features/community/api/communityApi";
import { usePostInteraction } from "@/features/communityPost/context/PostInteractionContext";
import type { PostCardDataProps } from "@/shared";
import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import { slugify } from "@/shared/utils";
import {
  ChatCircleTextIcon,
  ShareFatIcon,
  SparkleIcon,
} from "@phosphor-icons/react/ssr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Props {
  commentsCount: number;
  post: PostCardDataProps;
  postByAdmin?: boolean;
}

export default function PostActions({
  commentsCount,
  post,
  postByAdmin,
}: Props) {
  const { setIsCommentOpen, commentInputRef } = usePostInteraction();
  const { data: user } = useGetUser();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(() => {
    if (post.likes && user?.id) {
      return post.likes.some((like) => String(like.userId) === String(user.id));
    }
    return false;
  });
  const [likesCount, setLikesCount] = useState(post.postLikes);

  const postSlug = slugify(post.postTitle);
  const postUrl = `/community/${post.id}/${postSlug}`;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();

    const url = `${window.location.origin}${postUrl}`;
    if (navigator.share) {
      navigator
        .share({
          title: post.postTitle,
          text: post.postContent.postResources?.content,
          url,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported", url);
    }
  };

  const handleCommentClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setIsCommentOpen(true);
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 50);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }

    if (!post) return;

    const { postLikes } = await toggleLike(String(post.id));
    setIsLiked(!isLiked);
    setLikesCount(postLikes);
  };

  useEffect(() => {
    if (post.likes && user?.id) {
      setIsLiked(
        post.likes.some((like) => String(like.userId) === String(user.id)),
      );
    }
  }, [post.likes, user?.id]);

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="flex w-full flex-col items-center gap-x-3 md:flex-row">
        <div className="flex w-full items-center justify-around gap-x-3 md:w-fit">
          <Button.Icon
            variant="text"
            onClick={handleLike}
            className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-2 transition-colors hover:bg-green-100"
            leftIcon={
              <SparkleIcon size={16} weight={isLiked ? "fill" : "regular"} />
            }
          >
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora font-bold text-green-500 italic"
            >
              {likesCount}
            </Text>
          </Button.Icon>

          <span className="size-0.5 rounded-full bg-green-500"></span>

          {!postByAdmin && (
            <>
              <Button.Icon
                variant="text"
                onClick={handleCommentClick}
                className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-2 transition-colors hover:bg-green-100"
                leftIcon={
                  <ChatCircleTextIcon size={20} className="text-green-500" />
                }
              >
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  weight={Text.Weight.Medium}
                  className="text-green-500"
                >
                  {commentsCount}
                </Text>
              </Button.Icon>
              <span className="size-0.5 rounded-full bg-green-500"></span>
            </>
          )}
        </div>

        <Button.Icon
          variant="text"
          onClick={handleShare}
          className="flex w-full cursor-pointer items-center gap-x-1.5 rounded-full p-2 transition-colors hover:bg-green-100 md:w-fit"
          leftIcon={<ShareFatIcon size={20} className="text-green-500" />}
        >
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="font-lora font-bold text-green-500 italic"
          >
            Compartilhar
          </Text>
        </Button.Icon>
      </div>
    </div>
  );
}
