"use client";

import { ArrowCircleRightOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/components/ui/Input/Otp";
import Col from "@/components/ui/Layout/Helpers/Col";
import { useStepStore } from "@/hooks/auth/signupFlow/setLocalData";
import Link from "next/link";

export default function CodeConfirm() {
    const { nextStep, setStep } = useStepStore();
  
  return (
    <Col className="mx-auto h-fit gap-24 justify-around">
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Col className="items-center gap-2 px-5 py-4">
        <Button.Icon
          type="submit"
          rightIcon={<ArrowCircleRightOutlinedIcon size={24} />}
          text="Seguinte"
          className="font-semibold w-full sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
          onClick={() => {
            setStep("codeConfirm");
            nextStep();
          }}
        />

        <Button
          type="button"
          variant="text"
          className="text-base font-semibold w-full sm:max-w-80 cursor-pointer hover:bg-transparent"
        >
          Já possui uma conta?
          <Link
            href="/login"
            className="font-bold hover:text-green-700 transition-colors duration-300"
          >
            Login
          </Link>
        </Button>
      </Col>
    </Col>
  );
}
