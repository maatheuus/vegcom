import { getInitials } from "@/features/account/components/utils";
import { renderCommentContent } from "@/features/community/components/Post/CommentsPreview/CommentPreview";
import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { ArrowBendUpLeftIcon } from "@phosphor-icons/react";
import { formatDistance } from "date-fns";
import Link from "next/link";
import type { ResolvedComment } from "../PostComments";
import ReplyButton from "../ReplyButton";

export default function CommentRow({
  comment,
  replyTo,
  body,
  quotedComment,
  quotedBody,
  isAuthenticated,
}: ResolvedComment & { isAuthenticated: boolean }) {
  return (
    <Row className="w-full items-start gap-x-2 md:gap-x-3">
      <Link href={`/user/${comment.user?.id}`} className="contents">
        <Avatar className="size-8 md:size-10">
          <AvatarImage src={comment.user?.urlImage || ""} />
          <AvatarFallback className="text-xs capitalize md:text-base">
            {comment.user?.name ? getInitials(comment.user.name) : "U"}
          </AvatarFallback>
        </Avatar>
      </Link>

      <Col className="flex-1 gap-y-1">
        <Row className="w-full items-baseline justify-between gap-x-2">
          <Link href={`/user/${comment.user?.id}`} className="contents">
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
            {formatDistance(new Date(comment.commentDate), new Date(), {
              addSuffix: true,
              locale: dateFormatDistanceLocale,
            })}
          </Text>
        </Row>

        <Col className="gap-y-0.5">
          {quotedComment !== null && quotedBody !== null ? (
            <QuoteBubble
              authorName={quotedComment.user?.name ?? ""}
              content={quotedBody}
            />
          ) : replyTo !== null ? (
            <Row className="w-fit items-center gap-x-1 rounded-full bg-green-100/70 px-2 py-0.5">
              <ArrowBendUpLeftIcon
                size={11}
                weight="bold"
                className="shrink-0 text-green-500/60"
              />
              <span className="font-maitree text-[11px] font-semibold text-green-500/70">
                {replyTo}
              </span>
            </Row>
          ) : null}
          <Text
            type={Text.Type.BodyFour}
            className="font-maitree text-base leading-relaxed font-medium break-words whitespace-pre-wrap text-green-500"
          >
            {renderCommentContent(body)}
          </Text>
        </Col>

        <ReplyButton
          username={comment.user?.name}
          isAuthenticated={isAuthenticated}
          className="w-fit"
        />
      </Col>
    </Row>
  );
}

const QUOTE_MAX_CHARS = 80;

function QuoteBubble({
  authorName,
  content,
}: {
  authorName: string;
  content: string;
}) {
  const truncated =
    content.length > QUOTE_MAX_CHARS
      ? content.slice(0, QUOTE_MAX_CHARS).trimEnd() + "…"
      : content;

  return (
    <div className="mb-1 rounded-r-lg border-l-2 border-green-200 bg-green-50 px-2.5 py-1.5">
      <span className="font-maitree block text-[11px] font-bold text-green-600">
        {authorName}
      </span>
      <span className="font-maitree line-clamp-2 text-[11px] text-green-500/70">
        {truncated}
      </span>
    </div>
  );
}
