import { chatKeys } from "@/features/chat/api/queries/getChatApiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    },
    onError: (error) => {
      console.error("Erro ao gerar resposta:", error);
    },
  });
};
