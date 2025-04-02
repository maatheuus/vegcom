import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Step =
  | "signupForm"
  | "codeConfirm"
  | "verification"
  | "userInformation"
  | "success";

const steps: Step[] = [
  "signupForm",
  // "codeConfirm",
  // "verification",
  "userInformation",
  "success",
];

type StepStore = {
  currentStep: Step;
  setStep: (step: Step) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const useStepStore = create<StepStore>()(
  persist(
    (set, get) => ({
      currentStep: "signupForm",
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => {
        const current = get().currentStep;
        const index = steps.indexOf(current);
        if (index < steps.length - 1) {
          set({ currentStep: steps[index + 1] });
        }
      },
      prevStep: () => {
        const current = get().currentStep;
        const index = steps.indexOf(current);
        if (index > 0) {
          set({ currentStep: steps[index - 1] });
        }
      },
    }),
    {
      name: "step-form-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: (_key: string) => null, // eslint-disable-line
          setItem: (_key: string, _value: string) => {}, // eslint-disable-line
          removeItem: (_key: string) => {}, // eslint-disable-line
        };
      }),
    }
  )
);
