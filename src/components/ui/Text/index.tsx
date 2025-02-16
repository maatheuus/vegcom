import { cn } from "@/lib/utils";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export interface TextProps
  extends HTMLAttributes<
    | HTMLHeadingElement
    | HTMLSpanElement
    | HTMLParagraphElement
    | HTMLAnchorElement
  > {
  type?: Type;
  weight?: Weight;
  as?: React.ElementType;
}

enum Type {
  HeadingOne = "h1",
  HeadingTwo = "h2",
  HeadingThree = "h3",
  HeadingFour = "h4",
  HeadingFive = "h5",
  HeadingSix = "h6",
  SubtitleOne = "subtitleOne",
  SubtitleTwo = "subtitleTwo",
  SubtitleThree = "subtitleThree",
  BodyOne = "bodyOne",
  BodyTwo = "bodyTwo",
  BodyThree = "bodyThree",
  BodyFour = "bodyFour",
  BodyFive = "bodyFive",
  BodySix = "bodySix",
}

enum Weight {
  ExtraLight = "font-extralight",
  Light = "font-light",
  Normal = "font-normal",
  Medium = "font-medium",
  SemiBold = "font-semibold",
  Bold = "font-bold",
  ExtraBold = "font-extrabold",
}

const typeToAsMap = {
  [Type.HeadingOne]: "h1",
  [Type.HeadingTwo]: "h2",
  [Type.HeadingThree]: "h3",
  [Type.HeadingFour]: "h4",
  [Type.HeadingFive]: "h5",
  [Type.HeadingSix]: "h6",
  [Type.SubtitleOne]: "p",
  [Type.SubtitleTwo]: "p",
  [Type.SubtitleThree]: "p",
  [Type.BodyOne]: "p",
  [Type.BodyTwo]: "p",
  [Type.BodyThree]: "p",
  [Type.BodyFour]: "p",
  [Type.BodyFive]: "p",
  [Type.BodySix]: "p",
};
// className='text-3'
const typeToClassNameMap = {
  [Type.HeadingOne]: "text-3xl sm:text-[2.5rem]/tight sm:tracking-px",
  [Type.HeadingTwo]: "text-[1.75rem]/9 sm:text-4xl/tight",
  [Type.HeadingThree]: "text-2xl sm:text-[1.75rem]/none",
  [Type.HeadingFour]: "text-xl sm:text-2xl/tight",
  [Type.HeadingFive]: "text-base sm:text-xl/tight",
  [Type.HeadingSix]: "text-xs/2xl",
  [Type.SubtitleOne]: "text-xl sm:text-4xl/[1.4]",
  [Type.SubtitleTwo]: "text-lg sm:text-3xl/[1.1]",
  [Type.SubtitleThree]: "text-base lg:text-2xl/[1.4]",
  [Type.BodyOne]: "text-lg sm:text-xl/normal tracking-[0.03125rem]",
  [Type.BodyTwo]: "text-base sm:text-lg/normal tracking-[0.03125rem]",
  [Type.BodyThree]: "text-sm sm:text-base/[1.3]",
  [Type.BodyFour]:
    "text-sm sm:text-sm/tight lg:text-sm/[1.3] tracking-[0.03125rem]",
  [Type.BodyFive]: "text-xs sm:text-xs/5",
  [Type.BodySix]: "text-[0.5rem]/[1rem] leading-[0.65rem]/[1.5rem]",
};

const Text: FC<TextProps> & {
  Type: typeof Type;
  Weight: typeof Weight;
} = ({
  as,
  type = Type.BodyThree,
  weight = Weight.Normal,
  className,
  children,
  ...props
}) => {
  const textClassName =
    typeToClassNameMap[type] ?? typeToClassNameMap["bodyThree"];

  const As = as ?? typeToAsMap[type];

  return (
    <As
      {...({
        ...props,
        children,
        className: cn(textClassName, "text-black-500", weight, className),
      } as DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>)}
    />
  );
};

Text.Type = Type;
Text.Weight = Weight;

export default Text;
