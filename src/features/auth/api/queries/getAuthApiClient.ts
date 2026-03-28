import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/shared/api/axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginCredentials, SignupData } from "../../types";
import { authApi } from "../authApi";

export const authKeys = {
  all: ["auth"] as const,
  user: ["auth", "user"] as const,
};

export const useGetUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: authApi.getUser,
    retry: false,
    staleTime: 0,
    enabled: !!getAccessToken(),
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.signin(credentials),
    onSuccess: async (response) => {
      setAccessToken(response.accessToken);
      await queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: async () => {
      removeAccessToken();
      await queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      removeAccessToken();
    },
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
    },
  });
};

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.checkEmail(email),
  });
};
