import clsx from "clsx";

export interface ReviewItem {
  label: string;
  value: string;
}

interface FormReviewProps {
  items: ReviewItem[];
  note?: React.ReactNode;
  confirmLabel: string;
  /** Texto exibido com o spinner; quando definido, o envio está em andamento. */
  pendingLabel?: string;
  onConfirm: () => void;
  onBack: () => void;
  /** Opcional: volta ao mapa para reposicionar o pin (usado no cadastro de local). */
  onAdjustLocation?: () => void;
  adjustLabel?: string;
}

export function FormReview({
  items,
  note,
  confirmLabel,
  pendingLabel,
  onConfirm,
  onBack,
  onAdjustLocation,
  adjustLabel = "Ajustar no mapa",
}: FormReviewProps) {
  const isPending = Boolean(pendingLabel);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 py-4">
        <p className="mb-3 text-sm leading-relaxed text-green-500">
          Confira os dados antes de enviar para revisão.
        </p>
        <dl className="flex flex-col divide-y divide-green-100 rounded-xl border border-green-100">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5 px-3 py-2.5">
              <dt className="text-xs font-medium text-green-500">
                {item.label}
              </dt>
              <dd className="text-sm font-bold break-words text-green-800">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {onAdjustLocation && (
          <button
            type="button"
            onClick={onAdjustLocation}
            className="mt-3 w-full rounded-xl border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
          >
            {adjustLabel}
          </button>
        )}

        {note && (
          <p className="mt-3 rounded-xl bg-green-50 px-3 py-2.5 text-xs leading-relaxed text-green-200">
            {note}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-green-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          disabled={isPending}
          className="w-full rounded-xl px-4 py-3 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className={clsx(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 sm:w-auto sm:py-2",
            "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
            isPending
              ? "cursor-not-allowed border border-green-200 bg-green-100 text-green-500"
              : "active:bg-black-100 bg-green-500 text-white hover:bg-green-200",
          )}
        >
          {pendingLabel ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
              {pendingLabel}
            </>
          ) : (
            confirmLabel
          )}
        </button>
      </div>
    </div>
  );
}
