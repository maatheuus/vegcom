import {
  AlienOutlinedIcon,
  EditPencilOutlinedIcon,
  PlusOutlinedIcon,
  TrashOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Col from "@/components/ui/Layout/Helpers/Col";
import Text from "@/components/ui/Text";
import { MessageCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useChat } from "../chat/useChat";
import DeleteChatModal from "../historyChats/modals/DeleteChat";
import RenameChatModal from "../historyChats/modals/RenameChat";

export default function HistoryChatPage() {
  const { chats, currentChatId, createNewChat } = useChat();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [chatIdToRename, setChatIdToRename] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatIdToDelete, setChatIdToDelete] = useState<string | null>(null);

  const visibleChats = useMemo(() => {
    return chats
      .slice()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter(
        (c) =>
          !query ||
          c.title?.toLowerCase().includes(query.toLowerCase()) ||
          c.messages.some((m) =>
            m.content.toLowerCase().includes(query.toLowerCase())
          )
      );
  }, [chats, query]);

  const openChatInTab = (id: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("tab", "chat");
    params.set("chatId", id);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <>
      <Col className="w-full h-full min-h-0">
        <div className="w-full py-4 border-b border-gray-100 flex items-center gap-6 justify-between">
          <button
            onClick={createNewChat}
            disabled={chats.length >= 2}
            className="inline-flex items-center gap-2 px-3 py-2 cursor-pointer bg-green-50 hover:bg-green-500 hover:text-green-50 text-green-500 rounded-md border border-green-500 transition-colors duration-300 group disabled:opacity-50 disabled:pointer-events-none"
          >
            <PlusOutlinedIcon
              size={18}
              className="group-hover:text-green-50 text-green-200 transition-colors"
            />{" "}
            <Text type={Text.Type.BodyFour}>Nova conversa</Text>
          </button>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar conversas..."
            className="flex-1 px-3 py-2 rounded-md border border-green-500 placeholder:text-green-500/90 text-green-500 text-sm focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto py-2 min-h-0">
          {visibleChats.length === 0 ? (
            <div className="text-center text-gray-500 mt-8 px-4">
              <AlienOutlinedIcon
                size={36}
                className="mx-auto mb-3 opacity-50"
              />
              <p className="text-sm">Perdido? Não há nada aqui, humano.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {visibleChats.map((chat) => {
                const isActive = currentChatId === chat.id;
                return (
                  <div
                    key={chat.id}
                    onClick={() => openChatInTab(chat.id)}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      isActive
                        ? "bg-green-50 border border-green-100 shadow-sm"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <MessageCircle size={16} className="text-green-200" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Text
                        type={Text.Type.BodyFour}
                        className="text-green-500 truncate"
                      >
                        {chat.title || "Nova conversa"}
                      </Text>
                      <Text type={Text.Type.BodyFive} className="text-gray-500">
                        {chat.messages.length} mensagens •{" "}
                        {new Date(chat.updatedAt).toLocaleString()}
                      </Text>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button.Icon
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatIdToRename(chat.id);
                          setIsRenameModalOpen(true);
                        }}
                        className="p-1 rounded hover:bg-green-100 text-green-200"
                        variant="text"
                        icon={<EditPencilOutlinedIcon size={16} />}
                        type="button"
                      />

                      <Button.Icon
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatIdToDelete(chat.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1 rounded hover:bg-red-50 hover:text-red-600 text-green-200"
                        variant="text"
                        icon={<TrashOutlinedIcon size={16} />}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Col>

      <RenameChatModal
        chatIdToRename={chatIdToRename}
        isRenameModalOpen={isRenameModalOpen}
        onCloseRenameModal={setIsRenameModalOpen}
      />

      <DeleteChatModal
        chatIdToDelete={chatIdToDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        onCloseDeleteModal={setIsDeleteModalOpen}
      />
    </>
  );
}
