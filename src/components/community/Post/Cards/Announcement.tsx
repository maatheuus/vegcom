import type { PostCardDataProps } from "@/components/@types";
import Col from "@/components/ui/Layout/Helpers/Col";
import Text from "@/components/ui/Text";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardAnnouncement({ data }: Props) {
  return (
    <PostCardRoot data={data} variant="announcement">
      <Col className="w-full h-fit text-green-500 gap-y-1">
        <Text
          as="p"
          type={Text.Type.BodyFour}
          weight={Text.Weight.Medium}
          className=""
        >
          {data.postContent.postResources?.content}
        </Text>
      </Col>
    </PostCardRoot>
  );
}
