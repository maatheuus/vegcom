"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import type { PostComment } from "@/shared";
import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { formatDistance } from "date-fns";
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
              <Row key={index} className="w-full items-start gap-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatarUrl || ""} />
                  <AvatarFallback className="bg-green-100 text-xs capitalize text-green-500">
                    {comment.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <Col className="flex-1 gap-y-1">
                  <Row className="w-full items-baseline justify-between gap-x-2">
                    <Text
                      weight={Text.Weight.Medium}
                      className="text-sm font-semibold text-green-500"
                    >
                      {comment.user.name}
                    </Text>
                    <Text
                      type={Text.Type.BodySix}
                      className="font-lora text-black-100 text-xs opacity-60"
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
                    className="text-black-100 mt-1 leading-relaxed font-medium break-all"
                  >
                    {comment.commentContent}
                  </Text>

                  <Row className="mt-2 items-center gap-x-3">
                    <ReplyButton
                      username={comment.user.name}
                      isAuthenticated={!!user}
                    />
                  </Row>
                </Col>
              </Row>
            ))
          ) : (
            <Text className="py-8 text-center text-gray-500">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </Text>
          )}
        </Col>
      </Col>
    </Col>
  );
}
