import type { NewRecipeForm } from "@/features/new-recipe/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { Switch } from "@/shared/ui/Switch";
import Text from "@/shared/ui/Text";
import Textarea from "@/shared/ui/TextArea";
import { useState } from "react";
import DynamicFields from "./DynamicFields";
import GroupFields from "./GroupFields";
import ImageUploadArea from "./ImageUploadArea";
import PreparationFields from "./PreparationFields";

export default function RenderStepContent({
  currentStep,
  form,
}: {
  currentStep: number;
  form: NewRecipeForm;
}) {
  const [useDefaultImages, setUseDefaultImages] = useState(false);

  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-6">
          <DynamicFields title="Título & Descrição" className="w-full">
            <FormField
              control={form.control}
              name="recipe_title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className="rounded-sm!"
                      placeholder="Nova receita de..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipe_description"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Textarea
                      placeholder="Esta receita é ótima para..."
                      className="h-full max-h-none min-h-[120px] max-w-full rounded-sm!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DynamicFields>
          <PreparationFields form={form} />
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <GroupFields form={form} type="ingredients" />
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <GroupFields form={form} type="instructions" />
        </div>
      );

    case 4:
      return (
        <div className="space-y-6">
          <GroupFields form={form} type="cookingNotes" />
        </div>
      );

    case 5:
      return (
        <div className="space-y-6">
          <DynamicFields
            title="Adicione Imagens"
            className="w-full"
            rightContent={
              <Row.Center className="gap-x-2">
                <Text className="font-maitree !text-xs text-green-500/70">
                  Usar imagens pré-selecionadas
                </Text>
                <Switch
                  checked={useDefaultImages}
                  onCheckedChange={setUseDefaultImages}
                />
              </Row.Center>
            }
          >
            <ImageUploadArea
              form={form}
              className="flex h-full"
              useDefaultTestingImages={useDefaultImages}
            />
          </DynamicFields>
        </div>
      );

    default:
      return null;
  }
}
