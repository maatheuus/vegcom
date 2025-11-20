"use client";

import { ArrowCircleRightOutlinedIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/shared/ui/Input/Otp";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";

import Link from "next/link";

export default function CodeConfirm() {
  const { nextStep } = useSignupFormState();

  return (
    <Col className="mx-auto h-fit justify-around gap-24">
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
          className="w-full font-semibold sm:max-w-80 hover:[&_svg]:translate-x-1.5 hover:[&_svg]:transition-all hover:[&_svg]:duration-300"
          onClick={() => {
            // setStep("codeConfirm");
            nextStep();
          }}
        />

        <Button
          type="button"
          variant="text"
          className="w-full cursor-pointer text-base font-semibold hover:bg-transparent sm:max-w-80"
        >
          Já possui uma conta?
          <Link
            href="/login"
            className="font-bold transition-colors duration-300 hover:text-green-700"
          >
            Login
          </Link>
        </Button>
      </Col>
    </Col>
  );
}
