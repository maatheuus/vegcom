import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const itemClassName =
  "cursor-pointer gap-x-3 py-2.5 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-green-50";

interface EventOwnerMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function EventOwnerMenu({ onEdit, onDelete }: EventOwnerMenuProps) {
  return (
    // modal={false}: evita conflito de pointer-events com o Dialog de exclusão.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Opções do evento"
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full text-green-500 transition-colors hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:outline-none data-[state=open]:bg-green-100"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-green-500 text-green-50">
        <DropdownMenuItem onSelect={onEdit} className={itemClassName}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onDelete} className={itemClassName}>
          <Trash2 className="size-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
