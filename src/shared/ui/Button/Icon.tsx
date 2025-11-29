import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { iconButtonVariants } from "./variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  icon?: React.JSX.Element;
  children?: React.ReactNode;
  text?: string;
}

const Icon = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      leftIcon,
      rightIcon,
      icon,
      size,
      asChild = false,
      text,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && (
          <>
            {leftIcon} {text || children}
          </>
        )}

        {!leftIcon && !rightIcon && (icon)}

        {rightIcon && (
          <>
            {text || children} {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Icon.displayName = "ButtonIcon";

export default Icon;
