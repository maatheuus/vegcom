import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { prepareHtmlContent } from "@/shared/utils";
import PostCardRoot from "./Root";

interface Props {
  data: PostCardDataProps;
}

export default function PostCardAnnouncement({ data }: Props) {
  const isUserAdmin = data.user.role === "ADMIN";

  if (!isUserAdmin) return null;

  return (
    <PostCardRoot data={data} variant="announcement">
      <Col className="h-fit w-full gap-y-1 text-green-500">
        <Text
          as="h2"
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Medium}
          className="font-lora font-semibold"
        >
          {data.postTitle}
        </Text>

        <div
          className="font-maitree mt-2 text-base break-words text-green-500 [&>p]:text-justify [&>p]:hyphens-auto"
          lang="pt-BR"
          dangerouslySetInnerHTML={{
            __html: prepareHtmlContent(
              data.postContent.postResources?.content ?? "",
            ),
          }}
        />
      </Col>
    </PostCardRoot>
  );
}
