import { getTokenFromCookies } from "@/shared/api/axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginCredentials, SignupData } from "../../types";
import { authApi } from "../authApi";

export const authKeys = {
  all: ["auth"] as const,
  user: ["auth", "user"] as const,
};

export const useGetUser = () => {
  const token = getTokenFromCookies();

  return useQuery({
    queryKey: authKeys.user,
    queryFn: authApi.getUser,
    enabled: !!token,
    retry: false,
    staleTime: 0,
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

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.checkEmail(email),
  });
};
