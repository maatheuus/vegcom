import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"div"> {
  asButton?: boolean;
  as?: React.ElementType;
}

export default function Row({
  className,
  asButton,
  as = "div",
  ...props
}: Props) {
  const Comp = asButton ? "button" : as;

  return <Comp className={cn("flex flex-row", className)} {...props} />;
}

Row.displayName = "Row";
