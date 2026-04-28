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
  DialogTrigger,
} from "@/shared/ui/Dialog";
import { useState, type Dispatch, type SetStateAction } from "react";

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

  const handlePostDelete = async () => {
    setIsPending(true);
    await deletePostApi(String(postId));
    window.dispatchEvent(new CustomEvent("community:post-deleted"));
    setIsPending(false);
    handleIsDeleteModalOpen(false);
  };

  return (
    <Dialog open={isDeleteModalOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] rounded-md [&_button.close-button]:hidden">
        <DialogHeader>
          <DialogTitle className="font-maitree font-semibold">
            Essa ação não pode ser desfeita.
          </DialogTitle>
          <DialogDescription className="font-maitree font-semibold">
            Você tem certeza que deseja deletar este post?
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <p className="font-maitree text-center text-sm text-green-600">
            Tem certeza?
          </p>
        </div>

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
              onClick={handlePostDelete}
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