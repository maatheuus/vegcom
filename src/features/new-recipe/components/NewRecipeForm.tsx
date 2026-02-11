"use client";

import { useGetUser } from "@/features/account/api/queries/getAuthApiClient";
import {
  defaultValues,
  newRecipeFormSchema,
} from "@/features/recipes/components/utils";
import { useToast } from "@/shared/hooks/use-toast";
import { usePersistentForm } from "@/shared/hooks/usePersistentForm";
import Button from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";
import { ScrollArea } from "@/shared/ui/scroll-area";
import Text from "@/shared/ui/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowBendUpLeftIcon,
  ArrowBendUpRightIcon,
  BasketIcon,
  ChefHatIcon,
  CookingPotIcon,
  ImagesSquareIcon,
  NotePencilIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ComponentProps, ElementType } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useCreateNewRecipe } from "../api/queries/getNewRecipesApiClient";
import {
  TIPS_BY_STEP,
  transformFormToApiPayload,
  validateStep,
  type NewRecipeFormValues,
} from "../utils";
import FluctuantTip from "./FluctuantTip";
import RenderStepContent from "./RenderStepContent";

interface Props extends ComponentProps<"div"> {
  className?: string;
}

export default function NewRecipeForm({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: user } = useGetUser();

  const form = useForm<NewRecipeFormValues>({
    resolver: zodResolver(newRecipeFormSchema),
    defaultValues: { ...defaultValues },
  });
  const {
    mutateAsync: createNewRecipe,
    isPending,
  } = useCreateNewRecipe();

  const { toast } = useToast();

  const { clearStorage } = usePersistentForm(form, {
    key: "vegcom-new-recipe-form",
    ttlSeconds: 1800,
    excludeFields: ["recipe_images"],
  });

  const values = form.getValues();
  const currentStep = Number(searchParams.get("step")) || 1;
  const totalSteps = 5;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const nextStep = () => {
    if (validateStep(currentStep, values, toast)) {
      const nextStepValue = Math.min(currentStep + 1, totalSteps);
      router.push(
        pathname + "?" + createQueryString("step", String(nextStepValue)),
      );
    }
  };

  const prevStep = () => {
    const prevStepValue = Math.max(currentStep - 1, 1);
    router.push(
      pathname + "?" + createQueryString("step", String(prevStepValue)),
    );
  };

  const handlePublish = async () => {
    if (validateStep(currentStep, values, toast)) {
      const formData = form.getValues();

      const userId = user?.id;
      const payload = transformFormToApiPayload(formData, Number(userId));

      console.log("Payload para API:", payload);

      try {
        const { data, success } = await createNewRecipe(payload);

        if (success) {
          router.push(`/recipes/${data.slug}`);
          toast({
            title: "Receita publicada com sucesso!",
            variant: "success",
          });
          clearStorage();
        }
      } catch (error) {
        console.error("Erro ao publicar receita:", error);
        toast({
          title: "Erro ao publicar receita",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    }
  };

  const steps = [
    {
      label: "Informações Básicas",
      icon: ChefHatIcon,
    },
    {
      label: "Ingredientes",
      icon: BasketIcon,
    },
    {
      label: "Instruções",
      icon: CookingPotIcon,
    },
    {
      label: "Notas de Cozimento",
      icon: NotePencilIcon,
    },
    {
      label: "Imagens",
      icon: ImagesSquareIcon,
    },
  ];

  return (
    <div>
      <FluctuantTip tips={TIPS_BY_STEP[currentStep]} />
      <div className="border-b border-green-100">
        <div className="md:py-6">
          <ScrollArea orientation="horizontal" className="w-full pb-4">
            <div className="flex w-full min-w-[600px] items-start justify-between gap-2 text-center md:min-w-0">
              {steps.map((step, index) => {
                const label = step.label;
                const Icon = step.icon as unknown as ElementType;

                return (
                  <div
                    key={index}
                    className="flex flex-1 items-center justify-center gap-2"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`font-lora flex min-h-8 min-w-8 items-center justify-center rounded-full transition-colors ${
                          currentStep > index + 1
                            ? "bg-green-600 font-semibold text-white"
                            : currentStep === index + 1
                              ? "bg-green-500 text-green-50"
                              : "bg-green-100 text-green-500"
                        }`}
                      >
                        {currentStep > index + 1 ? (
                          <SealCheckIcon size={16} />
                        ) : (
                          <span className="text-sm italic">
                            <Icon />
                          </span>
                        )}
                      </div>
                      <Text
                        className={`font-lora text-xs ${
                          currentStep === index + 1
                            ? "text-green-600"
                            : currentStep > index + 1
                              ? "text-green-500"
                              : "text-green-600"
                        }`}
                      >
                        {label}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="h-full py-8">
        <div className="mx-auto h-full max-w-4xl">
          <Form {...form}>
            <form className="block h-full w-full md:min-h-[420px]">
              <RenderStepContent currentStep={currentStep} form={form} />
            </form>
          </Form>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="text"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex cursor-pointer items-center gap-2 border border-green-500 disabled:pointer-events-auto disabled:cursor-not-allowed"
            >
              <ArrowBendUpLeftIcon size={16} />
              Anterior
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="flex cursor-pointer items-center gap-2 bg-green-500 hover:bg-green-600"
              >
                Próximo
                <ArrowBendUpRightIcon size={16} />
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                className="flex cursor-pointer items-center gap-2 bg-green-500 hover:bg-green-800"
                disabled={isPending}
              >
                {isPending ? "Publicando..." : "Publicar Receita"}
                <SealCheckIcon size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
