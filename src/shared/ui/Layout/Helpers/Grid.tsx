import { cn } from "@/shared/lib/utils";

interface Props extends React.ComponentProps<"div"> {
  as?: React.ElementType;
  columns?: string;
  gap?: string;
  rows?: string;
  isRoot?: boolean;
}

export default function Grid({
  className,
  as: Comp = "div",
  isRoot = true,
  columns,
  rows,
  gap,
  ...props
}: Props) {
  return isRoot ? (
    <Comp
      className={cn(
        "grid",
        `${columns ? `grid-cols-${columns}` : ""}`,
        `${rows ? `grid-rows-${rows}` : ""}`,
        `${gap ? `gap-${gap}` : ""}`,
        className,
      )}
      {...props}
    />
  ) : (
    <Comp
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : "",
        gridTemplateRows: rows ? `repeat(${rows}, minmax(0, 1fr))` : "",
        gap: gap ? gap : "",
      }}
      {...props}
    />
  );
}

Grid.displayName = "Grid";
