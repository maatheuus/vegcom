"use client";

import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import type { PostCardDataProps } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { BookmarkIcon, SparkleIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { formatDistance, subDays } from "date-fns";
import { useState } from "react";
import CommentsModal from "../CommentsModal";
import { AvatarGroup } from "./AvatarGroup";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: PostCardDataProps;
  children: React.ReactNode;
  variant?: "default" | "image" | "announcement";
}

export default function PostCardRoot({
  className,
  data,
  children,
  variant = "default",
  ...props
}: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.postLikes);
  const [isSaved, setIsSaved] = useState(false);

  const formattedPostDate = formatDistance(
    subDays(new Date(data.postDate), 1),
    new Date(),
    { addSuffix: true, includeSeconds: true, locale: dateFormatDistanceLocale },
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? (likesCount || 0) - 1 : (likesCount || 0) + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Col
      className={clsx("w-full border-b border-b-gray-100 px-4 py-5", className)}
      {...props}
    >
      <Col>
        {/* Header */}
        <Row className="mb-4 w-full justify-between">
          <Row className="items-center gap-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {data.user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Col className="gap-y-0">
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.Medium}
                className="text-gray-900"
              >
                {data.user.name}
              </Text>
            </Col>
          </Row>

          <Button.Icon
            onClick={handleSave}
            variant="text"
            className="cursor-pointer rounded-full border border-green-100 px-3 transition-colors hover:bg-green-100"
            icon={
              <BookmarkIcon size={18} weight={isSaved ? "fill" : "regular"} />
            }
          />
        </Row>

        {children}

        <Row className="items-baseline justify-between">
          {data.comments.comments && data.comments.comments.length > 0 && (
            <Row className="mt-3 items-center gap-x-3 px-1">
              <AvatarGroup comments={data.comments.comments} />

              <span className="size-0.5 rounded-full bg-green-500"></span>

              {data.comments.haveComments && (
                <CommentsModal
                  variant={variant}
                  data={data}
                  isLiked={isLiked}
                  likesCount={likesCount || 0}
                />
              )}

              <span className="size-0.5 rounded-full bg-green-500"></span>

              <Button.Icon
                onClick={handleLike}
                className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-1 hover:bg-green-100"
                variant="text"
                leftIcon={
                  <SparkleIcon
                    size={16}
                    weight={isLiked ? "fill" : "regular"}
                  />
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
            </Row>
          )}
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Normal}
            className="text-black-100 font-lora opacity-60"
          >
            {formattedPostDate}
          </Text>
        </Row>
      </Col>
    </Col>
  );
}
