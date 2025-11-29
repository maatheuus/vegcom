import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";

interface Props {
  hasButton?: boolean;
  className?: string;
  children?: React.ReactNode;
  title: string;
  subTitle: string;
  buttonCta?: {
    text: string;
    onClick: () => void;
  };
}

export default function Header({
  title,
  subTitle,
  hasButton,
  buttonCta,
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`flex items-center justify-between ${className ?? ""}`}
      {...props}
    >
      <div>
        <Text
          as="h2"
          type={Text.Type.HeadingThree}
          weight={Text.Weight.Bold}
          className="font-lora text-green-500"
        >
          {title}
        </Text>
        <Text
          as="p"
          type={Text.Type.BodyThree}
          weight={Text.Weight.Medium}
          className="font-maitree text-green-200"
        >
          {subTitle}
        </Text>
      </div>

      {children ? (
        children
      ) : hasButton && buttonCta ? (
        <Button
          variant="default"
          size="default"
          onClick={buttonCta.onClick}
          className="font-maitree cursor-pointer"
        >
          {buttonCta.text}
        </Button>
      ) : null}
    </div>
  );
}
