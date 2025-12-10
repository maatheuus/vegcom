import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardAnnouncement({ data }: Props) {
  return (
    <PostCardRoot data={data} variant="announcement">
      <Col className="h-fit w-full gap-y-1 text-green-500">
        <Text
          as="p"
          type={Text.Type.BodyFour}
          weight={Text.Weight.Medium}
          className="font-maitree text-base"
        >
          {data.postContent.postResources?.content}
        </Text>
      </Col>
    </PostCardRoot>
  );
}
