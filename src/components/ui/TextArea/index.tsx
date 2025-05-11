import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[92px] max-h-[160px] field-sizing-content resize-none w-full rounded-sm border border-green-500 bg-transparent px-3 py-2 text-sm text-green-500 placeholder:text-green-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
