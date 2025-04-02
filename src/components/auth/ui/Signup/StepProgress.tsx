"use client";

import {
  CheckOutlinedIcon,
  ProgressLineOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import { useStepStore, type Step } from "@/hooks/auth/signupFlow/setLocalData";
import { cn } from "@/lib/utils";
import { gsap } from "gsap/gsap-core";
import { Fragment, useEffect, useRef } from "react";

interface Props extends React.ComponentProps<"div"> {
  label?: string;
  isCompleted?: boolean;
  isDisabled?: boolean;
}

const stepsOrder: Step[] = [
  "signupForm",
  // "codeConfirm",
  // "verification",
  "userInformation",
  "success",
];

export default function StepProgress({}: Props) {
  const { currentStep } = useStepStore();
  const currentIndex = stepsOrder.indexOf(currentStep);
  const gapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatedGaps = useRef<boolean[]>(
    new Array(stepsOrder.length - 1).fill(false)
  );

  useEffect(() => {
    gapRefs.current.forEach((el, index) => {
      if (el && index < currentIndex && !animatedGaps.current[index]) {
        gsap.set(el, { width: "100%" });
        animatedGaps.current[index] = true;
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    gapRefs.current.forEach((el, index) => {
      if (!el) return;

      if (index < currentIndex) {
        if (!animatedGaps.current[index]) {
          gsap.to(el, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
              animatedGaps.current[index] = true;
            },
          });
        } else {
          gsap.set(el, { width: "100%" });
        }
      } else {
        gsap.to(el, {
          width: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    });
  }, [currentIndex]);

  return (
    <Row.Center className="w-full relative mx-auto">
      <Row.Center className="p-5 gap-2 w-full">
        {stepsOrder.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <Fragment key={step}>
              <Col className="items-center">
                {isCompleted ? (
                  <Row className="gap-1.5 items-center relative">
                    <Row.Center className="size-5 relative rounded-full border-2 border-green-500">
                      <CheckOutlinedIcon
                        size={24}
                        className="text-green-500 absolute -top-1.5 -right-2"
                      />
                    </Row.Center>
                    <span className="text-green-500">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </Row>
                ) : (
                  <Row className="gap-1.5 items-center relative">
                    <Row.Center
                      className={cn(
                        "size-5 relative rounded-full border-2",
                        isCurrent ? "border-green-500" : "border-gray-300"
                      )}
                    ></Row.Center>
                    <span
                      className={isCurrent ? "text-green-500" : "text-gray-300"}
                    >
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </Row>
                )}
              </Col>
              {index < stepsOrder.length - 1 && (
                <div className="relative flex-grow w-full">
                  <ProgressLineOutlinedIcon className="text-gray-300" />
                  <div
                    ref={(el) => {
                      gapRefs.current[index] = el;
                    }}
                    className={cn(
                      "progress-line w-full absolute top-0 left-0 h-full",
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    )}
                  ></div>
                </div>
              )}
            </Fragment>
          );
        })}
      </Row.Center>
    </Row.Center>
  );
}
