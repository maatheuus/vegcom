import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import Image from "next/image";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardImage({ data }: Props) {
  const images = data.postContent.postResources?.images ?? [];

  if (!images.length) return null;
  return (
    <PostCardRoot data={data} variant="image">
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

        <Row className="w-full flex-wrap gap-x-3">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              title={image.title}
              width={200}
              height={200}
              className="h-full max-h-[12.5rem] w-full max-w-[15rem] rounded-sm object-cover"
            />
          ))}
        </Row>
      </Col>
    </PostCardRoot>
  );
}
