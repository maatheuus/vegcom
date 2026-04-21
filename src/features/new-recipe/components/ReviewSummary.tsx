"use client";

import { FormControl, FormField, FormItem } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import type { NewRecipeForm } from "../utils";
import { formatPreparationTime } from "../utils";

const categoryLabels: Record<string, string> = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  dinner: "Jantar",
  desserts: "Sobremesas",
  snacks: "Lanches",
  general: "Geral",
};

const difficultyLabels: Record<string, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

const CATEGORIES = [
  { value: "breakfast", label: "Café da manhã" },
  { value: "lunch", label: "Almoço" },
  { value: "dinner", label: "Jantar" },
  { value: "desserts", label: "Sobremesas" },
  { value: "snacks", label: "Lanches" },
  { value: "general", label: "Geral" },
];

const DIFFICULTIES = [
  { value: "easy", label: "Fácil" },
  { value: "medium", label: "Médio" },
  { value: "hard", label: "Difícil" },
];

type EditableRow = "title" | "category" | "time" | null;

interface Props {
  form: NewRecipeForm;
}

export default function ReviewSummary({ form }: Props) {
  const [editing, setEditing] = useState<EditableRow>(null);

  const title = useWatch({ control: form.control, name: "recipe_title" });
  const category = useWatch({ control: form.control, name: "recipe_category" });
  const difficulty = useWatch({
    control: form.control,
    name: "recipe_difficulty",
  });
  const hours = useWatch({
    control: form.control,
    name: "recipe_preparationHours",
  });
  const minutes = useWatch({
    control: form.control,
    name: "recipe_preparationMinutes",
  });
  const servings = useWatch({ control: form.control, name: "recipe_servings" });
  const ingredients =
    useWatch({ control: form.control, name: "recipe_ingredients" }) ?? [];
  const instructions =
    useWatch({ control: form.control, name: "recipe_instructions" }) ?? [];
  const images =
    useWatch({ control: form.control, name: "recipe_images" }) ?? [];
  const coverImage = images[0];

  const timeStr = formatPreparationTime(hours ?? "0", minutes ?? "0");
  const categoryValue =
    [
      categoryLabels[category] ?? category,
      difficultyLabels[difficulty] ?? difficulty,
    ]
      .filter(Boolean)
      .join(" · ") || "—";
  const timeValue =
    [timeStr, servings ? `${servings} pessoas` : ""]
      .filter(Boolean)
      .join(" · ") || "—";

  const toggle = (row: EditableRow) =>
    setEditing((prev) => (prev === row ? null : row));
  const confirm = () => setEditing(null);

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {coverImage && (
        <img
          src={coverImage.preview}
          alt="Foto de capa"
          className="h-44 w-full rounded-xl object-cover sm:w-44 sm:shrink-0"
        />
      )}

      <div className="flex-1 divide-y divide-green-100">
        {/* TÍTULO */}
        <div className="py-3">
          <div className="flex items-center justify-between">
            <span className="w-28 shrink-0 text-xs font-semibold tracking-wide text-green-500/60">
              TÍTULO
            </span>
            {editing !== "title" && (
              <span className="font-lora flex-1 px-2 text-sm text-green-800">
                {title || "—"}
              </span>
            )}
            <EditButton
              active={editing === "title"}
              onClick={() => toggle("title")}
              onConfirm={confirm}
            />
          </div>
          {editing === "title" && (
            <div className="mt-2">
              <FormField
                control={form.control}
                name="recipe_title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        className="rounded-xl! text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            confirm();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* CATEGORIA */}
        <div className="py-3">
          <div className="flex items-center justify-between">
            <span className="w-28 shrink-0 text-xs font-semibold tracking-wide text-green-500/60">
              CATEGORIA
            </span>
            {editing !== "category" && (
              <span className="font-lora flex-1 px-2 text-sm text-green-800">
                {categoryValue}
              </span>
            )}
            <EditButton
              active={editing === "category"}
              onClick={() => toggle("category")}
              onConfirm={confirm}
            />
          </div>
          {editing === "category" && (
            <div className="mt-2 grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="recipe_category"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="min-h-[38px]">
                        <SelectTrigger className="font-lora rounded-xl! text-sm focus-within:ring-1">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem
                            key={c.value}
                            value={c.value}
                            className="font-maitree"
                          >
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipe_difficulty"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="min-h-[38px]">
                        <SelectTrigger className="font-lora rounded-xl! text-sm focus-within:ring-1">
                          <SelectValue placeholder="Dificuldade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DIFFICULTIES.map((d) => (
                          <SelectItem
                            key={d.value}
                            value={d.value}
                            className="font-maitree"
                          >
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* TEMPO */}
        <div className="py-3">
          <div className="flex items-center justify-between">
            <span className="w-28 shrink-0 text-xs font-semibold tracking-wide text-green-500/60">
              TEMPO
            </span>
            {editing !== "time" && (
              <span className="font-lora flex-1 px-2 text-sm text-green-800">
                {timeValue}
              </span>
            )}
            <EditButton
              active={editing === "time"}
              onClick={() => toggle("time")}
              onConfirm={confirm}
            />
          </div>
          {editing === "time" && (
            <div className="mt-2 grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="recipe_preparationHours"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        type="number"
                        className="rounded-xl! text-sm"
                        placeholder="Horas"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipe_preparationMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="rounded-xl! text-sm"
                        placeholder="Minutos"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipe_servings"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="rounded-xl! text-sm"
                        placeholder="Porções"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* INGREDIENTES — read-only */}
        <div className="flex items-center py-3">
          <span className="w-28 shrink-0 text-xs font-semibold tracking-wide text-green-500/60">
            INGREDIENTES
          </span>
          <span className="font-lora flex-1 px-2 text-sm text-green-800">
            {ingredients.length} {ingredients.length === 1 ? "item" : "itens"}
          </span>
        </div>

        {/* PASSOS — read-only */}
        <div className="flex items-center py-3">
          <span className="w-28 shrink-0 text-xs font-semibold tracking-wide text-green-500/60">
            PASSOS
          </span>
          <span className="font-lora flex-1 px-2 text-sm text-green-800">
            {instructions.length}{" "}
            {instructions.length === 1 ? "passo" : "passos"}
          </span>
        </div>
      </div>
    </div>
  );
}

function EditButton({
  active,
  onClick,
  onConfirm,
}: {
  active: boolean;
  onClick: () => void;
  onConfirm: () => void;
}) {
  return active ? (
    <button
      type="button"
      onClick={onConfirm}
      className="flex cursor-pointer items-center gap-1 rounded-lg bg-green-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-green-600"
    >
      <CheckIcon size={12} weight="bold" />
      Ok
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className="font-lora flex cursor-pointer items-center gap-1 text-xs text-green-200 italic transition hover:text-green-600"
    >
      editar
    </button>
  );
}
