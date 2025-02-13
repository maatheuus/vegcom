import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"div"> {
  as?: React.ElementType;
  columns?: number;
  gap?: number;
  rows?: number;
}

export default function Grid({
  className,
  as: Comp = "div",
  columns,
  rows,
  gap,
  ...props
}: Props) {
  return (
    <Comp
      className={cn(
        "grid",
        `grid-cols-${columns}`,
        `grid-rows-${rows}`,
        `gap-${gap}`,
        className
      )}
      {...props}
    />
  );
}

Grid.displayName = "Grid";
