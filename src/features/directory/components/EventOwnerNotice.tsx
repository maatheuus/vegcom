import { toast } from "@/shared/hooks/use-toast";
import { Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { useDeleteEvent } from "../api/queries/getDirectoryApiClient";
import type { DirectoryEvent } from "../types";
import { isForbiddenError } from "../utils/errors";
import { formatDeletionNotice } from "../utils/rejection";

interface EventOwnerNoticeProps {
  event: DirectoryEvent;
}

export function EventOwnerNotice({ event }: EventOwnerNoticeProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id);
      toast({
        variant: "success",
        title: "Evento excluído",
        description: "Ele foi removido do mapa.",
      });
    } catch (error) {
      // 403 aqui = evento com denúncias; dono/status já garantidos pelo backend.
      if (isForbiddenError(error)) {
        toast({
          variant: "destructive",
          title: "Não foi possível excluir",
          description: "Este evento não pode ser excluído no momento.",
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Não foi possível excluir",
        description: "Tente novamente em instantes.",
      });
    }
  };

  const isPendingStatus = event.status === "pending";

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border px-3 py-2.5 text-sm leading-relaxed ${
        isPendingStatus
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
      role="status"
    >
      {isPendingStatus ? (
        <p className="my-0.5! flex gap-2">
          Só você vê este evento. Ele ficará público para todos assim que nossa
          equipe aprovar.
        </p>
      ) : (
        <p className="my-0.5! flex gap-2">
          <XCircle className="size-4 shrink-0" aria-hidden />
          <span>
            Este evento não foi aprovado e só você o vê.
            {event.rejectionReason && (
              <>
                {" "}
                <strong className="font-semibold">Motivo:</strong>{" "}
                {event.rejectionReason}
              </>
            )}
            <br />
            {formatDeletionNotice(event.rejectedAt)}
          </span>
        </p>
      )}

      {isConfirming ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            disabled={isPending}
            className={`min-h-10 flex-1 rounded-full border bg-white px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60 ${
              isPendingStatus
                ? "border-amber-200 text-amber-800 hover:bg-amber-100 focus-visible:ring-amber-500"
                : "border-red-200 text-red-700 hover:bg-red-100 focus-visible:ring-red-500"
            }`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="min-h-10 flex-1 rounded-full bg-red-600 px-3 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
          >
            {isPending ? "Excluindo..." : "Confirmar"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsConfirming(true)}
          className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border bg-white px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
            isPendingStatus
              ? "border-amber-200 text-amber-800 hover:bg-amber-100 focus-visible:ring-amber-500"
              : "border-red-200 text-red-700 hover:bg-red-100 focus-visible:ring-red-500"
          }`}
        >
          <Trash2 className="size-4" aria-hidden />
          Excluir evento
        </button>
      )}
    </div>
  );
}
