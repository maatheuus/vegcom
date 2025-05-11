// components/PostCard/PostCardRoot.tsx
import type { PostCardDataProps } from "@/components/@types";
import { OpenEyeOutlinedIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import { dateFormatDistanceLocale } from "@/lib/utils";
import clsx from "clsx";
import { formatDistance, subDays } from "date-fns";
import CommentsModal from "../CommentsModal";
import { AvatarGroup } from "./AvatarGroup";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: PostCardDataProps;
  children: React.ReactNode;
  variant?: "default" | "image" | "announcement";
}

export default function PostCardRoot({
  className,
  data,
  children,
  variant = "default",
  ...props
}: Props) {
  const formattedPostDate = formatDistance(
    subDays(new Date(data.postDate), 1),
    new Date(),
    { addSuffix: true, includeSeconds: true, locale: dateFormatDistanceLocale }
  );

  return (
    <Col
      className={clsx(
        "px-4 py-3 w-full border-b border-b-green-100",
        className
      )}
      {...props}
    >
      <Col className="gap-y-4">
        <Row className="py-3 w-full justify-between">
          <Row className="items-center gap-x-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="text-green-500 font-frank"
            >
              {data.user.name}
            </Text>
          </Row>
          <Row className="items-center">
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="text-green-500 font-frank"
            >
              {formattedPostDate}
            </Text>
          </Row>
        </Row>

        {children}
      </Col>

      <Row className="py-3 gap-x-3 items-center mt-4 border-t border-t-green-100">
        {data.comments.comments && (
          <AvatarGroup comments={data.comments.comments} />
        )}

        {data.comments.haveComments ? (
          <CommentsModal variant={variant} data={data} />
        ) : (
          <Text
            as="span"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Medium}
            className="text-green-500 font-rancho"
          >
            0 comentários
          </Text>
        )}

        <span className="size-0.5 rounded-full bg-green-500"></span>
        <Row className="items-center gap-x-1 text-green-500/75 font-rancho">
          <OpenEyeOutlinedIcon size={16} />
          <Text as="span" type={Text.Type.BodyFour} weight={Text.Weight.Medium}>
            {`${data.postViews} ${
              data.postViews! <= 1 ? "visualização" : "visualizações"
            }`}
          </Text>
        </Row>
      </Row>
    </Col>
  );
}
