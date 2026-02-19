import Col from "@/shared/ui/Layout/Helpers/Col";
import { mockPostCardData } from "../mockData";
import PostCard from "../Post/Cards";

export default function Resources() {
  const hasPosts = mockPostCardData.length > 0;

  if (!hasPosts) {
    return <PostCard.EmptyState tab="resources" />;
  }

  return (
    <Col className="space-y-4">
      {mockPostCardData.map((card, index) => (
        <PostCard.Image key={index} data={card} />
      ))}
    </Col>
  );
}
