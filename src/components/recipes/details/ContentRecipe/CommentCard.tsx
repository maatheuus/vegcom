import { HeartFilledIcon, HeartOutlinedIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
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
    <Col className="gap-y-2 border-b border-green-100 pb-4">
      <Row className="items-center justify-between">
        <Row className="gap-x-2 items-center">
          <Avatar className="size-8 border rounded-full">
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
            isLiked ? (
              <HeartFilledIcon className="fill-green-500" />
            ) : (
              <HeartOutlinedIcon className="fill-green-500" />
            )
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
