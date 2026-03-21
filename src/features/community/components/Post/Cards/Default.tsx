import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { prepareHtmlContent } from "@/shared/utils";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardDefault({ data }: Props) {
  const hasImages = data.postContent.postResources?.images?.length > 0;

  if (hasImages) return null;

  const content = data.postContent.postResources?.content;
  const contentHTML = data.postContent.postResources?.contentHTML;

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

        {contentHTML ? (
          <div
            className="font-maitree mt-2 text-base break-words text-green-500 [&>p]:text-justify [&>p]:hyphens-auto"
            lang="pt-BR"
            dangerouslySetInnerHTML={{
              __html: prepareHtmlContent(contentHTML),
            }}
          />
        ) : (
          <Text
            as="p"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Normal}
            className="font-maitree mt-2 text-justify text-base hyphens-auto whitespace-pre-wrap"
          >
            {content}
          </Text>
        )}
      </Col>
    </PostCardRoot>
  );
}
