"use client";

import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import FormPage from "@/features/auth/components/Signup/ProgressView/Steps/FormPage";
import SuccessPage from "@/features/auth/components/Signup/ProgressView/Steps/SuccessPage";
import UserInformationPage from "./ProgressView/Steps/UserInformationPage";

const stepVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function SignupFlow() {
  const { currentStep: stepName } = useSignupFormState();
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
