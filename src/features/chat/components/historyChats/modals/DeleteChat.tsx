import { deleteChat } from "@/features/chat/api/queries/getChatApiServer";
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
import { useTransition, type Dispatch, type SetStateAction } from "react";

interface DeleteChatModalProps {
  chatIdToDelete: string | null;
  isDeleteModalOpen: boolean;
  handleIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteChatModal({
  chatIdToDelete,
  isDeleteModalOpen,
  handleIsDeleteModalOpen,
}: DeleteChatModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleChatDelete = (id: number) => {
    startTransition(async () => {
      await deleteChat(id);
      handleIsDeleteModalOpen(false);
    });
  };

  return (
    <Dialog open={isDeleteModalOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-md">
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
              onClick={() => handleIsDeleteModalOpen(false)}
              className="font-maitree cursor-pointer"
              type="submit"
              variant="secondary"
              disabled={isPending}
            >
              Cancelar
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleChatDelete(Number(chatIdToDelete))}
              className="font-maitree cursor-pointer border border-transparent transition-colors duration-200 hover:border-green-500"
              type="submit"
              variant="text"
              disabled={isPending}
            >
              {isPending ? "Deletando..." : "Deletar"}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
