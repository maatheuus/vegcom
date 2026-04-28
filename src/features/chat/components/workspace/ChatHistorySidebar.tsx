"use client";

import { useGetChats } from "@/features/chat/api/queries/getChatApiClient";
import DeleteChatModal from "@/features/chat/components/historyChats/modals/DeleteChat";
import RenameChatModal from "@/features/chat/components/historyChats/modals/RenameChat";
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
  DotsThreeIcon,
  PencilSimpleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface ChatHistorySidebarProps {
  onClose?: () => void;
}

export default function ChatHistorySidebar({
  onClose,
}: ChatHistorySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: chatsData } = useGetChats();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatIdToRename, setChatIdToRename] = useState<string | null>(null);
  const [chatIdToDelete, setChatIdToDelete] = useState<string | null>(null);
  const [menuChatId, setMenuChatId] = useState<string | null>(null);

  const activeChatId = pathname.startsWith("/chat/")
    ? pathname.split("/")[2]
    : null;

  const allChats = Array.isArray(chatsData?.data) ? chatsData.data : [];

  const visibleChats = useMemo(() => {
    return [...allChats]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .filter(
        (c) =>
          !debouncedQuery ||
          c.title?.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
  }, [allChats, debouncedQuery]);

  const chatToRename = visibleChats.find(
    (c) => c.id.toString() === chatIdToRename,
  );

  const chatToDelete = visibleChats.find(
    (c) => c.id.toString() === chatIdToDelete,
  );

  const openChat = (id: string) => {
    router.push(`/chat/${id}`);
    onClose?.();
  };

  return (
    <>
      <Col className="h-full min-h-0">
        {/* Header */}
        <div className="border-b border-green-100 px-3 pt-4 pb-3">
          <Text
            type={Text.Type.BodyThree}
            weight={Text.Weight.SemiBold}
            className="font-lora mb-3 text-green-500"
          >
            Histórico
          </Text>

          <button
            onClick={() => {
              router.push("/chat");
              onClose?.();
            }}
            className="group flex w-full cursor-pointer items-center gap-2 rounded-md border border-green-500 bg-transparent px-3 py-2 text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-green-50"
          >
            <PlusCircleIcon
              size={16}
              className="text-green-200 transition-colors group-hover:text-green-50"
            />
            <Text type={Text.Type.BodyFour} className="font-lora">
              Nova conversa
            </Text>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!allChats.length}
            placeholder="Buscar conversas..."
            className="font-lora w-full rounded-md border border-green-500 px-3 py-1.5 text-sm text-green-500 placeholder:text-green-500 focus:border-green-500 focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Chat list */}
        <div className="style-scrollbar min-h-0 flex-1 overflow-y-auto px-2 pb-4">
          {visibleChats.length === 0 ? (
            <div className="mt-6 space-y-2 px-2 text-center">
              <div className="mx-auto w-fit rounded-full bg-green-500 p-2">
                <AlienIcon size={24} className="text-green-50 opacity-90" />
              </div>
              <Text
                type={Text.Type.BodyFour}
                weight={Text.Weight.SemiBold}
                className="font-lora text-green-200 italic"
              >
                Nenhuma conversa ainda
              </Text>
            </div>
          ) : (
            <div className="space-y-0.5">
              {visibleChats.map((chat) => {
                const isActive = activeChatId === chat.id.toString();
                return (
                  <div
                    key={chat.id}
                    onClick={() => openChat(chat.id.toString())}
                    className={`group flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 transition-all duration-150 ${
                      isActive
                        ? "border border-green-200 bg-green-100"
                        : "hover:bg-green-100/60"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <Text
                        type={Text.Type.BodyThree}
                        weight={Text.Weight.SemiBold}
                        className="font-maitree truncate font-semibold text-green-500"
                      >
                        {chat.title === "null" || chat.title === undefined
                          ? "Nova conversa"
                          : chat.title}
                      </Text>
                    </div>

                    <div className="flex shrink-0 items-center gap-0.5">
                      <div className="hidden items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                        <Button.Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            setChatIdToRename(chat.id.toString());
                            setIsRenameModalOpen(true);
                          }}
                          className="rounded p-1 text-green-200 hover:bg-green-200/20 hover:text-green-500"
                          variant="text"
                          icon={<PencilSimpleIcon size={13} />}
                          type="button"
                        />
                        <Button.Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            setChatIdToDelete(chat.id.toString());
                            setIsDeleteModalOpen(true);
                          }}
                          className="rounded p-1 text-green-200 hover:bg-red-50 hover:text-red-500"
                          variant="text"
                          icon={<TrashIcon size={13} />}
                        />
                      </div>

                      <div className="flex items-center md:hidden">
                        <Button.Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuChatId(chat.id.toString());
                          }}
                          className="rounded p-1 text-green-200 hover:bg-green-100"
                          variant="text"
                          icon={<DotsThreeIcon size={16} />}
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
        chatName={chatToRename?.title}
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

      {/* Mobile context menu sheet */}
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
