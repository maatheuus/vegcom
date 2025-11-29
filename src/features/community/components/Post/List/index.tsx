import Col from "@/shared/ui/Layout/Helpers/Col";
import { mockPostCardData } from "../../mockData";
import PostCard from "../Cards";

export default function PostList() {
  return (
    <Col className="space-y-4">
      {mockPostCardData.map((card, index) => (
        <PostCard.Default key={index} data={card} />
      ))}
    </Col>
  );
}
