import Menu from "@/features/community/components/Menu";
import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import Col from "./Helpers/Col";
import Grid from "./Helpers/Grid";

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

function Layout({ size, className }: Props) {
  return <div className={cn(layoutVariants({ className, size }))} />;
}

Layout.displayName = "Layout";

interface DefaultProps extends React.ComponentProps<"div"> {
  extraChildren?: React.ReactNode;
  gridClassName?: string;
}

export function Default({
  children,
  extraChildren,
  className,
  gridClassName,
}: DefaultProps) {
  return (
    <Col
      as="main"
      className={clsx(
        "size-full gap-y-4 bg-green-50 md:gap-y-5 lg:gap-y-7",
        className,
      )}
    >
      <Menu />
      {extraChildren}
      <Grid
        columns="16"
        className={clsx(
          "mx-auto h-auto w-full max-w-[65rem] flex-auto py-4 md:max-w-[75rem] md:py-6 lg:max-w-[85rem] lg:py-8",
          gridClassName,
        )}
      >
        {children}
      </Grid>
    </Col>
  );
}

Default.displayName = "Default";

Layout.Default = Default;

export default Layout;
