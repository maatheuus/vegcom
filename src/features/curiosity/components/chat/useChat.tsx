import { createContext, useContext } from "react";
import type { ChatContextType } from "./types";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};

export { ChatContext, useChat };
