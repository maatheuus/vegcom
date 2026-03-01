"use client";

import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import type { PostCardDataProps } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { slugify } from "@/shared/utils";
import {
  BookmarkIcon,
  ChatCircleTextIcon,
  DotsThreeIcon,
  EyeSlashIcon,
  FlagIcon,
  ShareFatIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AvatarGroup } from "./AvatarGroup";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: PostCardDataProps;
  children: React.ReactNode;
  variant?: "default" | "image" | "announcement";
}

export default function PostCardRoot({
  className,
  data,
  variant,
  children,
  ...props
}: Props) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.postLikes);
  const [isSaved, setIsSaved] = useState(false);
  const postSlug = slugify(data.postTitle);
  const postUrl = `/community/${data.id}/${postSlug}`;

  const formattedPostDate = formatDistance(
    new Date(data.postDate),
    new Date(),
    { addSuffix: true, includeSeconds: true, locale: dateFormatDistanceLocale },
  );

  const handleCardClick = () => {
    router.push(postUrl);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? (likesCount || 0) - 1 : (likesCount || 0) + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();

    const url = `${window.location.origin}${postUrl}`;
    if (navigator.share) {
      navigator
        .share({
          title: data.postTitle,
          text: data.postContent.postResources?.content,
          url,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported", url);
    }
  };

  return (
    <Col
      onClick={handleCardClick}
      className={clsx(
        "w-full cursor-pointer rounded-2xl border-b border-b-gray-100 py-5 transition-colors first-of-type:mt-4 hover:bg-green-100/35 md:px-4",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <Row className="mb-4 w-full justify-between">
        <Row className="items-center gap-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
              {data.user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Row className="items-center gap-x-2">
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="text-gray-900"
            >
              {data.user.name}
            </Text>
            <span className="size-0.5 rounded-full bg-green-500"></span>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Normal}
              className="text-black-100 font-lora opacity-60"
            >
              {formattedPostDate}
            </Text>
          </Row>
        </Row>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className={variant === "announcement" ? "hidden" : ""}
          >
            <Button.Icon
              variant="text"
              onClick={(e) => e.stopPropagation()}
              className="z-50 cursor-pointer rounded-full border border-transparent px-3 transition-colors hover:border-green-100 hover:bg-green-100 data-[state=open]:bg-green-100"
              icon={<DotsThreeIcon size={22} />}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-green-500 text-green-50"
          >
            <DropdownMenuItem
              onClick={handleSave}
              className="cursor-pointer gap-x-3 py-2.5 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-green-50"
            >
              <BookmarkIcon size={18} weight={isSaved ? "fill" : "regular"} />
              Salvar post
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-x-3 py-2.5 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-green-50">
              <EyeSlashIcon size={18} />
              Ocultar
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-x-3 py-2.5 text-red-400 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-red-400">
              <FlagIcon size={18} />
              Denunciar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>

      {children}

      <Row className="items-baseline justify-between">
        <Row className="mt-3 items-center gap-x-3">
          {data.comments.comments &&
            data.comments.comments.length > 0 &&
            variant !== "announcement" && (
              <>
                <AvatarGroup
                  comments={data.comments.comments}
                  className="max-md:hidden"
                />
                <span className="size-0.5 rounded-full bg-green-500 max-md:hidden"></span>
              </>
            )}

          {variant !== "announcement" && (
            <>
              <Button.Icon
                variant="text"
                className="cursor-pointer rounded-full !p-1 transition-colors hover:bg-green-100"
                leftIcon={
                  <ChatCircleTextIcon size={18} className="text-green-500" />
                }
              >
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  weight={Text.Weight.Medium}
                  className="text-green-500"
                >
                  {data.comments.commentsNumber || 0}
                </Text>
              </Button.Icon>
              <span className="size-0.5 rounded-full bg-green-500"></span>
            </>
          )}

          <Button.Icon
            onClick={handleLike}
            className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-1 hover:bg-green-100"
            variant="text"
            leftIcon={
              <SparkleIcon size={16} weight={isLiked ? "fill" : "regular"} />
            }
          >
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora flex items-center gap-x-1 font-bold text-green-500 italic"
            >
              {likesCount}
            </Text>
          </Button.Icon>

          <span className="size-0.5 rounded-full bg-green-500"></span>

          <Button.Icon
            onClick={handleShare}
            className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-1 hover:bg-green-100"
            variant="text"
            leftIcon={<ShareFatIcon size={16} weight="regular" />}
          >
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora flex items-center gap-x-1 font-bold text-green-500 italic"
            >
              Compartilhar
            </Text>
          </Button.Icon>
        </Row>
      </Row>
    </Col>
  );
}
