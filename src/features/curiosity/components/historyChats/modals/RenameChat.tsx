import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import { Input } from "@/shared/ui/Input";
import { useState, type Dispatch, type SetStateAction } from "react";

interface RenameChatModalProps {
  chatIdToRename: string | null;
  isRenameModalOpen: boolean;
  onCloseRenameModal: Dispatch<SetStateAction<boolean>>;
}
export default function RenameChatModal({
  chatIdToRename,
  isRenameModalOpen,
  onCloseRenameModal,
}: RenameChatModalProps) {
  const [renameText, setRenameText] = useState("");

  function onRenameChat() {
    if (!chatIdToRename) return;
    console.log("aa:");
    const event = new CustomEvent("chat_rename", {
      detail: { id: chatIdToRename, title: renameText },
    });
    window.dispatchEvent(event);
  }

  return (
    <Dialog open={isRenameModalOpen} onOpenChange={onCloseRenameModal}>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-md">
        <DialogHeader>
          <DialogTitle className="font-lora font-normal italic">
            Novo nome
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <Input
            value={renameText}
            onChange={(e) => {
              setRenameText(e.target.value);
            }}
            placeholder="Seja criativo"
            className="font-maitree rounded-md border border-green-500 px-3 py-2 text-sm text-green-500 placeholder:text-green-500/90 focus:ring-0 focus:outline-none"
          />
        </DialogDescription>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={onRenameChat}
              className="font-maitree cursor-pointer disabled:cursor-not-allowed"
              disabled={!renameText}
              type="submit"
            >
              Salvar
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
