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
      className={cn("font-lora p-0 text-center text-xl italic", className)}
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
