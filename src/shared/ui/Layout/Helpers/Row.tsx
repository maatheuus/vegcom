import { cn } from "@/shared/lib/utils";

interface Props extends React.ComponentProps<"div"> {
  asButton?: boolean;
  as?: React.ElementType;
}

function Row({
  className,
  asButton,
  as = "div",
  ...props
}: Props) {
  const Comp = asButton ? "button" : as;

  return <Comp className={cn("flex flex-row", className)} {...props} />;
}
Row.displayName = "Row";

export function Center({
  className,
  ...props
}: Props) {

  return <Row className={cn("justify-center items-center", className)} {...props} />;
}

Center.displayName = "Center";

Row.Center = Center;

export default Row;