import { check } from "@/assets";
import { ArrowCircleRightOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import SignupLayout from "../layout";

export default function SuccessPage() {
  return (
    <SignupLayout
      left={{
        contentClassName: "h-full justify-center gap-y-5 max-w-[554px]",
        title:
          "Tudo certo por aqui! Você pode aproveitar o quanto você quiser, divirta-se!",
        children: (
          <Col className="items-center gap-2 px-5">
            <Button.Icon
              type="submit"
              rightIcon={<ArrowCircleRightOutlinedIcon size={24} />}
              text="Seguinte"
              className="font-semibold w-full sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
            />
          </Col>
        ),
      }}
      right={{
        src: check,
        alt: "a gif of two people checking a list",
        title: "two people checking a list",
        width: 785,
        height: 785,
        quality: 100,
        classImage: "scale-x-100",
      }}
    />
  );
}
