"use client";

import { getInitials } from "@/features/account/components/utils";
import type { PostComment } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { ChatCircleTextIcon } from "@phosphor-icons/react";

interface CommentPreviewProps {
  comments: PostComment[];
  totalCount: number;
  onClickSeeAll?: () => void;
}

const MAX_VISIBLE = 2;

export default function CommentPreview({
  comments,
  totalCount,
  onClickSeeAll,
}: CommentPreviewProps) {
  if (!comments || comments.length === 0) return null;

  const visible = comments.slice(0, MAX_VISIBLE);
  const remaining = totalCount - MAX_VISIBLE;

  return (
    <Col
      className="mt-3 gap-y-2 border-t border-green-100/70 pt-3"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Cabeçalho da seção */}
      <Row className="items-center gap-x-1.5">
        <ChatCircleTextIcon size={13} className="text-green-500/50" />
        <Text
          as="span"
          type={Text.Type.BodyFive}
          className="font-maitree text-green-500/50"
        >
          {totalCount === 1 ? "1 comentário" : `${totalCount} comentários`}
        </Text>
      </Row>

      {visible.map((comment, idx) => (
        <Row key={idx} className="items-center gap-x-2">
          <Avatar className="mt-0.5 size-5 shrink-0">
            <AvatarImage
              src={comment.user?.urlImage ?? ""}
              alt={comment.user?.name}
            />
            <AvatarFallback className="!text-[10px]">
              {comment.user?.name ? getInitials(comment.user.name) : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 rounded-xl bg-green-100/50 px-2.5 py-1.5">
            <Row className="flex-wrap items-baseline gap-x-1.5">
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.Bold}
                className="font-maitree shrink-0 text-green-600"
              >
                {comment.user?.name}
              </Text>
              <Text
                as="span"
                type={Text.Type.BodyFive}
                className="font-maitree line-clamp-2 text-green-500/80"
              >
                {comment.commentContent}
              </Text>
            </Row>
          </div>
        </Row>
      ))}

      {remaining > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickSeeAll?.();
          }}
          className="font-maitree w-fit cursor-pointer text-xs text-green-500/50 transition-colors hover:text-green-500"
        >
          Ver mais {remaining} {remaining === 1 ? "comentário" : "comentários"}
        </button>
      )}
    </Col>
  );
}
