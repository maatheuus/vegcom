import { cn } from "@/shared/lib/utils";

interface Props extends React.ComponentProps<"div"> {
  as?: React.ElementType;
  columns?: string;
  gap?: string;
  rows?: string;
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
        `${columns ? `grid-cols-${columns}` : ""}`,
        `${rows ? `grid-rows-${rows}` : ""}`,
        `${gap ? `gap-${gap}` : ""}`,
        className
      )}
      {...props}
    />
  );
}

Grid.displayName = "Grid";
