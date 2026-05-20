"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { toggleLike } from "@/features/community/api/communityApi";
import { usePostInteraction } from "@/features/communityPost/context/PostInteractionContext";
import type { PostCardDataProps } from "@/shared";
import { toast } from "@/shared/hooks/use-toast";
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
      return post.likes.some(
        (like) => String(like.userId) === String(user?.id),
      );
    }
    return false;
  });
  const [likesCount, setLikesCount] = useState(post.postLikes);

  const postSlug = slugify(post.postTitle);
  const postUrl = `/community/${post.id}/${postSlug}`;

  const handleShareOld = (e: React.MouseEvent) => {
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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const url = `${window.location.origin}${postUrl}`;

    const content = post.postContent.postResources?.content ?? "";
    const summary = content.length > 150 ? `${content.substring(0, 150)}...` : content;

    const hashtags =
      post.postTags?.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ") ?? "";

    const shareText = `Confira este post de ${post.user?.name}: "${post.postTitle}"\n\n${summary}${hashtags ? `\n\n${hashtags}` : ""}\n\n${url}`;

    const shareData = {
      title: post.postTitle,
      text: shareText,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Sucesso",
          description: "Link e resumo copiados para a área de transferência!",
          variant: "success",
        });
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Erro ao compartilhar:", error);
      }
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
        post.likes.some((like) => String(like.userId) === String(user?.id)),
      );
    }
  }, [post.likes, user?.id]);

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <div className="grid grid-cols-3 md:flex md:items-center md:gap-x-1">
        <Button.Icon
          variant="text"
          onClick={handleLike}
          className="flex cursor-pointer flex-col items-center gap-y-1 rounded-xl p-2 transition-colors hover:bg-green-100 md:flex-row md:gap-x-1.5 md:gap-y-0 md:rounded-full"
          leftIcon={
            <SparkleIcon
              size={18}
              weight={isLiked ? "fill" : "regular"}
              className="text-green-500"
            />
          }
        >
          <Text
            as="p"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="font-lora font-bold text-green-500 italic"
          >
            <span className="md:hidden">
              {likesCount} {likesCount === 1 ? "Curtida" : "Curtidas"}
            </span>
            <span className="hidden md:inline">{likesCount}</span>
          </Text>
        </Button.Icon>

        <span className="hidden size-0.5 rounded-full bg-green-500 md:block" />

        {!postByAdmin && (
          <>
            <Button.Icon
              variant="text"
              onClick={handleCommentClick}
              className="flex cursor-pointer flex-col items-center gap-y-1 rounded-xl p-2 transition-colors hover:bg-green-100 md:flex-row md:gap-x-1.5 md:gap-y-0 md:rounded-full"
              leftIcon={
                <ChatCircleTextIcon size={18} className="text-green-500" />
              }
            >
              <Text
                as="p"
                type={Text.Type.BodyFive}
                weight={Text.Weight.Medium}
                className="text-green-500"
              >
                <span className="md:hidden">
                  {commentsCount}{" "}
                  {commentsCount === 1 ? "Comentário" : "Comentários"}
                </span>
                <span className="hidden md:inline">{commentsCount}</span>
              </Text>
            </Button.Icon>
            <span className="hidden size-0.5 rounded-full bg-green-500 md:block" />
          </>
        )}

        <Button.Icon
          variant="text"
          onClick={handleShare}
          className="flex cursor-pointer flex-col items-center gap-y-1 rounded-xl p-2 transition-colors hover:bg-green-100 md:flex-row md:gap-x-1.5 md:gap-y-0 md:rounded-full"
          leftIcon={<ShareFatIcon size={18} className="text-green-500" />}
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
