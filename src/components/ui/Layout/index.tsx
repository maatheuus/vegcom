import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  size?: "default" | "max" | "min";
}

const layoutVariants = cva("", {
  variants: {
    size: {
      default: "max-w-full w-full",
      max: "max-w-xll mx-auto",
      min: "min-w-xll max-w-xll mx-auto",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function Layout({ size, className }: Props) {
  return <div className={cn(layoutVariants({ className, size }))} />;
}

Layout.displayName = "Layout";
