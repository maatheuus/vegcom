"use client";

import {
  defaultValues,
  newRecipeFormSchema,
} from "@/features/recipes/components/utils";
import { useToast } from "@/shared/hooks/use-toast";
import Button from "@/shared/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import Text from "@/shared/ui/Text";
import Textarea from "@/shared/ui/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowBendUpLeftIcon,
  ArrowBendUpRightIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DynamicFields from "./DynamicFields";
import FluctuantTip from "./FluctuantTip";
import GroupFields from "./GroupFields";
import ImageUploadArea from "./ImageUploadArea";
import PreparationFields from "./PreparationFields";

interface Props extends ComponentProps<"div"> {
  className?: string;
}

const TIPS_BY_STEP: Record<number, string[]> = {
  1: [
    "Escolha um nome claro e descritivo para a receita.",
    "Adicione uma descrição curta e apetitosa.",
    "Defina o tempo de preparo para ajudar no planejamento.",
  ],
  2: [
    "Liste todos os ingredientes necessários.",
    "Especifique as quantidades corretamente.",
    "Se possível, indique marcas ou tipos específicos de ingredientes.",
  ],
  3: [
    "Escreva instruções simples e passo a passo.",
    "Seja claro sobre tempos e temperaturas.",
  ],
  4: [
    "Use notas de preparo para compartilhar truques ou sugestões extras.",
    "Mencione substituições possíveis para ingredientes.",
  ],
  5: [
    "A primeira foto será a de destaque da receita.",
    "Adicione fotos do prato pronto.",
    "Mostre detalhes da textura.",
    "Fotos do processo também ajudam muito!",
  ],
};

export default function NewRecipeForm({}: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newRecipeFormSchema>>({
    resolver: zodResolver(newRecipeFormSchema),
    defaultValues: { ...defaultValues },
  });
  const values = form.getValues();

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!values.recipe_title?.trim() || values.recipe_title?.length < 4) {
          toast({
            title: "O título precisa ter pelo menos 4 letras!",
            variant: "destructive",
          });
          return false;
        } else if (values.recipe_title?.length > 50) {
          toast({
            title: "Esse título tá meio longo demais, hein? 🤔",
            variant: "destructive",
          });
          return false;
        }

        if (!values.recipe_description?.trim()) {
          toast({
            title: "Uma boa receita merece uma descrição bacana",
            variant: "destructive",
          });
          return false;
        } else if (values.recipe_description?.length > 500) {
          toast({
            title: "Vamos manter a descrição mais objetiva 😉",
            variant: "destructive",
          });
          return false;
        }

        if (!values.recipe_preparationHours) {
          toast({
            title: "Informe as horas, mesmo que seja zero",
            variant: "destructive",
          });
          return false;
        } else if (!values.recipe_preparationMinutes) {
          toast({
            title: "Quantos minutinhos?",
            variant: "destructive",
          });
          return false;
        }

        if (!values.recipe_servings) {
          toast({
            title: "Quantas pessoas vão se deliciar com essa receita?",
            variant: "destructive",
          });
          return false;
        }

        if (!values.recipe_category) {
          toast({
            title: "Por favor, selecione uma categoria",
            variant: "destructive",
          });
          return false;
        }

        if (!values.recipe_difficulty) {
          toast({
            title: "Qual o nível de dificuldade da receita?",
            variant: "destructive",
          });
          return false;
        }

        return true;

      case 2:
        // Ingredients
        if (values.recipe_ingredients.length === 0) {
          toast({
            title: "Por favor, adicione pelo menos um ingrediente",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 3:
        // Instructions
        if (values.recipe_instructions.length === 0) {
          toast({
            title:
              "Por favor, adicione pelo menos uma instrução. Você precisa ensinar como fazer, né? 😅",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 4:
        // Cooking Notes
        if (values.recipe_cookingNotes.length === 0) {
          toast({
            title: "Por favor, deixe pelo menos uma dica",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 5:
        // Images
        if (values.recipe_images.length === 0) {
          toast({
            title: "Pelo menos uma imagem ajuda bastante!",
            variant: "destructive",
          });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = () => {
    if (validateStep(currentStep)) {
      const data = form.getValues();
      const { recipe_preparationHours, recipe_preparationMinutes, ...rest } =
        data;

      const formattedData = {
        ...rest,
        recipe_preparationTime: {
          hours: Number(recipe_preparationHours),
          minutes: Number(recipe_preparationMinutes),
        },
      };

      toast({ title: "Receita publicada com sucesso!", variant: "success" });
      // após publicar a receita, fazer o redirect para a página da receita.
      console.log("Submit:", formattedData);
      console.log(
        "Imagens incluídas:",
        formattedData.recipe_images.map((img) => img.name),
      );
    }
  };

  const stepTitles = [
    "Informações Básicas",
    "Ingredientes",
    "Instruções",
    "Notas de Cozimento",
    "Imagens",
  ];

  const renderStepContent = () => {
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
            <DynamicFields title="Adicione Imagens" className="w-full">
              <ImageUploadArea form={form} className="flex h-full" />
            </DynamicFields>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <FluctuantTip tips={TIPS_BY_STEP[currentStep]} />
      <div className="border-b border-green-100">
        <div className="md:py-6">
          <ScrollArea orientation="horizontal" className="w-full pb-4">
            <div className="flex w-full min-w-[600px] items-start justify-between gap-2 text-center md:min-w-0">
              {stepTitles.map((stepTitle, index) => (
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
                        <span className="text-sm italic">{index + 1}</span>
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
                      {stepTitle}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="h-full py-8">
        <div className="mx-auto h-full max-w-4xl">
          <Form {...form}>
            <form className="block h-full w-full md:min-h-[420px]">
              {renderStepContent()}
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
              >
                Publicar Receita
                <SealCheckIcon size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
