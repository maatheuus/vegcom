"use client";

import Text from "@/shared/ui/Text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "default" | "compact";
  animated?: boolean;
  className?: string;
}

const sizeStyles = {
  default: {
    container: "min-h-[300px] gap-4 p-8",
    iconWrapper: "h-16 w-16",
    titleType: Text.Type.HeadingFour,
    descriptionMaxWidth: "max-w-md",
  },
  compact: {
    container: "min-h-[100px] gap-2 p-4",
    iconWrapper: "h-10 w-10",
    titleType: Text.Type.BodyThree,
    descriptionMaxWidth: "max-w-xs",
  },
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  size = "default",
  animated = false,
  className,
}: EmptyStateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const styles = sizeStyles[size];

  useGSAP(
    () => {
      if (!animated) return;

      const tl = gsap.timeline();

      tl.fromTo(
        iconRef.current,
        { y: -20, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
      ).fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        "flex w-full flex-col items-center justify-center text-center",
        styles.container,
        className,
      )}
    >
      {icon && (
        <div
          ref={iconRef}
          className={clsx(
            "flex items-center justify-center rounded-full bg-green-100/80 text-green-200",
            styles.iconWrapper,
          )}
        >
          {icon}
        </div>
      )}

      <div
        ref={contentRef}
        className={clsx("space-y-2", !animated && "opacity-100")}
      >
        <Text
          as="h3"
          type={styles.titleType}
          className="font-lora font-medium text-green-500"
        >
          {title}
        </Text>

        {description && (
          <Text
            as="p"
            className={clsx(
              "font-maitree text-green-500/80",
              styles.descriptionMaxWidth,
            )}
          >
            {description}
          </Text>
        )}

        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
}
