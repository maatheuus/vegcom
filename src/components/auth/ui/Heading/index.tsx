import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

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
      className={cn("text-center font-rancho font-normal p-0", className)}
      {...props}
    >
      <CardTitle
        as={asTitle}
        weight={Text.Weight.Normal}
        type={Text.Type.HeadingOne}
        className="text-green-500"
      >
        {title}
      </CardTitle>
      <CardDescription
        as={asSubtitle}
        weight={Text.Weight.Normal}
        type={Text.Type.HeadingTwo}
        className="text-green-500"
      >
        {subTitle}
      </CardDescription>
    </CardHeader>
  );
}
