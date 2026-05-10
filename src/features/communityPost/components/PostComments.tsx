"use client";

import { getInitials } from "@/features/account/components/utils";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import type { PostComment } from "@/shared";
import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import EmptyState from "@/shared/ui/EmptyState";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { formatDistance } from "date-fns";
import Link from "next/link";
import CommentComposer from "./CommentComposer";
import ReplyButton from "./ReplyButton";
interface PostCommentsProps {
  comments?: PostComment[];
  uniqueUsers: { name: string; avatarUrl?: string }[];
  postByAdmin?: boolean;
  postId: string;
}

export default function PostComments({
  comments,
  uniqueUsers,
  postByAdmin,
  postId,
}: PostCommentsProps) {
  const { data: user } = useGetUser();

  if (postByAdmin) return;

  return (
    <Col className="mt-6 w-full gap-y-6 pb-10 md:px-4">
      <Col className="gap-y-4">
        <CommentComposer users={uniqueUsers} user={user} postId={postId} />

        <Col className="mt-4 gap-y-6">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <Row
                key={index}
                className="w-full items-start gap-x-2 md:gap-x-3"
              >
                <Link href={`/user/${comment.user?.id}`} className="contents">
                  <Avatar className="size-8 md:size-10">
                    <AvatarImage src={comment.user?.urlImage || ""} />
                    <AvatarFallback className="text-xs capitalize md:text-base">
                      {comment.user?.name
                        ? getInitials(comment.user.name)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <Col className="flex-1 gap-y-1">
                  <Row className="w-full items-baseline justify-between gap-x-2">
                    <Link
                      href={`/user/${comment.user?.id}`}
                      className="contents"
                    >
                      <Text
                        as="span"
                        weight={Text.Weight.Bold}
                        className="font-maitree text-xs text-green-500 md:text-base"
                      >
                        {comment.user?.name}
                      </Text>
                    </Link>
                    <Text
                      as="span"
                      type={Text.Type.BodyFive}
                      weight={Text.Weight.Medium}
                      className="text-black-100 font-lora opacity-60"
                    >
                      {formatDistance(
                        new Date(comment.commentDate),
                        new Date(),
                        {
                          addSuffix: true,
                          locale: dateFormatDistanceLocale,
                        },
                      )}
                    </Text>
                  </Row>

                  <Text
                    type={Text.Type.BodyFour}
                    className="font-maitree text-base leading-relaxed font-medium break-words whitespace-pre-wrap text-green-500"
                  >
                    {comment.commentContent.split(/(@\w+)/g).map((part, i) =>
                      part.startsWith("@") ? (
                        <span key={i} className="font-bold text-green-500">
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </Text>

                  <ReplyButton
                    username={comment.user?.name}
                    isAuthenticated={!!user}
                    className="w-fit"
                  />
                </Col>
              </Row>
            ))
          ) : (
            <EmptyState
              title="Nenhum comentário ainda"
              description="Seja o primeiro a comentar algo!"
              size="compact"
            />
          )}
        </Col>
      </Col>
    </Col>
  );
}
