import {
  type UpdatePasswordPayload,
  type UpdateProfilePayload,
  authApi,
} from "@/features/auth/api/authApi";
import type { EmailPreferences } from "@/features/auth/api/types";
import { authKeys } from "@/features/auth/api/queries/getAuthApiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authApi.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) =>
      authApi.updatePassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (password: string) => authApi.deleteAccount(password),
  });
};

export const useUpdateNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmailPreferences) =>
      authApi.updateNotifications(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
};
