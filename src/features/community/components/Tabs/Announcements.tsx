import Col from "@/shared/ui/Layout/Helpers/Col";
import { mockPostCardData } from "../mockData";
import PostCard from "../Post/Cards";

export default function Announcements() {
  const hasPosts = mockPostCardData.length > 0;

  if (!hasPosts) {
    return <PostCard.EmptyState tab="announcements" />;
  }

  return (
    <Col className="space-y-4">
      {mockPostCardData.map((card, index) => (
        <PostCard.Announcement key={index} data={card} />
      ))}
    </Col>
  );
}
