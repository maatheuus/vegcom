import type { CulinaryLevel, Preference } from "@/features/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../api/authApi";
import type { AuthResponse } from "../../types";

type SignupDataPayload = {
  name: string;
  email: string;
  password: string;
  singupData?: AuthResponse;
};

const signupUser = async (
  payload: SignupDataPayload,
): Promise<SignupDataPayload> => {
  const singupData = await authApi.signup({
    email: payload.email,
    password: payload.password,
    name: payload.name,
    informations: {
      aboutInfo: "",
      culinaryLevel: "BEGINNER" as CulinaryLevel.BEGINNER,
      location: "",
      preference: "VEGAN" as Preference.VEGAN,
    },
  });

  return {
    singupData: singupData as unknown as AuthResponse,
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };
};

const useSignupData = () => {
  const queryClient = useQueryClient();

  return useMutation<SignupDataPayload, Error, SignupDataPayload>({
    mutationKey: ["mutation_signup_user"],
    mutationFn: signupUser,
    onSuccess: (newData) => {
      queryClient.setQueryData(["signup_user"], newData);
    },
  });
};

export default useSignupData;
