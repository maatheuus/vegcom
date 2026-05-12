"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import type { PostComment } from "@/shared";
import EmptyState from "@/shared/ui/EmptyState";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useMemo } from "react";
import CommentComposer from "./CommentComposer";
import { groupCommentsIntoThreads, resolveThread } from "./Comments";
import CommentRow from "./Comments/CommentRow";

export interface ResolvedComment {
  comment: PostComment;
  replyTo: string | null;
  body: string;
  quotedComment: PostComment | null;
  quotedBody: string | null;
}

export interface PostCommentsProps {
  comments?: PostComment[];
  uniqueUsers: { id: number; name: string }[];
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
  const threads = useMemo(
    () => groupCommentsIntoThreads(comments ?? []),
    [comments],
  );

  if (postByAdmin) return null;

  return (
    <Col className="mt-6 w-full gap-y-6 pb-10 md:px-4">
      <Col className="gap-y-4">
        <CommentComposer users={uniqueUsers} user={user} postId={postId} />

        <Col className="mt-4 gap-y-6">
          {comments && comments.length > 0 ? (
            threads.map((threadComments, threadIndex) => {
              const resolved = resolveThread(threadComments);

              if (threadComments.length === 1) {
                return (
                  <CommentRow
                    key={threadIndex}
                    {...resolved[0]}
                    isAuthenticated={!!user}
                  />
                );
              }

              return (
                <Col
                  key={threadIndex}
                  className="gap-y-4 rounded-xl border-l-[3px] border-green-200 bg-green-50/30 px-3 py-3 md:px-4"
                >
                  {resolved.map((item, i) => (
                    <CommentRow key={i} {...item} isAuthenticated={!!user} />
                  ))}
                </Col>
              );
            })
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
