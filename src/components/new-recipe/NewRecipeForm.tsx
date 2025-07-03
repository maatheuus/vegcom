"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultValues, newRecipeFormSchema } from "../recipes/utils";
import Button from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import Col from "../ui/Layout/Helpers/Col";
import Row from "../ui/Layout/Helpers/Row";
import Textarea from "../ui/TextArea";
import DynamicFields from "./DynamicFields";
import GroupFields from "./GroupFields";
import ImageUploadArea from "./ImageUploadArea";
import PreparationFields from "./PreparationFields";

interface Props extends ComponentProps<"div"> {
  className?: string;
}

export default function NewRecipeForm({}: Props) {
  const form = useForm<z.infer<typeof newRecipeFormSchema>>({
    resolver: zodResolver(newRecipeFormSchema),
    defaultValues: { ...defaultValues },
  });

  function onSubmit(data: z.infer<typeof newRecipeFormSchema>) {
    const { recipe_preparationHours, recipe_preparationMinutes, ...rest } =
      data;

    const formattedData = {
      ...rest,
      recipe_preparationTime: {
        hours: Number(recipe_preparationHours),
        minutes: Number(recipe_preparationMinutes),
      },
    };

    console.log("Submit:", formattedData);
    console.log(
      "Imagens incluídas:",
      formattedData.recipe_images.map((img) => img.name)
    );
  }

  return (
    <Row>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full">
          <Col className="gap-y-14">
            <div className="flex flex-col lg:flex-row gap-x-8">
              <Col className="gap-y-4 flex-1">
                <DynamicFields
                  title="Título & Descrição"
                  className="flex-1 w-full"
                >
                  <FormField
                    control={form.control}
                    name="recipe_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
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
                            className="h-full max-h-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DynamicFields>
                <PreparationFields form={form} className="mt-5" />
              </Col>
              <DynamicFields title="Adicione Imagens" className="flex-1">
                <ImageUploadArea form={form} className="h-full flex" />
              </DynamicFields>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <GroupFields form={form} />
            </div>
          </Col>
          <div className="w-full flex justify-end mt-16">
            <Button type="submit" className="cursor-pointer">
              Criar Receita
            </Button>
          </div>
        </form>
      </Form>
    </Row>
  );
}
