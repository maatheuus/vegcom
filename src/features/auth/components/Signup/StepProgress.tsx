"use client";

import {
  useSignupFormState,
  type Step,
} from "@/features/auth/hooks/queries/useSignupFormState";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { CheckIcon } from "@phosphor-icons/react";

import { cn } from "@/shared/lib/utils";
import { Fragment } from "react";

const stepsOrder: Step[] = ["signupForm", "userInformation", "success"];

export default function StepProgress() {
  const { currentStep, setStep } = useSignupFormState();
  const currentIndex = stepsOrder.indexOf(currentStep);

  return (
    <Row.Center className="relative mx-auto mb-20 w-full max-w-md">
      {stepsOrder.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <Fragment key={step}>
            <Col
              className="z-10 items-center"
              // Ação de clique para navegar para passos anteriores
              onClick={() => isCompleted && setStep(step)}
            >
              <Row.Center
                className={cn(
                  "relative size-6 rounded-full border-2 bg-green-50 transition-colors duration-300",
                  isCompleted
                    ? "cursor-pointer border-green-500 hover:bg-green-100" // Adiciona feedback visual
                    : isCurrent
                      ? "border-green-500"
                      : "border-green-100",
                )}
              >
                {isCompleted && (
                  <CheckIcon size={20} className="text-green-500" />
                )}
              </Row.Center>
            </Col>

            {index < stepsOrder.length - 1 && (
              <Row.Center className="relative h-1 flex-grow bg-green-50">
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full bg-green-500 transition-all duration-700 ease-in-out",
                    isCompleted ? "w-full" : "w-0",
                  )}
                />
              </Row.Center>
            )}
          </Fragment>
        );
      })}
    </Row.Center>
  );
}
