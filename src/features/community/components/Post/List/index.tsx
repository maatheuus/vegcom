import type { PostCardDataProps } from "@/shared";
import Col from "@/shared/ui/Layout/Helpers/Col";
import PostCard from "../Cards";

interface Props {
  data?: PostCardDataProps[];
}

export default function PostList({ data = [] }: Props) {
  const hasPosts = data.length > 0;

  if (!hasPosts) {
    return <PostCard.EmptyState tab="posts" />;
  }

  return (
    <Col className="space-y-4">
      {data.map((card, index) => (
        <PostCard.Default key={index} data={card} />
      ))}
    </Col>
  );
}
