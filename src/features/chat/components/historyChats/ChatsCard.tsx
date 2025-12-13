"use client";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import {
  ChatCircleIcon,
  DotsThreeIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import type { GetChatsDataResponse } from "../../api/types";

interface Props {
  className?: string;
  chats: GetChatsDataResponse[];
  setIsRenameModalOpen: (open: boolean) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
  setMenuChatId: (id: string | null) => void;
  setChatIdToRename: (id: string | null) => void;
  setChatIdToDelete: (id: string | null) => void;
}

export default function ChatsCard({
  className,
  chats,
  setIsRenameModalOpen,
  setIsDeleteModalOpen,
  setMenuChatId,
  setChatIdToRename,
  setChatIdToDelete,
  ...props
}: Props) {
  const router = useRouter();

  const openChatInTab = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return chats.map((chat, idx) => (
    <div
      key={idx}
      onClick={() => openChatInTab(chat.id.toString())}
      className={`group flex cursor-pointer items-center gap-3 rounded-lg border border-green-100 bg-green-50 px-3 py-2 shadow-sm transition-all ${className ?? ""}`}
      {...props}
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
        <Text type={Text.Type.BodyFive} className="font-maitree text-gray-500">
          {format(chat.updatedAt, "dd/MM/yyyy HH:mm")}
        </Text>
      </div>

      <div className="flex items-center gap-1">
        <div className="hidden items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
          <Button.Icon
            onClick={(e) => {
              e.stopPropagation();
              setIsRenameModalOpen(true);
              setChatIdToRename(chat.id.toString());
            }}
            className="rounded p-1 text-green-200 hover:bg-green-100"
            variant="text"
            icon={<PencilSimpleIcon size={16} />}
            type="button"
          />

          <Button.Icon
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteModalOpen(true);
              setChatIdToDelete(chat.id.toString());
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
              setMenuChatId(chat.id.toString());
            }}
            className="rounded p-1 text-green-200 hover:bg-green-100"
            variant="text"
            icon={<DotsThreeIcon size={18} />}
            type="button"
          />
        </div>
      </div>
    </div>
  ));
}
