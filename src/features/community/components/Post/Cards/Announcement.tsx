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
          as="h2"
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Medium}
          className="font-lora font-semibold italic"
        >
          {data.postTitle}
        </Text>

        <div
          className="font-maitree text-base break-words text-green-500"
          dangerouslySetInnerHTML={{
            __html: data.postContent.postResources?.content,
          }}
        />
      </Col>
    </PostCardRoot>
  );
}
