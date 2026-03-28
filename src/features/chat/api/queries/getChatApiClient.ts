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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: chatKeys.detail(variables.id),
      });
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
