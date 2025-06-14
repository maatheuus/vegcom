import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-green-500 text-green-50",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-green-200 text-green-50",
        text: "bg-transparent text-green-500 hover:bg-green-50",
        none: "bg-none text-current",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        none: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export const iconButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:rounded-full [&_svg]:shrink-0 transition-all duration-300 cursor-pointer ",
  {
    variants: {
      variant: {
        filled: "bg-green-200 text-green-50 hover:bg-green-500",
        "filled-white": "bg-green-50 text-green-500",
        text: "bg-transparent text-green-500 hover:bg-green-50",
        outline:
          "bg-none border border-green-100 text-green-500 hover:border-black-400",
      },
      size: {
        default: "py-3 px-3",
        lg: "p-4 [&_svg]:size-5",
        md: "p-2.5 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);
