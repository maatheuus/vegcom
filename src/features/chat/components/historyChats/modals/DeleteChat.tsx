import { useDeleteChat } from "@/features/chat/api/queries/getChatApiClient";
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
import Text from "@/shared/ui/Text";
import { useState, type Dispatch, type SetStateAction } from "react";

interface DeleteChatModalProps {
  chatIdToDelete: string | null;
  chatName?: string;
  isDeleteModalOpen: boolean;
  handleIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteChatModal({
  chatIdToDelete,
  chatName,
  isDeleteModalOpen,
  handleIsDeleteModalOpen,
}: DeleteChatModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const { mutate: deleteChat, isPending } = useDeleteChat();

  const handleChatDelete = (id: number) => {
    deleteChat(id, {
      onSuccess: () => {
        handleIsDeleteModalOpen(false);
        window.location.href = "/chat";
      },
    });
  };

  const isConfirmed =
    confirmText.trim().toLowerCase() === chatName?.trim().toLowerCase();

  return (
    <Dialog open={isDeleteModalOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-md [&_button.close-button]:hidden">
        <DialogHeader>
          <DialogTitle className="font-maitree font-semibold">
            Essa ação não pode ser desfeita.
          </DialogTitle>
          <DialogDescription className="font-maitree font-semibold">
            Você tem certeza que deseja deletar esta conversa?
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Text
            type={Text.Type.BodyFour}
            className="font-maitree mb-2 text-green-800"
          >
            Digite <span className="font-bold">{chatName}</span> para confirmar
          </Text>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={chatName ?? "Nome da conversa"}
            className="font-maitree rounded-md border border-green-500 px-3 py-2 text-sm text-green-500 placeholder:text-green-500/90 focus:ring-0 focus:outline-none"
          />
        </div>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                handleIsDeleteModalOpen(false);
                setConfirmText("");
              }}
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
              disabled={!isConfirmed || isPending}
            >
              {isPending ? "Deletando..." : "Deletar"}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
