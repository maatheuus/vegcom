import Col from "@/components/ui/Layout/Helpers/Col";
import { cn } from "@/lib/utils";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import BackgroundItems from "./left/BackgroundItems";

interface Props {
  left: ViewLeftProps;
  right: ViewRightProps;
}

function HomeLayout({ left, right }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between overflow-hidden h-full">
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
    <div className="overflow-hidden hidden lg:block content-center relative h-dvh w-dvw max-w-[645px]">
      <div
        className={cn("size-auto pointer-events-none", className)}
        // {...props}
      >
        <Image
          src={src}
          alt={alt}
          title={title}
          priority
          quality={quality}
          width={width}
          height={height}
          className={cn("size-full object-cover z-50 relative", classImage)}
        />
      </div>
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
      className={cn("w-screen relative items-center flex-auto", className)}
      {...props}
    >
      <Col className={cn("w-full h-full", contentClassName)}>{children}</Col>
    </Col>
  );
}

HomeLayout.Left = Left;
HomeLayout.Right = Right;

export default HomeLayout;
