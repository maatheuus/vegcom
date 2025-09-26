import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { type Dispatch, type SetStateAction } from "react";
import { useChat } from "../../chat/useChat";

interface DeleteChatModalProps {
  chatIdToDelete: string | null;
  isDeleteModalOpen: boolean;
  onCloseDeleteModal: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteChatModal({
  chatIdToDelete,
  isDeleteModalOpen,
  onCloseDeleteModal,
}: DeleteChatModalProps) {
  const { deleteChat } = useChat();

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={onCloseDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Essa ação não pode ser desfeita.</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Você tem certeza que deseja deletar esta conversa?
        </DialogDescription>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={() => onCloseDeleteModal(false)}
              className="cursor-pointer"
              type="submit"
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() => deleteChat(String(chatIdToDelete))}
              className="cursor-pointer border border-transparent hover:border-green-500 transition-colors duration-200"
              type="submit"
              variant="text"
            >
              Deletar
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
