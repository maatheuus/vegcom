import { signup } from "../../api/authApi";
import type { AuthResponse } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Type definition for signup payload and response merging.
 */
type SignupData = {
  /** The desired username. */
  username: string;
  /** The user's email address. */
  email: string;
  /** The user's chosen password. */
  password: string;
  /** Optional response data populated after successful signup. */
  singupData?: AuthResponse;
};

/**
 * Asynchronous function to perform the signup API call.
 *
 * @param {SignupData} payload - The registration data.
 * @returns {Promise<SignupData>} The payload merged with the API response.
 */
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

/**
 * Custom hook for handling user signup mutations.
 * Updates the query cache with the new user data upon success.
 *
 * @returns {UseMutationResult<SignupData, Error, SignupData>} The mutation hook result.
 */
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
