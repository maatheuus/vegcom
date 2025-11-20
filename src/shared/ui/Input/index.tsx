import * as React from "react";

import { cn } from "@/shared/lib/utils";
import Row from "../Layout/Helpers/Row";

type InputIconProps = {
  icon: React.JSX.Element;
  containerClassName?: string;
} & React.ComponentProps<"input">;

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ className, containerClassName, icon: Icon, type, ...props }, ref) => {
    return (
      <Row
        className={cn(
          "relative w-full items-center justify-between",
          containerClassName,
        )}
      >
        <input
          type={type}
          className={cn(
            "font-maitree flex w-full rounded-md border border-green-500 bg-transparent px-3.5 py-2 text-base transition-colors placeholder:text-green-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:py-2.5",
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-3.5 z-20">{Icon}</div>
      </Row>
    );
  },
);

InputIcon.displayName = "InputIcon";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "font-maitree flex w-full rounded-xs border border-green-500 bg-transparent px-3.5 py-3 text-base text-green-500 transition-colors placeholder:text-green-200 focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, InputIcon };
