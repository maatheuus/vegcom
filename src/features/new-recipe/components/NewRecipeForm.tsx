"use client";

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
import type { ComponentProps } from "react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateNewRecipe } from "../api/queries/getNewRecipesApiClient";
import {
  TIPS_BY_STEP,
  transformFormToApiPayload,
  type NewRecipeFormValues,
} from "../utils";
import FluctuantTip from "./FluctuantTip";
import RenderStepContent from "./RenderStepContent";
import StepIndicator from "./StepIndicator";

interface Props extends ComponentProps<"div"> {
  className?: string;
}

export default function NewRecipeForm({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<NewRecipeFormValues>({
    resolver: zodResolver(newRecipeFormSchema),
    defaultValues: { ...defaultValues },
  });
  const { mutateAsync: createNewRecipe, isPending } = useCreateNewRecipe();
  const { toast } = useToast();
  const IMAGE_STORAGE_KEY = "vegcom-new-recipe-images";
  const IMAGE_TTL_MS = 30 * 60 * 1000;

  const { clearStorage } = usePersistentForm(form, {
    key: "vegcom-new-recipe-form",
    ttlSeconds: 1800,
    excludeFields: ["recipe_images"],
  });

  useEffect(() => {
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

    if (valid) {
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
    }
  };

  const backLabels: Record<number, string> = {
    2: "← Fundamentos",
    3: "← A receita",
  };

  const nextLabels: Record<number, string> = {
    1: "Próximo: A receita →",
    2: "Próximo: Revisar & publicar →",
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

        <div className="mt-6 flex items-center justify-between">
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
            <span className="text-xs text-green-500/60">
              Etapa {currentStep} de {totalSteps}
            </span>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  isPending ||
                  (currentStep === 1 &&
                    form.watch("recipe_images").length === 0)
                }
                className="flex cursor-pointer items-center gap-2 bg-green-200 transition-colors duration-200 hover:bg-green-500"
              >
                {nextLabels[currentStep]}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handlePublish}
                className="flex cursor-pointer items-center gap-2 bg-green-200 transition-colors duration-200 hover:bg-green-500"
                disabled={isPending}
              >
                {isPending ? "Publicando..." : "Publicar receita"}
                <SealCheckIcon size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
