import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowsDownUpIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { Fragment, useCallback } from "react";
import { useWatch } from "react-hook-form";

import type { Props } from "../ImageUploadArea";
import RenderCheckList from "./RenderCheckList";

export type RecipeType = "ingredients" | "instructions" | "cookingNotes";

type Item = {
  id: string;
  label: string;
  value: string;
};

interface GroupFieldsProps extends Props {
  type?: RecipeType;
}

export default function GroupFields({
  form,
  type: specificType,
}: GroupFieldsProps) {
  const currentIngredients = useWatch({
    control: form.control,
    name: "recipe_ingredients",
  });
  const currentInstructions = useWatch({
    control: form.control,
    name: "recipe_instructions",
  });
  const currentCookingNotes = useWatch({
    control: form.control,
    name: "recipe_cookingNotes",
  });

  const current = {
    ingredients: useWatch({
      control: form.control,
      name: "recipe_ingredients",
    }),
    instructions: useWatch({
      control: form.control,
      name: "recipe_instructions",
    }),
    cookingNotes:
      useWatch({
        control: form.control,
        name: "recipe_cookingNotes",
      }) ?? [],
  };

  const handleDragEnd = (event: DragEndEvent, type: RecipeType) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    if (over && active.id !== over.id) {
      const list = current[type];
      const oldIndex = list.findIndex((item: Item) => item.id === active.id);
      const newIndex = list.findIndex((item: Item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newList = arrayMove(list, oldIndex, newIndex);

      form.setValue(
        type === "ingredients"
          ? "recipe_ingredients"
          : type === "instructions"
            ? "recipe_instructions"
            : "recipe_cookingNotes",
        newList,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };

  const isAddDisabled = useCallback(
    (value: string, listLength: number) => !value || listLength >= 10,
    [],
  );

  const handleAddItemToList = useCallback(
    async (value: string, type: RecipeType) => {
      const fieldName =
        type === "ingredients"
          ? "new_recipe_ingredient_text"
          : type === "instructions"
            ? "new_recipe_instruction_text"
            : "new_recipe_cookingNote_text";

      const isValid = await form.trigger(fieldName);

      if (!isValid) return;

      if (value.trim() === "") return;

      const newRecipeObject = {
        id: crypto.randomUUID(),
        label: value,
        value: value.toLowerCase().replace(/\s+/g, "_"),
      };

      switch (type) {
        case "ingredients":
          form.setValue("recipe_ingredients", [
            ...currentIngredients,
            newRecipeObject,
          ]);
          form.resetField("new_recipe_ingredient_text");
          break;
        case "instructions":
          form.setValue("recipe_instructions", [
            ...currentInstructions,
            newRecipeObject,
          ]);
          form.resetField("new_recipe_instruction_text");
          break;
        case "cookingNotes":
          form.setValue("recipe_cookingNotes", [
            ...(currentCookingNotes ?? []),
            newRecipeObject,
          ]);
          form.resetField("new_recipe_cookingNote_text");
          break;
        default:
          break;
      }
    },
    [currentCookingNotes, currentIngredients, currentInstructions, form],
  );

  const handleDeleteItemFromList = useCallback(
    (id: string, type: RecipeType) => {
      switch (type) {
        case "ingredients":
          form.setValue(
            "recipe_ingredients",
            currentIngredients.filter((item: Item) => item.id !== id),
          );
          break;
        case "instructions":
          form.setValue(
            "recipe_instructions",
            currentInstructions.filter((item: Item) => item.id !== id),
          );
          break;
        case "cookingNotes":
          form.setValue(
            "recipe_cookingNotes",
            (currentCookingNotes ?? []).filter((item: Item) => item.id !== id),
          );
          break;
        default:
          break;
      }
    },
    [currentCookingNotes, currentIngredients, currentInstructions, form],
  );

  const typesToRender = specificType
    ? [specificType]
    : (["ingredients", "instructions", "cookingNotes"] as RecipeType[]);

  const titleMap: Record<RecipeType, string> = {
    ingredients: "Ingredientes",
    instructions: "Modo de preparo",
    cookingNotes: "Dicas do Chef",
  };

  const placeholderMap: Record<RecipeType, string> = {
    ingredients: "Adicionar ingrediente...",
    instructions: "Descrever passo...",
    cookingNotes: "Adicionar dica...",
  };

  return (
    <Fragment>
      {typesToRender.map((type) => (
        <div key={type} className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-lora text-lg font-bold text-green-900">
              {titleMap[type]}
            </h2>
            {current[type].length > 0 && (
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                {current[type].length}{" "}
                {type === "ingredients"
                  ? current[type].length === 1
                    ? "item"
                    : "itens"
                  : current[type].length === 1
                    ? "passo"
                    : "passos"}
              </span>
            )}
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, type)}
          >
            <SortableContext
              items={current[type].map((i: Item) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <RenderCheckList
                items={current[type]}
                onDeleteItem={(id) => handleDeleteItemFromList(id, type)}
              />
            </SortableContext>
          </DndContext>

          {current[type].length >= 2 && (
            <p className="flex items-center gap-1 text-xs font-medium text-green-500">
              <ArrowsDownUpIcon size={12} />
              Arraste para reordenar
            </p>
          )}

          {/* Add input + button */}
          <FormField
            control={form.control}
            name={
              type === "ingredients"
                ? "new_recipe_ingredient_text"
                : type === "instructions"
                  ? "new_recipe_instruction_text"
                  : "new_recipe_cookingNote_text"
            }
            render={({ field }) => {
              return (
                <FormItem
                  className={current[type].length === 10 ? "hidden" : "block"}
                >
                  <div className="flex flex-col items-end gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={placeholderMap[type]}
                        className="rounded-xl! border-green-200 text-sm"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        name={field.name}
                        ref={field.ref}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (
                              !isAddDisabled(
                                field.value || "",
                                current[type].length,
                              )
                            ) {
                              handleAddItemToList(field.value || "", type);
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddItemToList(field.value || "", type);
                      }}
                      disabled={isAddDisabled(
                        field.value || "",
                        current[type].length,
                      )}
                      className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:border-green-400 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <PlusCircleIcon size={14} />
                      Adicionar
                    </button>
                  </div>
                  <FormMessage className="!mb-0" />
                </FormItem>
              );
            }}
          />

          {/* Array-level error (min items validation) */}
          <FormField
            control={form.control}
            name={
              type === "ingredients"
                ? "recipe_ingredients"
                : type === "instructions"
                  ? "recipe_instructions"
                  : "recipe_cookingNotes"
            }
            render={() => (
              <FormItem>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
        </div>
      ))}
    </Fragment>
  );
}
