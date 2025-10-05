// components/PostCard/PostCardRoot.tsx
import type { PostCardDataProps } from "@/components/@types";
import {
  ChatCircleTextOutlinedIcon,
  OpenEyeOutlinedIcon,
} from "@/components/icons";
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
      <Col>
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
              className="text-green-500 font-lora italic font-semibold"
            >
              {data.user.name}
            </Text>
          </Row>
          <Row className="items-center">
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="text-green-500 font-lora italic font-semibold"
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
            className="text-green-500 font-lora italic font-bold flex items-center gap-x-1"
          >
            <ChatCircleTextOutlinedIcon size={16} />0
          </Text>
        )}

        <span className="size-0.5 rounded-full bg-green-500"></span>
        <Row className="items-center gap-x-1 text-green-500/80">
          <OpenEyeOutlinedIcon size={16} />
          <Text
            as="span"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Medium}
            className="!font-bold font-lora italic"
          >
            {data.postViews}
          </Text>
        </Row>
      </Row>
    </Col>
  );
}
