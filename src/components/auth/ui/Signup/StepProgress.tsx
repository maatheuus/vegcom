"use client";
import {
  CheckOutlinedIcon,
  ProgressLineOutlinedIcon,
} from "@/components/icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { useState } from "react";

interface Props extends React.ComponentProps<"div"> {
  label?: string;
  isCompleted?: boolean;
  isDisabled?: boolean;
}

export default function StepProgress() {
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  const [isProgressCompleted, setIsProgressCompleted] =
    useState<boolean>(false);

  useGSAP(() => {
    if (true) {
      tl.to(".progress-line", {
        width: "100%",
        duration: 1.5,
        onComplete: () => {
          setIsProgressCompleted(true);
        },
      });
    }
  }, [isProgressCompleted]);

  return (
    <div className="flex justify-center items-center w-full relative mx-auto">
      <div className="flex items-center justify-center p-5 gap-2">
        <div className="flex gap-1.5 items-center relative">
          <div className="size-5 relative rounded-full flex items-center justify-center border-2 border-green-500">
            <CheckOutlinedIcon
              size={24}
              className="text-green-500 absolute -top-1.5 -right-2"
            />
          </div>
          <span className="text-green-500">01</span>
        </div>
        <div className="relative flex-grow">
          <ProgressLineOutlinedIcon className="text-gray-300" />
          <div className="progress-line w-0 absolute top-0 left-0 h-full bg-green-500"></div>
        </div>

        <div className="flex gap-1.5 items-center relative">
          <div className="size-5 relative rounded-full flex items-center justify-center border-2 border-green-500">
            {isProgressCompleted && (
              <CheckOutlinedIcon
                size={24}
                className="text-green-500 absolute -top-1.5 -right-2"
              />
            )}
          </div>
          <span className="text-green-500">02</span>
        </div>
        <ProgressLineOutlinedIcon />

        <div className="flex gap-1.5 items-center relative">
          <div className="size-5 relative rounded-full flex items-center justify-center border-2 border-green-500">
            <CheckOutlinedIcon
              size={24}
              className="text-green-500 absolute -top-1.5 -right-2"
            />
          </div>
          <span className="text-green-500">03</span>
        </div>
        <ProgressLineOutlinedIcon />

        <div className="flex gap-1.5 items-center relative">
          <div className="size-5 rounded-full flex items-center justify-center border-2 border-green-500"></div>
          <span className="text-green-500">04</span>
        </div>
      </div>
    </div>
  );
}
