"use client";

import CodeConfirmPage from "@/components/auth/ui/Signup/ProgressView/Steps/CodeConfirmPage";
import FormPage from "@/components/auth/ui/Signup/ProgressView/Steps/FormPage";
import SuccessPage from "@/components/auth/ui/Signup/ProgressView/Steps/SuccessPage";
import VerificationPage from "@/components/auth/ui/Signup/ProgressView/Steps/VerificationPage";
import useGetSignupUser from "@/hooks/auth/queryes/useGetSignupUser";
import { useStepStore } from "@/hooks/auth/signupFlow/setLocalData";
import { useEffect, useState } from "react";
import UserInformationPage from "./ProgressView/Steps/UserInformationPage";

export default function SignupFlow() {
  const { data: signupUserData } = useGetSignupUser();
  const [currentStep, setCurrentStep] = useState(0);
  const { currentStep: step } = useStepStore();

  useEffect(() => {
    // if (!signupUserData) return;

    switch (step) {
      case "signupForm":
        setCurrentStep(0);
        break;
      // case "codeConfirm":
      //   setCurrentStep(1);
      //   break;
      // case "verification":
      //   setCurrentStep(2);
      //   break;
      case "userInformation":
        setCurrentStep(3);
        break;
      case "success":
        setCurrentStep(4);
        break;
      default:
        break;
    }
  }, [signupUserData, step]);

  const steps = [
    <FormPage key="form" />,
    <CodeConfirmPage key="codeConfirm" />,
    <VerificationPage key="verification" />,
    <UserInformationPage key="userInformation" />,
    <SuccessPage key="success" />,
  ];

  // useEffect(() => {
  //   const container = document.getElementById("signup-steps-container");
  //   if (container) {
  //     gsap.killTweensOf(container);
  //     gsap.fromTo(
  //       container,
  //       { x: -100, opacity: 0, ease: "power2.inOut" },
  //       { x: 0, opacity: 1, duration: 0.8, ease: "power2.inOut" }
  //     );
  //   }
  // }, [currentStep]);

  return <div id="signup-steps-container">{steps[currentStep]}</div>;
}
