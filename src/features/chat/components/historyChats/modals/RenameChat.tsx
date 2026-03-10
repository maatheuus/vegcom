import { updateChatTitle } from "@/features/chat/api/queries/getChatApiServer";
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
import {
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";

interface RenameChatModalProps {
  chatIdToRename: string | null;
  chatName?: string;
  isRenameModalOpen: boolean;
  handleIsRenameModalOpen: Dispatch<SetStateAction<boolean>>;
}
export default function RenameChatModal({
  chatIdToRename,
  chatName,
  isRenameModalOpen,
  handleIsRenameModalOpen,
}: RenameChatModalProps) {
  const [renameText, setRenameText] = useState(chatName ?? "");
  const [isPending, startTransition] = useTransition();

  const handleChatRename = (id: number, title: string) => {
    startTransition(async () => {
      await updateChatTitle({ id, title });
    });
    handleIsRenameModalOpen(false);
  };

  return (
    <Dialog open={isRenameModalOpen}>
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
            placeholder={chatName ?? "Seja criativo"}
            className="font-maitree rounded-md border border-green-500 px-3 py-2 text-sm text-green-500 placeholder:text-green-500/90 focus:ring-0 focus:outline-none disabled:cursor-not-allowed"
            disabled={false}
          />
        </DialogDescription>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleIsRenameModalOpen(false)}
              className="font-maitree cursor-pointer"
              type="submit"
              variant="text"
              disabled={isPending}
            >
              Cancelar
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                handleChatRename(Number(chatIdToRename), renameText)
              }
              className="font-maitree cursor-pointer disabled:cursor-not-allowed"
              disabled={!renameText || isPending}
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
