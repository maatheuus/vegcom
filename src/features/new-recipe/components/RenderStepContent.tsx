import type { NewRecipeForm } from "@/features/new-recipe/utils";
import StepOne from "./steps/StepOne";
import StepThree from "./steps/StepThree";
import StepTwo from "./steps/StepTwo";

interface Props {
  currentStep: number;
  form: NewRecipeForm;
}

export default function RenderStepContent({ currentStep, form }: Props) {
  switch (currentStep) {
    case 1:
      return <StepOne form={form} />;
    case 2:
      return <StepTwo form={form} />;
    case 3:
      return <StepThree form={form} />;
    default:
      return null;
  }
}
