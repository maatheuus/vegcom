import Menu from "@/features/community/components/Menu";
import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Footer } from "./Footer";
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
  noFooter?: boolean;
}

export function Default({
  children,
  extraChildren,
  className,
  gridClassName,
  noFooter = false,
}: DefaultProps) {
  return (
    <div
      className={clsx(
        "body__container-lg--no-padding flex flex-col",
        noFooter ? "h-dvh" : "min-h-dvh",
      )}
    >
      <Col
        as="main"
        className={clsx(
          "padding__default flex-1 gap-y-4 bg-green-50",
          className,
        )}
      >
        <Menu />
        {extraChildren}
        <Grid
          columns="16"
          className={clsx(
            "mt-4 w-full flex-auto md:mt-8 lg:mt-10",
            noFooter ? "h-full" : "h-auto",
            gridClassName,
          )}
        >
          {children}
        </Grid>
      </Col>
      {!noFooter && <Footer />}
    </div>
  );
}
Default.displayName = "Default";

Layout.Default = Default;

export default Layout;
