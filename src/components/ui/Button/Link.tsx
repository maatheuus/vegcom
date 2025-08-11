import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { iconButtonVariants } from "./variants";

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof iconButtonVariants> {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  icon?: React.JSX.Element;
  children?: React.ReactNode;
  text?: string;
  href: string;
}

const ButtonLink = ({
  className,
  variant,
  leftIcon,
  rightIcon,
  icon,
  size,
  text,
  children,
  href,
  ...props
}: ButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    >
      {leftIcon && (
        <>
          {leftIcon} {text || children}
        </>
      )}

      {!leftIcon && !rightIcon && icon}

      {rightIcon && (
        <>
          {text || children} {rightIcon}
        </>
      )}
    </Link>
  );
};
ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
