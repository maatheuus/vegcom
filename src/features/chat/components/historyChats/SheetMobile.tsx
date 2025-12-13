import Button from "@/shared/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

interface Props {
  menuChatId: string | null;
  setMenuChatId: (id: string | null) => void;
  setIsRenameModalOpen: (open: boolean) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
  setChatIdToRename: (id: string | null) => void;
  setChatIdToDelete: (id: string | null) => void;
}
export default function SheetMobile({
  menuChatId,
  setMenuChatId,
  setIsRenameModalOpen,
  setIsDeleteModalOpen,
  setChatIdToRename,
  setChatIdToDelete,
}: Props) {
  return (
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
                  setIsRenameModalOpen(true);
                  setChatIdToRename(menuChatId);
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
                  setIsDeleteModalOpen(true);
                  setChatIdToDelete(menuChatId);
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
  );
}
