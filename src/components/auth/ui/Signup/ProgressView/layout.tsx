import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import { cn } from "@/lib/utils";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import AuthHeader from "../../Header";
import Heading from "../../Heading";
import BackgroundItems from "../BackgroundItems";
import StepProgress from "../StepProgress";

interface Props {
  left: ViewLeftProps;
  right: ViewRightProps;
}

function SignupLayout({ left, right }: Props) {
  return (
    <>
      <AuthHeader className="absolute top-0 left-0" />
      <Row className="justify-between">
        <Left {...left} />
        <Right {...right} />
      </Row>
    </>
  );
}

interface ViewLeftProps extends React.ComponentProps<"div"> {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

function Left({
  title,
  subTitle,
  children,
  className,
  contentClassName,
  ...props
}: ViewLeftProps) {
  return (
    <Col
      className={cn("w-screen relative items-center flex-auto", className)}
      {...props}
    >
      <Col className={cn("w-full ", contentClassName)}>
        <Heading title={title} subTitle={subTitle} />
        {children}
      </Col>
      <StepProgress />
      <BackgroundItems />
    </Col>
  );
}

interface ViewRightProps extends React.ComponentProps<"div"> {
  src: string | StaticImport;
  alt: string;
  title: string;
  width?: number;
  height?: number;
  quality?: number;
  classImage?: string;
  // ctaImage: HTMLImageElement;
}

function Right(props: ViewRightProps) {
  const { src, alt, width, height, quality, classImage, title, className } =
    props;

  return (
    <div
      className={cn(
        "h-dvh w-dvw max-w-[785px] shadow-2xl overflow-hidden pointer-events-none",
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        priority
        quality={quality}
        width={width}
        height={height}
        className={cn(
          "-scale-x-100 size-full object-cover shadow-2xl rounded-tr-[50px] rounded-br-[50px]",
          classImage
        )}
      />
    </div>
  );
}

SignupLayout.Left = Left;
SignupLayout.Right = Right;

export default SignupLayout;
