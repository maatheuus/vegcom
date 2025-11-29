import { signup } from "../../api/authApi";
import type { AuthResponse } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SignupData = {
  username: string;
  email: string;
  password: string;
  singupData?: AuthResponse;
};

const signupUser = async (payload: SignupData): Promise<SignupData> => {
  const { singupData } = await signup({
    email: payload.email,
    password: payload.password,
    username: payload.username,
  });

  return {
    singupData,
    username: payload.username,
    email: payload.email,
    password: payload.password,
  };
};

const useSignupData = () => {
  const queryClient = useQueryClient();

  return useMutation<SignupData, Error, SignupData>({
    mutationKey: ["mutation_signup_user"],
    mutationFn: signupUser,
    onSuccess: (newData) => {
      queryClient.setQueryData(["signup_user"], newData);
    },
  });
};

export default useSignupData;