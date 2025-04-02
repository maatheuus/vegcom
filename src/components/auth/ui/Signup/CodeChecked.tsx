'use client';

import { ArrowCircleRightOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import { useStepStore } from "@/hooks/auth/signupFlow/setLocalData";

export default function CodeChecked() {
  const { nextStep, setStep } = useStepStore();

  return (
    <Col className="items-center gap-2 px-5 py-4">
      <Button.Icon
        type="submit"
        rightIcon={<ArrowCircleRightOutlinedIcon size={24} />}
        text="Seguinte"
        className="font-semibold w-full sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
        onClick={() => {
          setStep("verification");
          nextStep();
        }}
      />
    </Col>
  );
}
