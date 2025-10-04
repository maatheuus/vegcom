// components/PostCard/PostCardDefault.tsx
import type { PostCardDataProps } from "@/components/@types";
import Col from "@/components/ui/Layout/Helpers/Col";
import Text from "@/components/ui/Text";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardDefault({ data }: Props) {
  return (
    <PostCardRoot data={data} variant="default">
      <Col className="w-full h-fit text-green-500 gap-y-1">
        <Text
          as="h2"
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Medium}
          className="font-lora italic font-semibold"
        >
          {data.postTitle}
        </Text>
        <Text
          as="p"
          type={Text.Type.BodyFour}
          weight={Text.Weight.Normal}
          className="text-base font-maitree line-clamp-3"
        >
          {data.postContent.postResources?.content}
        </Text>
      </Col>
    </PostCardRoot>
  );
}
