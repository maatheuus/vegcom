import {
  type UpdatePasswordPayload,
  type UpdateProfilePayload,
  authApi,
} from "@/features/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authApi.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_auth_user"] });
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) =>
      authApi.updatePassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_auth_user"] });
    },
  });
};
