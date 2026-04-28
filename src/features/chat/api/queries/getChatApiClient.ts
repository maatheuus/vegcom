import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../chatApi";

export const chatKeys = {
  all: ["chats"] as const,
  lists: () => [...chatKeys.all, "list"] as const,
  detail: (id: number) => [...chatKeys.all, "detail", id] as const,
  messages: (chatId?: number) => [...chatKeys.all, "messages", chatId] as const,
};

export const useGetChats = () => {
  return useQuery({
    queryKey: chatKeys.lists(),
    queryFn: chatApi.getChats,
    enabled: !!getAccessToken(),
  });
};

export const useGetChatById = (id: number) => {
  return useQuery({
    queryKey: chatKeys.detail(id),
    queryFn: () => chatApi.getChatById(id),
    enabled: !!id && !!getAccessToken(),
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
    onError: (error) => {
      console.error("Erro ao criar chat:", error);
    },
  });
};

export const useUpdateChatTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.updateChatTitle,
    onMutate: async (newChat) => {
      await queryClient.cancelQueries({ queryKey: chatKeys.lists() });

      const previousChats = queryClient.getQueryData(chatKeys.lists());

      queryClient.setQueryData(chatKeys.lists(), (old: unknown) => {
        const oldData = old as { data: Array<{ id: number; title: string }> } | undefined;
        if (!oldData?.data) return old;
        return {
          ...oldData,
          data: oldData.data.map((chat) =>
            chat.id === newChat.id ? { ...chat, title: newChat.title } : chat,
          ),
        };
      });

      return { previousChats };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousChats) {
        queryClient.setQueryData(chatKeys.lists(), context.previousChats);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
};

export const useGetChatMessage = () => {
  return useMutation({
    mutationFn: chatApi.getChatMessage,
  });
};
