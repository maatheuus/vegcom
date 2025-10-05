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
          <DialogTitle className="font-lora font-normal italic">
            Essa ação não pode ser desfeita.
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="font-maitree">
          Você tem certeza que deseja deletar esta conversa?
        </DialogDescription>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={() => onCloseDeleteModal(false)}
              className="font-maitree cursor-pointer"
              type="submit"
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() => deleteChat(String(chatIdToDelete))}
              className="font-maitree cursor-pointer border border-transparent transition-colors duration-200 hover:border-green-500"
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
