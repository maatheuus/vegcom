import type { NewRecipeForm } from "@/features/new-recipe/utils";
import { MAX_IMAGES } from "@/features/new-recipe/components/ImageUploadArea";
import Textarea from "@/shared/ui/TextArea";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import ExtraImagesUpload from "../ImageUploadArea/ExtraImagesUpload";
import ReviewSummary from "../ReviewSummary";
import StepShared from "./StepShared";

interface Props {
  form: NewRecipeForm;
}

function OptionalLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-lora text-base font-bold text-green-900">
        {children}
      </span>
      <span className="text-xs font-semibold tracking-wide text-green-500/50 uppercase">
        opcional
      </span>
    </div>
  );
}

export default function StepThree({ form }: Props) {
  const MAX_EXTRA = MAX_IMAGES - 1;

  const [chefNoteText, setChefNoteText] = useState(() => {
    const notes = form.getValues("recipe_cookingNotes") ?? [];
    return notes.map((n) => `- ${n.label}`).join("\n");
  });

  const allImages =
    useWatch({ control: form.control, name: "recipe_images" }) ?? [];
  const extraCount = Math.max(0, allImages.length - 1);

  const photosSubtitle =
    extraCount === 0
      ? `A capa já está definida. Adicione mais 0–${MAX_EXTRA} fotos.`
      : extraCount === MAX_EXTRA
        ? `Galeria completa! Todas as ${MAX_EXTRA} fotos extras foram adicionadas.`
        : `${extraCount} foto${extraCount !== 1 ? "s" : ""} adicionada${extraCount !== 1 ? "s" : ""} além da capa. Você pode adicionar mais ${MAX_EXTRA - extraCount}.`;

  const handleChefNoteChange = (val: string) => {
    setChefNoteText(val);

    const lines = val
      .split("\n")
      .map((line) => line.replace(/^-\s*/, ""))
      .filter((line) => line.trim().length > 0);

    form.setValue(
      "recipe_cookingNotes",
      lines.map((line, i) => ({
        id: `chef-note-${i}`,
        label: line,
        value: line.toLowerCase().replace(/\s+/g, "_"),
      })),
    );
  };

  return (
    <StepShared
      title="Falta pouco!"
      description="Dê uma olhada em tudo, jogue uma dica de chef se tiver, e manda ver."
    >
      <ReviewSummary form={form} />

      <div className="mt-8 space-y-2">
        <OptionalLabel>Dica do chef</OptionalLabel>
        <Textarea
          placeholder={"- Deixe a massa descansar por 10 minutos\n- Use a versão sem sal da margarina\n- Sirva ainda quente para melhor textura"}
          className="min-h-[120px] rounded-xl! font-mono text-sm"
          value={chefNoteText}
          onChange={(e) => handleChefNoteChange(e.target.value)}
        />
        <p className="text-xs text-green-500/60">
          Comece cada dica com <code className="rounded bg-green-100 px-1 font-mono">-</code> para criar uma lista. Ex: <span className="font-mono">- Dica aqui</span>
        </p>
      </div>

      <div className="mt-8 space-y-2">
        <OptionalLabel>Mais imagens</OptionalLabel>
        <p className="text-xs text-green-600/60">{photosSubtitle}</p>
        <ExtraImagesUpload form={form} />
      </div>
    </StepShared>
  );
}
