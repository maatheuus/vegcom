import { toast } from "@/shared/hooks/use-toast";
import { Clock, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { useDeletePlace } from "../../api/queries/getDirectoryApiClient";
import type { Place } from "../../types";
import { formatDeletionNotice } from "../../utils/rejection";

interface PlaceOwnerNoticeProps {
  place: Place;
  onDeleted: () => void;
}

export function PlaceOwnerNotice({ place, onDeleted }: PlaceOwnerNoticeProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { mutateAsync: deletePlace, isPending } = useDeletePlace();

  const handleDelete = async () => {
    try {
      await deletePlace(place.id);
      onDeleted();
      toast({
        variant: "success",
        title: "Local excluído",
        description: "Ele foi removido do mapa.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Não foi possível excluir",
        description: "Tente novamente em instantes.",
      });
    }
  };

  if (place.status === "pending") {
    return (
      <p
        className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-relaxed text-amber-800"
        role="status"
      >
        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
        Só você vê este local. Ele ficará público para todos assim que nossa
        equipe aprovar.
      </p>
    );
  }

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-relaxed text-red-800"
      role="status"
    >
      <p className="flex gap-2">
        <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          Este local não foi aprovado e só você o vê.
          {place.rejectionReason && (
            <>
              {" "}
              <strong className="font-semibold">Motivo:</strong>{" "}
              {place.rejectionReason}
            </>
          )}
          <br />
          {formatDeletionNotice(place.rejectedAt)}
        </span>
      </p>

      {isConfirming ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            disabled={isPending}
            className="min-h-10 flex-1 rounded-full border border-red-200 bg-white px-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="min-h-10 flex-1 rounded-full bg-red-600 px-3 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
          >
            {isPending ? "Excluindo..." : "Confirmar exclusão"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsConfirming(true)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
        >
          <Trash2 className="size-4" aria-hidden />
          Excluir local
        </button>
      )}
    </div>
  );
}
