import type { PostCardDataProps } from "@/components/@types";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
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
          className="text-base line-clamp-3 font-maitree"
        >
          {data.postContent.postResources?.content}
        </Text>

        <Row className="flex-wrap gap-x-3 w-full">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              title={image.title}
              width={200}
              height={200}
              className="w-full h-full object-cover max-h-[12.5rem] max-w-[15rem] rounded-sm"
            />
          ))}
        </Row>
      </Col>
    </PostCardRoot>
  );
}
