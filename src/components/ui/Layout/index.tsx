import Sidebar from "@/components/community/Sidebar";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import clsx from "clsx";
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
}

export function Default({ children, extraChildren, className }: DefaultProps) {
  return (
    <main className={clsx("size-full bg-green-50", className)}>
      <Sidebar />
      {extraChildren}
      <Grid columns="16" className="h-dvh ml-20 mr-6">
        {children}
      </Grid>
    </main>
  );
}

Default.displayName = "Default";

Layout.Default = Default;

export default Layout;