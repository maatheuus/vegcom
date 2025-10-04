import type { ComponentProps } from "react";
import Col from "../ui/Layout/Helpers/Col";
import Text from "../ui/Text";

interface Props extends ComponentProps<"div"> {
  title: string;
}

export default function DynamicFields({
  title,
  className,
  children,
  ...props
}: Props) {
  return (
    <Col className={`gap-y-3 ${className || ""}`} {...props}>
      <Text
        as="h2"
        type={Text.Type.HeadingThree}
        weight={Text.Weight.Medium}
        className="font-lora text-green-500"
      >
        {title}
      </Text>
      {children}
    </Col>
  );
}
