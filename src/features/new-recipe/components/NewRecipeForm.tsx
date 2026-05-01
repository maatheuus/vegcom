"use client";

import { useUpdateRecipe } from "@/features/recipes/api/queries/getRecipesApiClient";
import type {
  DetailedRecipe,
  UpdateRecipePayload,
} from "@/features/recipes/api/types";
import {
  defaultValues,
  newRecipeFormSchema,
} from "@/features/recipes/components/utils";
import { useToast } from "@/shared/hooks/use-toast";
import { usePersistentForm } from "@/shared/hooks/usePersistentForm";
import Button from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SealCheckIcon } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateNewRecipe } from "../api/queries/getNewRecipesApiClient";
import {
  formatPreparationTime,
  recipeToFormValues,
  TIPS_BY_STEP,
  transformFormToApiPayload,
  type NewRecipeFormValues,
} from "../utils";
import FluctuantTip from "./FluctuantTip";
import RenderStepContent from "./RenderStepContent";
import StepIndicator from "./StepIndicator";

interface NewRecipeFormProps {
  initialRecipe?: DetailedRecipe;
}

export default function NewRecipeForm({
  initialRecipe,
}: NewRecipeFormProps = {}) {
  const isEditMode = !!initialRecipe;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resolvedDefaults = isEditMode
    ? recipeToFormValues(initialRecipe)
    : { ...defaultValues };

  const form = useForm<NewRecipeFormValues>({
    resolver: zodResolver(newRecipeFormSchema),
    defaultValues: resolvedDefaults,
  });

  const { mutateAsync: createNewRecipe, isPending: isCreating } =
    useCreateNewRecipe();
  const { mutateAsync: updateRecipe, isPending: isUpdating } =
    useUpdateRecipe();
  const isPending = isCreating || isUpdating;

  const { toast } = useToast();
  const IMAGE_STORAGE_KEY = "vegcom-new-recipe-images";
  const IMAGE_TTL_MS = 30 * 60 * 1000;

  const persistKey = isEditMode
    ? `vegcom-edit-recipe-${initialRecipe.id}`
    : "vegcom-new-recipe-form";

  const { clearStorage } = usePersistentForm(form, {
    key: persistKey,
    ttlSeconds: 1800,
    excludeFields: ["recipe_images"],
  });

  useEffect(() => {
    if (isEditMode) return;
    const images = form.getValues("recipe_images");
    const cover = images?.[0];
    if (cover?.preview?.startsWith("data:")) {
      localStorage.setItem(
        IMAGE_STORAGE_KEY,
        JSON.stringify({
          preview: cover.preview,
          name: cover.name,
          id: cover.id,
          ts: Date.now(),
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("recipe_images")]);

  useEffect(() => {
    if (isEditMode) return;

    const restore = async () => {
      try {
        const raw = localStorage.getItem(IMAGE_STORAGE_KEY);
        if (!raw) return;
        const { preview, name, id, ts } = JSON.parse(raw);
        if (Date.now() - ts > IMAGE_TTL_MS) {
          localStorage.removeItem(IMAGE_STORAGE_KEY);
          return;
        }
        const currentImages = form.getValues("recipe_images") ?? [];
        if (currentImages.length === 0 && preview) {
          try {
            const res = await fetch(preview);
            const blob = await res.blob();
            const file = new File([blob], name, { type: blob.type });
            form.setValue("recipe_images", [{ id, file, preview, name }]);
          } catch {
            form.setValue("recipe_images", [{ id, file: null, preview, name }]);
          }
        }
      } catch {
        // ignore
      }
    };
    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStep = Number(searchParams.get("step")) || 1;
  const totalSteps = 3;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const goToStep = useCallback(
    (step: number) => {
      router.push(pathname + "?" + createQueryString("step", String(step)));
    },
    [router, pathname, createQueryString],
  );

  const stepFields: Record<number, (keyof NewRecipeFormValues)[]> = {
    1: [
      "recipe_title",
      "recipe_description",
      "recipe_preparationMinutes",
      "recipe_servings",
      "recipe_category",
      "recipe_difficulty",
      "recipe_images",
    ],
    2: ["recipe_ingredients", "recipe_instructions"],
    3: [],
  };

  const nextStep = async () => {
    const valid = await form.trigger(stepFields[currentStep]);
    if (valid) {
      goToStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    goToStep(Math.max(currentStep - 1, 1));
  };

  const handlePublish = async () => {
    const valid = await form.trigger(stepFields[currentStep]);
    if (!valid) return;

    const formData = form.getValues();

    formData.recipe_images = await Promise.all(
      formData.recipe_images.map(async (img) => {
        if (img.file !== null) return img;
        if (!img.preview?.startsWith("data:")) return img;
        try {
          const res = await fetch(img.preview);
          const blob = await res.blob();
          return {
            ...img,
            file: new File([blob], img.name, { type: blob.type }),
          };
        } catch {
          return img;
        }
      }),
    );

    const payload = transformFormToApiPayload(formData);

    try {
      const { data, success } = await createNewRecipe(payload);
      if (success) {
        clearStorage();
        localStorage.removeItem(IMAGE_STORAGE_KEY);
        toast({
          title: "Receita criada com sucesso!",
          description:
            "Sua receita está em análise e será publicada após aprovação.",
          variant: "success",
        });
        router.push(`/recipes/${data.slug}`);
      }
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      toast({
        title: "Erro ao criar receita",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async () => {
    const valid = await form.trigger(stepFields[currentStep]);
    if (!valid) return;

    const formData = form.getValues();
    const orig = initialRecipe!;
    const eqArr = (a: string[], b: string[]) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    const timeStr = formatPreparationTime(
      formData.recipe_preparationHours ?? "0",
      formData.recipe_preparationMinutes,
    );

    const newIngredients = formData.recipe_ingredients.map((i) => i.label);
    const newInstructions = formData.recipe_instructions.map((i) => i.label);
    const newNotes = (formData.recipe_cookingNotes ?? []).map((i) => i.label);

    const patch: UpdateRecipePayload = {};

    if (formData.recipe_title !== orig.title)
      patch.title = formData.recipe_title;
    if (formData.recipe_description !== orig.description)
      patch.description = formData.recipe_description;
    if (timeStr !== orig.cookTime) patch.cookTime = timeStr;
    if (formData.recipe_servings !== orig.quantity)
      patch.quantity = formData.recipe_servings;
    if (formData.recipe_category.toUpperCase() !== orig.category?.toUpperCase())
      patch.category = formData.recipe_category.toUpperCase();
    if (
      formData.recipe_difficulty.toUpperCase() !==
      orig.difficulty?.toUpperCase()
    )
      patch.difficulty = formData.recipe_difficulty.toUpperCase();

    // Separate new file uploads from existing URLs
    const newImageFiles = formData.recipe_images
      .filter((img) => img.file !== null)
      .map((img) => img.file as File);
    const existingImageUrls = formData.recipe_images
      .filter((img) => img.file === null)
      .map((img) => img.preview);
    const allCurrentPreviews = formData.recipe_images.map((img) => img.preview);

    let uploadImages: File[] | undefined;
    if (newImageFiles.length > 0) {
      uploadImages = newImageFiles;
    } else if (!eqArr(allCurrentPreviews, orig.images ?? [])) {
      patch.images = existingImageUrls;
    }

    const stepsChanged =
      !eqArr(newIngredients, orig.steps?.ingredients ?? []) ||
      !eqArr(newInstructions, orig.steps?.instructions ?? []) ||
      !eqArr(newNotes, orig.steps?.cookingNotes ?? []);

    if (stepsChanged) {
      patch.steps = {
        ingredients: newIngredients,
        instructions: newInstructions,
        cookingNotes: newNotes,
      };
    }

    const hasChanges = Object.keys(patch).length > 0 || !!uploadImages;
    if (!hasChanges) {
      toast({ title: "Nenhuma alteração detectada.", variant: "info" });
      return;
    }

    try {
      const { success, data: updatedRecipe } = await updateRecipe({
        id: orig.id,
        data: patch,
        newImages: uploadImages,
        slug: orig.slug,
      });
      if (success) {
        clearStorage();
        toast({
          title: "Receita atualizada com sucesso!",
          description: "Suas alterações foram salvas.",
          variant: "success",
        });
        router.push(`/recipes/${updatedRecipe.slug}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      toast({
        title: "Erro ao atualizar receita",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const backLabels: Record<number, string> = {
    2: "Fundamentos",
    3: "A receita",
  };

  const nextLabels: Record<number, string> = {
    1: "Próximo: A receita",
    2: isEditMode ? "Próximo: Revisar" : "Próximo: Revisar & publicar",
  };

  return (
    <div>
      <FluctuantTip tips={TIPS_BY_STEP[currentStep]} />

      <div className="mb-6">
        <StepIndicator currentStep={currentStep} />
      </div>

      <div className="mx-auto h-full md:max-w-[95%]">
        <Form {...form}>
          <form
            className="block h-full w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <RenderStepContent currentStep={currentStep} form={form} />
          </form>
        </Form>

        <div className="mt-6 flex items-center justify-between gap-x-6">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="text"
              onClick={prevStep}
              disabled={isPending}
              className="flex cursor-pointer items-center gap-2 border border-green-200 transition-colors duration-200 hover:opacity-80"
            >
              {backLabels[currentStep]}
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-green-500/60 md:inline">
              Etapa {currentStep} de {totalSteps}
            </span>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  isPending ||
                  (!isEditMode &&
                    currentStep === 1 &&
                    form.watch("recipe_images").length === 0)
                }
                className="cursor-pointer bg-green-500 px-2 transition-colors duration-200 hover:bg-green-200"
              >
                {nextLabels[currentStep]}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={isEditMode ? handleSaveEdit : handlePublish}
                className="flex cursor-pointer items-center gap-2 bg-green-200 transition-colors duration-200 hover:bg-green-500"
                disabled={isPending}
              >
                {isPending
                  ? isEditMode
                    ? "Salvando..."
                    : "Publicando..."
                  : isEditMode
                    ? "Salvar alterações"
                    : "Publicar receita"}
                {!isEditMode && <SealCheckIcon size={16} />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
