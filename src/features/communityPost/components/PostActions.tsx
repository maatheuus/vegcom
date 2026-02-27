"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
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
interface Props {
  likesCount: number;
  commentsCount: number;
  post: PostCardDataProps;
  hasHTMLTags?: boolean;
}

export default function PostActions({
  likesCount,
  commentsCount,
  post,
  hasHTMLTags = true,
}: Props) {
  const { setIsCommentOpen, commentInputRef } = usePostInteraction();
  const { data: user } = useGetUser();
  const router = useRouter();

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

  const handleLikeClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    console.log("liked!");
  };

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="flex w-full flex-col items-center gap-x-4 md:flex-row">
        <div className="flex w-full items-center justify-around gap-x-4 md:w-fit">
          <Button.Icon
            variant="text"
            onClick={handleLikeClick}
            className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-2 transition-colors hover:bg-green-100"
            leftIcon={<SparkleIcon size={20} className="text-green-500" />}
          >
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora font-bold text-green-500 italic"
            >
              {likesCount || 0} Curtidas
            </Text>
          </Button.Icon>

          {!hasHTMLTags && (
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
                {commentsCount || 0} Comentários
              </Text>
            </Button.Icon>
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
