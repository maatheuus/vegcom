import { Plus } from "lucide-react";

export function EventsHero({ onAdd }: { onAdd: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.5rem] bg-green-500 px-4 py-4 text-white shadow-[0_18px_40px_rgba(27,78,48,0.22)] sm:rounded-[2rem] sm:px-9 sm:py-9">
      <div className="absolute -top-16 -right-10 hidden size-52 rounded-full border-[28px] border-green-200/40 sm:block" />
      <div className="relative flex items-center justify-between gap-3 sm:flex-row sm:gap-6">
        <div>
          <p className="mb-2 hidden text-xs font-bold tracking-[0.22em] text-green-100 uppercase sm:block">
            Agenda da comunidade
          </p>
          <h1 className="font-lora text-2xl italic sm:text-5xl">
            Eventos veganos
          </h1>
          <p className="font-maitree mt-3 hidden max-w-xl text-sm text-green-100 sm:block sm:text-base">
            Feiras, oficinas e encontros para descobrir pessoas, sabores e
            ideias.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-green-500 transition hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-500 focus-visible:outline-none sm:px-5 sm:py-3 sm:text-sm"
        >
          <Plus className="size-4" />
          Adicionar evento
        </button>
      </div>
    </section>
  );
}
