import {
  AlienOutlinedIcon,
  EditPencilOutlinedIcon,
  PlusOutlinedIcon,
  TrashOutlinedIcon,
} from "@/shared/icons";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
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
            m.content.toLowerCase().includes(query.toLowerCase()),
          ),
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
      <Col className="h-full min-h-0 w-full">
        <div className="flex w-full items-center justify-between gap-6 border-b border-gray-100 py-4">
          <button
            onClick={createNewChat}
            disabled={chats.length >= 2}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-green-500 bg-green-50 px-3 py-2 text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-green-50 disabled:pointer-events-none disabled:opacity-50"
          >
            <PlusOutlinedIcon
              size={18}
              className="text-green-200 transition-colors group-hover:text-green-50"
            />{" "}
            <Text type={Text.Type.BodyFour} className="font-lora">
              Nova conversa
            </Text>
          </button>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar conversas..."
            className="font-lora flex-1 rounded-md border border-green-500 px-3 py-2 text-sm text-green-500 placeholder:text-green-500/90 focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-2">
          {visibleChats.length === 0 ? (
            <div className="mt-8 px-4 text-center text-gray-500">
              <AlienOutlinedIcon
                size={36}
                className="mx-auto mb-3 text-green-500 opacity-50"
              />
              <p className="font-lora text-sm">
                Perdido? Não há nada aqui, humano.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {visibleChats.map((chat) => {
                const isActive = currentChatId === chat.id;
                return (
                  <div
                    key={chat.id}
                    onClick={() => openChatInTab(chat.id)}
                    className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive
                        ? "border border-green-100 bg-green-50 shadow-sm"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <MessageCircle size={16} className="text-green-200" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Text
                        type={Text.Type.BodyFour}
                        className="font-lora truncate font-medium text-green-500 italic"
                      >
                        {chat.title || "Nova conversa"}
                      </Text>
                      <Text
                        type={Text.Type.BodyFive}
                        className="font-maitree text-gray-500"
                      >
                        {chat.messages.length} mensagens •{" "}
                        {new Date(chat.updatedAt).toLocaleString()}
                      </Text>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button.Icon
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatIdToRename(chat.id);
                          setIsRenameModalOpen(true);
                        }}
                        className="rounded p-1 text-green-200 hover:bg-green-100"
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
                        className="rounded p-1 text-green-200 hover:bg-red-50 hover:text-red-600"
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
