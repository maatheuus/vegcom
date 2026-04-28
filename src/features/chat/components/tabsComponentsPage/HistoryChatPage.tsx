"use client";

import useDebounce from "@/shared/hooks/useDebounce";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import Text from "@/shared/ui/Text";
import {
  AlienIcon,
  ChatCircleIcon,
  DotsThreeIcon,
  PencilSimpleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { GetChatsData } from "../../api/types";
import { useChat } from "../chat/hook/useChat";
import DeleteChatModal from "../historyChats/modals/DeleteChat";
import RenameChatModal from "../historyChats/modals/RenameChat";

interface Props {
  chats: GetChatsData;
}

export default function HistoryChatPage({ chats: { data } }: Props) {
  const { chats, currentChatId, createNewChat } = useChat();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const bunceQuery = useDebounce(query, 500);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [chatIdToRename, setChatIdToRename] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatIdToDelete, setChatIdToDelete] = useState<string | null>(null);
  const [menuChatId, setMenuChatId] = useState<string | null>(null);

  const visibleChats = useMemo(() => {
    return data
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .filter(
        (c) =>
          !bunceQuery ||
          c.title?.toLowerCase().includes(bunceQuery.toLowerCase()) ||
          c.lastMessage?.content
            .toLowerCase()
            .includes(bunceQuery.toLowerCase()),
      );
  }, [data, bunceQuery]);

  const openChatInTab = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const chatToRename = visibleChats.find(
    (c) => c.id.toString() === chatIdToRename,
  );

  const chatToDelete = visibleChats.find(
    (c) => c.id.toString() === chatIdToDelete,
  );

  return (
    <>
      <Col className="h-full min-h-0 w-full">
        <div className="flex w-full items-center justify-between gap-4 border-b border-gray-100 py-4 md:gap-6">
          <button
            onClick={createNewChat}
            disabled={chats.length >= 2}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-green-500 bg-green-50 px-3 py-2 text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-green-50 disabled:pointer-events-none disabled:opacity-50"
          >
            <PlusCircleIcon
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
              <AlienIcon
                size={32}
                className="mx-auto mb-3 text-green-500 opacity-50"
              />
              <p className="font-lora text-sm">
                Perdido? Não há nada aqui, humano.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {chats.map((chat) => {
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
                      <ChatCircleIcon size={16} className="text-green-200" />
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

                    <div className="flex items-center gap-1">
                      <div className="hidden items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                        <Button.Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            setChatIdToRename(chat.id);
                            setIsRenameModalOpen(true);
                          }}
                          className="rounded p-1 text-green-200 hover:bg-green-100"
                          variant="text"
                          icon={<PencilSimpleIcon size={16} />}
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
                          icon={<TrashIcon size={16} />}
                        />
                      </div>

                      <div className="relative flex items-center gap-1 md:hidden">
                        <Button.Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuChatId(chat.id);
                          }}
                          className="rounded p-1 text-green-200 hover:bg-green-100"
                          variant="text"
                          icon={<DotsThreeIcon size={18} />}
                          type="button"
                        />
                      </div>
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
        handleIsRenameModalOpen={setIsRenameModalOpen}
      />

      <DeleteChatModal
        chatName={chatToDelete?.title}
        chatIdToDelete={chatIdToDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        handleIsDeleteModalOpen={setIsDeleteModalOpen}
      />

      <Sheet
        open={!!menuChatId}
        onOpenChange={(open) => !open && setMenuChatId(null)}
      >
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="mb-4 text-left">
            <SheetTitle className="font-lora text-lg text-green-800">
              Opções da conversa
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Button.Icon
                onClick={(e) => {
                  e.stopPropagation();
                  if (menuChatId) {
                    setChatIdToRename(menuChatId);
                    setIsRenameModalOpen(true);
                  }
                }}
                className="font-lora w-full justify-start rounded-lg bg-green-50 px-4 py-3 text-base text-green-700 hover:bg-green-100"
                variant="text"
                leftIcon={<PencilSimpleIcon size={20} />}
                text="Renomear conversa"
              />
            </SheetClose>

            <SheetClose asChild>
              <Button.Icon
                onClick={(e) => {
                  e.stopPropagation();
                  if (menuChatId) {
                    setChatIdToDelete(menuChatId);
                    setIsDeleteModalOpen(true);
                  }
                }}
                className="font-lora w-full justify-start rounded-lg bg-red-50 px-4 py-3 text-base text-red-600 hover:bg-red-100"
                variant="text"
                leftIcon={<TrashIcon size={20} />}
                text="Excluir conversa"
              />
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
