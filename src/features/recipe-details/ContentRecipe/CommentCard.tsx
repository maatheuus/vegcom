import { getInitials } from "@/features/account/components/utils";
import type { CommentData } from "@/features/comments";
import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { HeartIcon } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  comment: CommentData;
  isLiked: boolean;
  onLike: () => void;
  currentUserId?: number;
  onDelete?: () => void;
}

export default function CommentCard({
  comment,
  isLiked,
  onLike,
  currentUserId,
  onDelete,
}: Props) {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  const isOwner = currentUserId === comment.user?.id;

  return (
    <Col className="gap-y-2">
      <Row className="items-center justify-between">
        <Row className="items-center gap-x-2">
          <Avatar className="size-8 rounded-full border">
            <AvatarFallback>
              {comment.user?.name ? getInitials(comment.user.name) : "U"}
            </AvatarFallback>
          </Avatar>
          <Col>
            <Text
              type={Text.Type.BodyFour}
              weight={Text.Weight.Bold}
              className="text-green-500"
            >
              {comment.user?.name}
            </Text>
            <Text type={Text.Type.BodyFive} className="text-green-500">
              {timeAgo}
            </Text>
          </Col>
        </Row>
        <Row className="items-center gap-x-2">
          {isOwner && onDelete && (
            <Button
              variant="text"
              size="sm"
              onClick={onDelete}
              className="text-red-500 hover:text-red-600"
            >
              Excluir
            </Button>
          )}
          <Button.Icon
            leftIcon={
              <HeartIcon
                weight={isLiked ? "fill" : "regular"}
                className="fill-green-500"
              />
            }
            variant="text"
            size="md"
            onClick={onLike}
          >
            <Text type={Text.Type.BodyFive}>{comment.likesCount}</Text>
          </Button.Icon>
        </Row>
      </Row>
      <Text type={Text.Type.BodyFour} className="text-green-900">
        {comment.text}
      </Text>
    </Col>
  );
}
