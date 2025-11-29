import { CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import Text from "@/shared/ui/Text";
import clsx from "clsx";

type Props = {
  title?: string;
  subTitle?: string;
  asTitle?: React.ElementType;
  asSubtitle?: React.ElementType;
} & React.ComponentProps<"div">;

export default function Heading({
  title,
  subTitle,
  asTitle = "h1",
  asSubtitle = "h2",
  className,
  ...props
}: Props) {
  return (
    <CardHeader
      className={clsx("font-lora p-0 text-center italic", className)}
      {...props}
    >
      <CardTitle
        as={asTitle}
        weight={Text.Weight.SemiBold}
        type={Text.Type.HeadingThree}
        className="text-green-500"
      >
        {title}
      </CardTitle>
      {subTitle && (
        <CardDescription
          as={asSubtitle}
          weight={Text.Weight.Normal}
          type={Text.Type.HeadingTwo}
          className="text-green-500"
        >
          {subTitle}
        </CardDescription>
      )}
    </CardHeader>
  );
}
