"use client";

import { deletePost as deletePostApi } from "@/features/community/api/communityApi";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";

interface DeletePostDialogProps {
  postId: number | string;
  isDeleteModalOpen: boolean;
  handleIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeletePostDialog({
  postId,
  isDeleteModalOpen,
  handleIsDeleteModalOpen,
}: DeletePostDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const handlePostDelete = async (e?: MouseEvent) => {
    e?.stopPropagation();
    setIsPending(true);
    await deletePostApi(String(postId));
    window.dispatchEvent(new CustomEvent("community:post-deleted"));
    setIsPending(false);
    handleIsDeleteModalOpen(false);
  };

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleIsDeleteModalOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-md [&_button.close-button]:hidden">
        <DialogHeader>
          <DialogTitle className="font-maitree font-semibold">
            Essa ação não pode ser desfeita.
          </DialogTitle>
          <DialogDescription className="font-maitree font-semibold">
            Você tem certeza que deseja deletar este post?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleIsDeleteModalOpen(false);
            }}
            className="font-maitree cursor-pointer"
            type="button"
            variant="secondary"
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handlePostDelete();
            }}
            className="font-maitree cursor-pointer border border-transparent transition-colors duration-200 hover:border-green-500"
            type="button"
            variant="text"
            disabled={isPending}
          >
            {isPending ? "Deletando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
