import type { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function MainContent({ className, ...props }: Props) {
  return (
    <div
      {...props}
      className={`hidden-scrollbar p-0 h-dvh max-h-[80%] mt-auto w-full overflow-x-hidden overflow-y-auto bg-red-500 z-50 ${className}`}
    >
      
    </div>
  );
}
