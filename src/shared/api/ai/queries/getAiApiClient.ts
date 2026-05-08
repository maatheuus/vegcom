import { chatKeys } from "@/features/chat/api/queries/getChatApiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../../axios/axiosInstance";
import { aiApi } from "../ai";

export const useGenerateResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiApi.generateResponse,
    onSuccess: (data) => {
      const chatId = data?.chatId;
      if (chatId) {
        queryClient.invalidateQueries({
          queryKey: chatKeys.detail(chatId),
        });

        queryClient.invalidateQueries({
          queryKey: chatKeys.lists(),
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["usage-stats"],
      });
    },
    onError: (error) => {
      console.error("Erro ao gerar resposta:", error);
    },
  });
};

export const useGetUsageStats = () => {
  return useQuery({
    queryKey: ["usage-stats"],
    queryFn: aiApi.getUsageStats,
    enabled: !!getAccessToken(),
    staleTime: 1000 * 60 * 5,
  });
};
