import type { PostCardDataProps } from "@/shared";
import Col from "@/shared/ui/Layout/Helpers/Col";
import PostCard from "../Post/Cards";

interface Props {
  data?: PostCardDataProps[];
}

export default function Announcements({ data = [] }: Props) {
  const hasPosts = data.length > 0;

  if (!hasPosts) {
    return <PostCard.EmptyState tab="announcements" />;
  }

  return (
    <Col className="space-y-4">
      {data.map((card, index) => (
        <PostCard.Announcement key={index} data={card} />
      ))}
    </Col>
  );
}
