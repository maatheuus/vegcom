import { Calendar, Plus } from "lucide-react";

export function EventsEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-[2rem] border border-dashed border-green-200 bg-white px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-500">
        <Calendar className="size-8" />
      </span>
      <h2 className="font-lora text-black-100 mt-5 text-2xl italic">
        Ainda não há eventos por aqui
      </h2>
      <p className="font-maitree mt-2 max-w-sm text-sm leading-relaxed text-green-500">
        Ajude a tornar esta agenda viva: compartilhe uma feira, oficina ou
        encontro que vale a pena conhecer.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-200"
      >
        <Plus className="size-4" />
        Adicionar evento
      </button>
    </div>
  );
}

export function EventsLoading() {
  return (
    <div className="flex min-h-72 items-center justify-center">
      <span className="size-9 animate-spin rounded-full border-2 border-green-200 border-t-green-500" />
    </div>
  );
}
