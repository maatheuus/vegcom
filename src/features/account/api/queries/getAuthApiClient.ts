import { authApi } from "@/features/auth/api/authApi";
import type { LoginCredentials, SignupData } from "@/features/auth/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const authKeys = {
  all: ["auth"] as const,
  user: ["auth", "user"] as const,
};

export const useGetUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: authApi.getUser,
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.signin(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};
