"use client";

import { useSignupFormState } from "@/hooks/auth/queryes/useSignupFormState";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import FormPage from "@/components/auth/ui/Signup/ProgressView/Steps/FormPage";
import SuccessPage from "@/components/auth/ui/Signup/ProgressView/Steps/SuccessPage";
import UserInformationPage from "./ProgressView/Steps/UserInformationPage";

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50, position: "absolute" },
};

export default function SignupFlow() {
  const { currentStep: stepName } = useSignupFormState(); // <- Use o novo hook
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { name: "signupForm", component: <FormPage key="form" /> },
    {
      name: "userInformation",
      component: <UserInformationPage key="userInformation" />,
    },
    { name: "success", component: <SuccessPage key="success" /> },
  ];

  useEffect(() => {
    const newIndex = steps.findIndex((s) => s.name === stepName);
    if (newIndex !== -1) {
      setCurrentStepIndex(newIndex);
    }
  }, [stepName]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStepIndex}
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full"
      >
        {steps[currentStepIndex].component}
      </motion.div>
    </AnimatePresence>
  );
}
