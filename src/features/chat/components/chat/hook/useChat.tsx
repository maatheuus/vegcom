import { useRouter } from "next/navigation";
import { useGetChats } from "../../../api/queries/getChatApiClient";
import type { CreateChatResponseData } from "../../../api/types";

interface ChatItem {
  id: string;
  title: string;
  messages: { role: string; content: string }[];
  updatedAt: Date;
}

export function useChat() {
  const router = useRouter();
  const { data: chatsData } = useGetChats();

  const allChatData: CreateChatResponseData[] = [];
  if (Array.isArray(chatsData)) {
    for (const response of chatsData) {
      if (response.data && Array.isArray(response.data)) {
        allChatData.push(...response.data);
      }
    }
  }

  const chats: ChatItem[] = allChatData.map((chat) => ({
    id: chat.id?.toString() ?? "",
    title: chat.title || "Nova conversa",
    messages: [],
    updatedAt: new Date(chat.updatedAt),
  }));

  const currentChatId: string | null = null;

  const createNewChat = () => {
    router.push("/chat");
  };

  return {
    chats,
    currentChatId,
    createNewChat,
  };
}
