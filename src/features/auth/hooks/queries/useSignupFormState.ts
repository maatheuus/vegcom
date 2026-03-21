import type { CulinaryLevel, Preference } from "@/features/account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSignup } from "../../api/queries/getAuthApiServer";
import type { SignupData } from "../../types";

export type Step = "signupForm" | "userInformation" | "success";

export type SignupFormData = {
  currentStep: Step;
  name?: string;
  email?: string;
  password?: string;
  aboutInfo?: string;
  meetUs?: string;
  preference?: Preference;
  location?: string;
  culinaryLevel?: CulinaryLevel;
};

const stepsOrder: Step[] = ["signupForm", "userInformation", "success"];
const queryKey = ["signupFormData"];

async function submitSignupForm(data: Omit<SignupFormData, "currentStep">) {
  const payload: SignupData = {
    name: data.name!,
    email: data.email!,
    password: data.password!,
    informations: {
      aboutInfo: data.aboutInfo!,
      preference: data.preference!,
      culinaryLevel: data.culinaryLevel!,
      location: data.location!,
      meetUs: data.meetUs,
    },
  };
  await getSignup(payload);

  return {
    success: true,
    message: "Cadastro finalizado com sucesso!",
    redirect: "/login",
  };
}

export function useSignupFormState() {
  const queryClient = useQueryClient();

  const { data } = useQuery<SignupFormData>({
    queryKey,
    initialData: { currentStep: "signupForm" },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const submitFormMutation = useMutation({
    mutationFn: submitSignupForm,
    onError: (error) => {
      console.error("Erro ao submeter o formulário:", error);
    },
  });

  const updateFormData = (
    newData: Partial<Omit<SignupFormData, "currentStep">>,
  ) => {
    queryClient.setQueryData<SignupFormData>(queryKey, (prev) => ({
      ...prev!,
      ...newData,
    }));
  };

  const setStep = (step: Step) => {
    queryClient.setQueryData<SignupFormData>(queryKey, (prev) => ({
      ...prev!,
      currentStep: step,
    }));
  };

  const nextStep = () => {
    const currentIndex = stepsOrder.indexOf(data.currentStep);
    if (currentIndex < stepsOrder.length - 1) {
      setStep(stepsOrder[currentIndex + 1]);
    }
  };

  return {
    formData: data,
    currentStep: data.currentStep,
    isSubmitting: submitFormMutation.isPending,
    setStep,
    nextStep,
    updateFormData,
    submitForm: submitFormMutation,
  };
}
