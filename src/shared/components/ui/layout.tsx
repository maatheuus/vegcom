"use client";

import Col from "@/shared/ui/Layout/Helpers/Col";
import { MouseScrollIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import "../../../assets/css/home.css";
import BackgroundItems from "./left/BackgroundItems";

interface Props {
  left: ViewLeftProps;
  right: ViewRightProps;
}

function HomeLayout({ left, right }: Props) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden lg:flex-row lg:justify-between">
      <Left {...left} />
      <div className="absolute bottom-[2%] left-[45%] z-40 translate-x-[-50%] text-green-500">
        <MouseScrollIcon size={22} />
      </div>
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
    <div className="relative hidden h-full w-dvw max-w-[645px] content-center overflow-hidden lg:block">
      <motion.div
        className={clsx("pointer-events-none size-auto", className)}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          title={title}
          priority
          quality={quality}
          width={width}
          height={height}
          className={clsx("relative z-50 size-full object-cover", classImage)}
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
      className={clsx("relative w-screen flex-auto items-center", className)}
      {...props}
    >
      <Col className={clsx("h-full w-full", contentClassName)}>{children}</Col>
    </Col>
  );
}

HomeLayout.Left = Left;
HomeLayout.Right = Right;

export default HomeLayout;
