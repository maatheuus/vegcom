import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Step = "signupForm" | "userInformation" | "success";

export type SignupFormData = {
  currentStep: Step;
  username?: string;
  email?: string;
  password?: string;
  userInfo?: string;
  meetUsInfo?: string;
  preference?: "vegan" | "vegetarian" | "";
  location?: string;
  culinaryLevel?: "beginner" | "intermediate" | "advanced" | "";
};

const stepsOrder: Step[] = ["signupForm", "userInformation", "success"];
const queryKey = ["signupFormData"];

async function submitSignupForm(data: Omit<SignupFormData, "currentStep">) {
  console.log("dados backend:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
    onSuccess: (result) => {
      console.log("useMutation", result.message);
    },
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
