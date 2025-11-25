import clsx from "clsx";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
  className?: string;
  variation?: "light" | "dark";
  text?: string;
  href?: string;
}

export default function Animated({
  children,
  className,
  variation = "light",
  text,
  href,
}: Props) {
  const baseClasses = clsx(
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-10 py-4 transition-all duration-700",
    className,
    variation === "dark" && "bg-green-500 text-green-50",
    variation === "light" && "bg-green-50 text-green-500",
  );

  const content = (
    <>
      <span
        className={clsx(
          "absolute -bottom-4 left-5 h-1 w-1 rounded-full transition-all duration-700 group-hover:scale-[300]",
          variation === "dark" && "bg-green-50",
          variation === "light" && "bg-green-500",
        )}
      />

      <span
        className={clsx(
          "relative z-10 text-lg font-semibold transition-colors duration-700",
          variation === "dark" && "text-green-50 group-hover:text-green-500",
          variation === "light" && "text-green-500 group-hover:text-green-50",
        )}
      >
        {text || children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <button className={baseClasses}>{content}</button>;
}
