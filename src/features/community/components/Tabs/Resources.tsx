import Col from "@/shared/ui/Layout/Helpers/Col";
import { mockPostCardData } from "../mockData";
import PostCard from "../Post/Cards";

export default function Resources() {
  return (
    <Col className="space-y-4">
      {mockPostCardData.map((card, index) => (
        <PostCard.Image key={index} data={card} />
      ))}
    </Col>
  );
}
