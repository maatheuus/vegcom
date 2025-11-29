"use client";

import { cn } from "@/shared/lib/utils";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { motion } from "framer-motion";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import BackgroundItems from "./left/BackgroundItems";

interface Props {
  left: ViewLeftProps;
  right: ViewRightProps;
}

function HomeLayout({ left, right }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden lg:flex-row lg:justify-between">
      <Left {...left} />
      <Right {...right} />
    </div>
  );
}

interface ViewLeftProps extends React.ComponentProps<"div"> {
  src: string | StaticImport;
  alt: string;
  title: string;
  width?: number;
  height?: number;
  quality?: number;
  classImage?: string;
}

function Left(props: ViewLeftProps) {
  const { src, alt, width, height, quality, classImage, title, className } =
    props;

  return (
    <div className="relative hidden h-dvh w-dvw max-w-[645px] content-center overflow-hidden lg:block">
      <motion.div
        className={cn("pointer-events-none size-auto", className)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
          y: [0, -15, 0],
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src={src}
          alt={alt}
          title={title}
          priority
          quality={quality}
          width={width}
          height={height}
          className={cn("relative z-50 size-full object-cover", classImage)}
        />
      </motion.div>
      <BackgroundItems />
    </div>
  );
}

interface ViewRightProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

function Right({
  children,
  className,
  contentClassName,
  ...props
}: ViewRightProps) {
  return (
    <Col
      className={cn("relative w-screen flex-auto items-center", className)}
      {...props}
    >
      <Col className={cn("h-full w-full", contentClassName)}>{children}</Col>
    </Col>
  );
}

HomeLayout.Left = Left;
HomeLayout.Right = Right;

export default HomeLayout;
