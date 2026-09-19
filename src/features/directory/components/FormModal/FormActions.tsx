import clsx from "clsx";

interface FormActionsProps {
  submitLabel: string;
  /** Texto exibido com o spinner; quando definido, o envio está em andamento. */
  pendingLabel?: string;
  isDisabled: boolean;
  onCancel: () => void;
}

export function FormActions({
  submitLabel,
  pendingLabel,
  isDisabled,
  onCancel,
}: FormActionsProps) {
  const isBlocked = isDisabled || Boolean(pendingLabel);

  return (
    <div className="flex shrink-0 items-center justify-end gap-2 border-t border-green-100 px-5 py-4">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isBlocked}
        className={clsx(
          "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
          isBlocked
            ? "cursor-not-allowed border border-green-200 bg-green-100 text-green-200"
            : "active:bg-black-100 bg-green-500 text-white hover:bg-green-200",
        )}
      >
        {pendingLabel ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
            {pendingLabel}
          </>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
}
