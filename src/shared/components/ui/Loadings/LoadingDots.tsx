import clsx from "clsx";

interface LoadingDotsProps {
  className?: string;
  haveBackground?: boolean;
  dotColor?: "dark" | "light";
}

export default function LoadingDots({
  className,
  haveBackground,
  dotColor = "dark",
}: LoadingDotsProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-[5px] rounded-[20px] px-4 py-3",
        haveBackground ? "bg-green-50/55" : "bg-transparent",
        className,
      )}
      style={{ animation: "fadeSlide 0.3s ease-out both" }}
    >
      <span
        className={clsx("loading-dot", `loading-dot--${dotColor}`)}
        style={{ animationDelay: "0ms" }}
      />
      <span
        className={clsx("loading-dot", `loading-dot--${dotColor}`)}
        style={{ animationDelay: "160ms" }}
      />
      <span
        className={clsx("loading-dot", `loading-dot--${dotColor}`)}
        style={{ animationDelay: "320ms" }}
      />
    </div>
  );
}
