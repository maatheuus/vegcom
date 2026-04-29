"use client";

import useDebounce from "@/shared/hooks/useDebounce";
import EmptyState from "@/shared/ui/EmptyState";
import { Input } from "@/shared/ui/Input";
import Text from "@/shared/ui/Text";
import { AlienIcon, PlusCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { GetChatsData } from "../../api/types";
import ChatsCard from "./ChatsCard";
import DeleteChatModal from "./modals/DeleteChat";
import RenameChatModal from "./modals/RenameChat";
import SheetMobile from "./SheetMobile";

interface Props {
  chats: GetChatsData;
}

export default function HistoryChatPage({ chats: { data } }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const bunceQuery = useDebounce(query, 500);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatIdToRename, setChatIdToRename] = useState<string | null>(null);
  const [chatIdToDelete, setChatIdToDelete] = useState<string | null>(null);
  const [menuChatId, setMenuChatId] = useState<string | null>(null);

  const resolveTitle = (title?: string) =>
    title === "null" || !title ? "Nova conversa" : title;

  const visibleChats = useMemo(() => {
    return [...data]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .filter(
        (c) =>
          !bunceQuery ||
          c.title?.toLowerCase().includes(bunceQuery.toLowerCase()) ||
          c.lastMessage?.content
            ?.toLowerCase()
            .includes(bunceQuery.toLowerCase()),
      );
  }, [data, bunceQuery]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (bunceQuery) {
      params.set("q", bunceQuery);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [bunceQuery, pathname, router, searchParams]);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 border-b border-gray-100 py-4 md:gap-6">
        <Link
          href="/chat"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-green-500 bg-green-50 px-3 py-2.5 text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-green-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <PlusCircleIcon
            size={18}
            className="text-green-200 transition-colors group-hover:text-green-50"
          />{" "}
          <Text type={Text.Type.BodyFour} className="font-lora">
            Nova conversa
          </Text>
        </Link>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar conversas..."
          className="font-lora flex-1 rounded-md border border-green-500 px-3 py-2 text-sm text-green-500 placeholder:text-green-500/90 focus:ring-0 focus:outline-none"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-2">
        {visibleChats.length === 0 ? (
          <EmptyState
            icon={<AlienIcon size={28} />}
            title="Perdido? Não há nada aqui, humano."
            size="compact"
            className="mt-8"
          />
        ) : (
          <div className="space-y-1">
            <ChatsCard
              chats={visibleChats}
              handleIsRenameModalOpen={setIsRenameModalOpen}
              handleIsDeleteModalOpen={setIsDeleteModalOpen}
              setMenuChatId={setMenuChatId}
              setChatIdToRename={setChatIdToRename}
              setChatIdToDelete={setChatIdToDelete}
            />
          </div>
        )}
      </div>

      <RenameChatModal
        chatName={resolveTitle(visibleChats.find((c) => c.id === Number(chatIdToRename))?.title)}
        chatIdToRename={chatIdToRename}
        isRenameModalOpen={isRenameModalOpen}
        handleIsRenameModalOpen={setIsRenameModalOpen}
      />

      <DeleteChatModal
        chatName={resolveTitle(visibleChats.find((c) => c.id === Number(chatIdToDelete))?.title)}
        chatIdToDelete={chatIdToDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        handleIsDeleteModalOpen={setIsDeleteModalOpen}
      />

      <SheetMobile
        menuChatId={menuChatId}
        setMenuChatId={setMenuChatId}
        setIsRenameModalOpen={setIsRenameModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setChatIdToRename={setChatIdToRename}
        setChatIdToDelete={setChatIdToDelete}
      />
    </>
  );
}
