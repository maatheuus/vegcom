import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthResponse, LoginCredentials, SignupData } from "../../types";
import { authApi } from "../authApi";
import type { User } from "../types";

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
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: (data: User) => {
      // localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};
