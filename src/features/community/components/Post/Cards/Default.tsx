import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardDefault({ data }: Props) {
  return (
    <PostCardRoot data={data} variant="default">
      <Col className="h-fit w-full gap-y-1 text-green-500">
        <Text
          as="h2"
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Medium}
          className="font-lora font-semibold italic"
        >
          {data.postTitle}
        </Text>
        <Text
          as="p"
          type={Text.Type.BodyFour}
          weight={Text.Weight.Normal}
          className="font-maitree line-clamp-3 text-base"
        >
          {data.postContent.postResources?.content}
        </Text>
      </Col>
    </PostCardRoot>
  );
}
