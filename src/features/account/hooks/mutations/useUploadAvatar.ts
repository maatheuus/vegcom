import { authApi } from "@/features/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => authApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_auth_user"] });
    },
  });
};
