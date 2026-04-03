"use client";

import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useDeleteRecipe } from "../recipes/api/queries/getRecipesApiClient";

interface DeleteRecipeButtonProps {
  recipeId: number;
  recipeTitle?: string;
}

const DeleteRecipeButton = memo(function DeleteRecipeButton({
  recipeId,
  recipeTitle,
}: DeleteRecipeButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteRecipe, isPending } = useDeleteRecipe();

  const handleDelete = async () => {
    await deleteRecipe(recipeId);
    setOpen(false);
    router.push("/recipes");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Row
          className="cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-label="Excluir receita"
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <TrashIcon
            size={18}
            weight="regular"
            className="text-red-400 transition-colors hover:text-red-500"
            aria-hidden="true"
          />
        </Row>
      </DialogTrigger>

      <DialogContent className="max-w-sm border-red-100">
        <DialogHeader>
          <DialogTitle className="font-lora text-lg">
            Excluir receita
          </DialogTitle>
          <DialogDescription className="text-sm">
            Tem certeza que deseja excluir{" "}
            {recipeTitle ? (
              <span className="font-medium">&ldquo;{recipeTitle}&rdquo;</span>
            ) : (
              "esta receita"
            )}
            ? Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
              disabled={isPending}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            size="sm"
            className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Excluindo…
              </span>
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default DeleteRecipeButton;
