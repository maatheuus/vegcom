import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { HeartIcon } from "@phosphor-icons/react";
import type { Comment } from "../../types";

interface Props {
  comment: Comment;
  likes: number;
  isLiked: boolean;
  onLike: () => void;
}

export default function CommentCard({
  comment,
  likes,
  isLiked,
  onLike,
}: Props) {
  return (
    <Col className="gap-y-2">
      <Row className="items-center justify-between">
        <Row className="items-center gap-x-2">
          <Avatar className="size-8 rounded-full border">
            {comment.avatarUrl ? (
              <AvatarImage src={comment.avatarUrl} alt={comment.author} />
            ) : (
              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <Col>
            <Text
              type={Text.Type.BodyFour}
              weight={Text.Weight.Bold}
              className="text-green-500"
            >
              {comment.author}
            </Text>
            <Text type={Text.Type.BodyFive} className="text-green-500">
              {comment.timeAgo}
            </Text>
          </Col>
        </Row>
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
          <Text type={Text.Type.BodyFive}>{likes}</Text>
        </Button.Icon>
      </Row>
      <Text type={Text.Type.BodyFour} className="text-green-900">
        {comment.content}
      </Text>
    </Col>
  );
}
