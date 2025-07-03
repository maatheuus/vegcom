import { PlusOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment, useCallback } from "react";
import { useWatch } from "react-hook-form";
import DynamicFields from "../DynamicFields";
import type { Props } from "../ImageUploadArea";
import RenderCheckList from "./RenderCheckList";

export type RecipeType = "ingredients" | "instructions" | "cookingNotes";

export default function GroupFields({ form }: Props) {
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
    cookingNotes: useWatch({
      control: form.control,
      name: "recipe_cookingNotes",
    }),
  };

  const handleDragEnd = (event: DragEndEvent, type: RecipeType) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    if (over && active.id !== over.id) {
      const list = current[type];
      const oldIndex = list.findIndex((item) => item.id === active.id);
      const newIndex = list.findIndex((item) => item.id === over.id);

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
        }
      );
    }
  };

  const isAddDisabled = useCallback(
    (value: string, listLength: number) => !value || listLength >= 10,
    []
  );

  const handleAddItemToList = useCallback(
    (value: string, type: RecipeType) => {
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
            ...currentCookingNotes,
            newRecipeObject,
          ]);
          form.resetField("new_recipe_cooking_note_text");
          break;
        default:
          break;
      }
    },
    [currentCookingNotes, currentIngredients, currentInstructions, form]
  );

  const handleDeleteItemFromList = useCallback(
    (id: string, type: RecipeType) => {
      switch (type) {
        case "ingredients":
          form.setValue(
            "recipe_ingredients",
            currentIngredients.filter((item) => item.id !== id)
          );
          break;
        case "instructions":
          form.setValue(
            "recipe_instructions",
            currentInstructions.filter((item) => item.id !== id)
          );
          break;
        case "cookingNotes":
          form.setValue(
            "recipe_cookingNotes",
            currentCookingNotes.filter((item) => item.id !== id)
          );
          break;
        default:
          break;
      }
    },
    [currentCookingNotes, currentIngredients, currentInstructions, form]
  );

  return (
    <Fragment>
      {(["ingredients", "instructions", "cookingNotes"] as RecipeType[]).map(
        (type) => (
          <DynamicFields
            key={type}
            title={
              type === "ingredients"
                ? "Ingredientes"
                : type === "instructions"
                ? "Instruções"
                : "Notas de Cozimento"
            }
            className="flex-1 flex flex-col"
          >
            <FormField
              control={form.control}
              name={
                type === "ingredients"
                  ? "new_recipe_ingredient_text"
                  : type === "instructions"
                  ? "new_recipe_instruction_text"
                  : "new_recipe_cooking_note_text"
              }
              render={({ field }) => {
                return (
                  <FormItem className="relative">
                    <Button.Icon
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddItemToList(field.value, type);
                      }}
                      disabled={isAddDisabled(
                        field.value,
                        current[type].length
                      )}
                      variant="text"
                      type="button"
                      className="absolute right-0 px-0 m-0 gap-x-1 cursor-pointer hover:bg-transparent"
                      leftIcon={<PlusOutlinedIcon size={16} />}
                    >
                      Adicionar
                    </Button.Icon>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Novo ingrediente..."
                        className="border-x-0 border-t-0 border-b border-green-200 px-0 focus:!ring-0 focus:border-green-200"
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                        }}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, type)}
            >
              <SortableContext
                items={current[type].map((i) => i.id)}
                strategy={verticalListSortingStrategy}
              >
                <RenderCheckList
                  type={type}
                  items={current[type]}
                  onDeleteItem={(id) => handleDeleteItemFromList(id, type)}
                />
              </SortableContext>
            </DndContext>
          </DynamicFields>
        )
      )}
    </Fragment>
  );
}
