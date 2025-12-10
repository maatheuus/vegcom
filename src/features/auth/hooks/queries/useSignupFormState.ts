import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Represents the steps in the signup flow.
 */
export type Step = "signupForm" | "userInformation" | "success";

/**
 * Data structure for the signup form state.
 */
export type SignupFormData = {
  /** The current step in the signup process. */
  currentStep: Step;
  /** User's chosen username. */
  username?: string;
  /** User's email address. */
  email?: string;
  /** User's password. */
  password?: string;
  /** Additional user information (bio/description). */
  userInfo?: string;
  /** How the user heard about us. */
  meetUsInfo?: string;
  /** Dietary preference. */
  preference?: "vegan" | "vegetarian" | "";
  /** User's location. */
  location?: string;
  /** User's culinary skill level. */
  culinaryLevel?: "beginner" | "intermediate" | "advanced" | "";
};

const stepsOrder: Step[] = ["signupForm", "userInformation", "success"];
const queryKey = ["signupFormData"];

/**
 * Simulates submitting the final signup form data to the backend.
 *
 * @param {Omit<SignupFormData, "currentStep">} data - The form data without the step state.
 * @returns {Promise<Object>} A promise resolving to the success response.
 */
async function submitSignupForm(data: Omit<SignupFormData, "currentStep">) {
  console.log("dados backend:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: "Cadastro finalizado com sucesso!",
    redirect: "/login",
  };
}

/**
 * Custom hook to manage the state of the multi-step signup form.
 * Uses React Query to persist form state across renders and manage mutations.
 *
 * @returns {Object} An object containing the form state and control functions.
 * @returns {SignupFormData} return.formData - The complete form data object.
 * @returns {Step} return.currentStep - The current active step.
 * @returns {boolean} return.isSubmitting - Whether the form submission is in progress.
 * @returns {Function} return.setStep - Function to manually set the current step.
 * @returns {Function} return.nextStep - Function to advance to the next step.
 * @returns {Function} return.updateFormData - Function to update specific fields in the form data.
 * @returns {UseMutationResult} return.submitForm - The mutation object for submitting the form.
 */
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

  /**
   * Updates partial form data in the cache.
   * @param {Partial<Omit<SignupFormData, "currentStep">>} newData - The new data to merge.
   */
  const updateFormData = (
    newData: Partial<Omit<SignupFormData, "currentStep">>,
  ) => {
    queryClient.setQueryData<SignupFormData>(queryKey, (prev) => ({
      ...prev!,
      ...newData,
    }));
  };

  /**
   * Sets the current step of the form wizard.
   * @param {Step} step - The step to navigate to.
   */
  const setStep = (step: Step) => {
    queryClient.setQueryData<SignupFormData>(queryKey, (prev) => ({
      ...prev!,
      currentStep: step,
    }));
  };

  /**
   * Advances the wizard to the next step based on the defined order.
   */
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
