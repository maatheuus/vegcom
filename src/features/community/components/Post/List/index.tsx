import Col from "@/shared/ui/Layout/Helpers/Col";
import { mockPostCardData } from "../../mockData";
import PostCard from "../Cards";

export default function PostList() {
  const hasPosts = mockPostCardData.length > 0;

  if (!hasPosts) {
    return <PostCard.EmptyState tab="posts" />;
  }

  return (
    <Col className="space-y-4">
      {mockPostCardData.map((card, index) => (
        <PostCard.Default key={index} data={card} />
      ))}
    </Col>
  );
}
