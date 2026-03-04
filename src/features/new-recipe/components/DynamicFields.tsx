import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import type { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  title: string;
  rightContent?: ReactNode;
}

export default function DynamicFields({
  title,
  className,
  children,
  rightContent,
  ...props
}: Props) {
  return (
    <Col className={`gap-y-3 ${className || ""}`} {...props}>
      <Row.Center className="justify-between">
        <Text
          as="h2"
          type={Text.Type.HeadingThree}
          weight={Text.Weight.Medium}
          className="font-lora text-green-500"
        >
          {title}
        </Text>
        {rightContent}
      </Row.Center>
      {children}
    </Col>
  );
}
