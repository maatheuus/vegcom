import { ArrowCircleRightOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";

export default function CodeChecked() {
  return (
    <Col className="items-center gap-2 px-5 py-4">
      <Button.Icon
        type="submit"
        rightIcon={<ArrowCircleRightOutlinedIcon size={24} />}
        text="Seguinte"
        className="w-full font-semibold sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
        // onClick={() => {
        //   setStep("verification");
        //   nextStep();
        // }}
      />
    </Col>
  );
}
