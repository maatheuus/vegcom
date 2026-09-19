import { toast } from "@/shared/hooks/use-toast";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import { useDeleteEvent } from "../../api/queries/getDirectoryApiClient";
import type { DirectoryEvent } from "../../types";

interface DeleteEventDialogProps {
  event: DirectoryEvent | null;
  onClose: () => void;
}

export function DeleteEventDialog({ event, onClose }: DeleteEventDialogProps) {
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();

  const handleDelete = async () => {
    if (!event) return;
    try {
      await deleteEvent(event.id);
      onClose();
      toast({
        variant: "success",
        title: "Evento excluído",
        description: "Ele foi removido da agenda.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Não foi possível excluir",
        description: "Tente novamente em instantes.",
      });
    }
  };

  return (
    <Dialog
      open={Boolean(event)}
      onOpenChange={(open) => {
        if (!open && !isPending) onClose();
      }}
    >
      <DialogContent className="max-w-sm rounded-2xl border-green-200 bg-white">
        <DialogHeader>
          <DialogTitle className="font-lora text-black-100 text-xl italic">
            Excluir evento?
          </DialogTitle>
          <DialogDescription className="font-maitree mt-2 leading-relaxed text-green-500">
            O evento “{event?.title}” será removido da agenda. Esta ação não
            pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button
              variant="text"
              type="button"
              disabled={isPending}
              className="rounded-full border border-green-200 font-bold text-green-500 hover:bg-green-100"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-full bg-red-600 font-bold text-white hover:bg-red-700"
          >
            {isPending && (
              <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isPending ? "Excluindo..." : "Excluir evento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
