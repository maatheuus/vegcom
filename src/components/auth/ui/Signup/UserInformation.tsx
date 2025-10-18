"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { culinaryLevelOptions } from "@/components/account/utils";
import { LoadingOutlinedIcon } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Label } from "@/components/ui/Label";
import Col from "@/components/ui/Layout/Helpers/Col";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { SearchCityLocation } from "@/components/ui/SearchCityLocation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import Textarea from "@/components/ui/TextArea";
import { useSignupFormState } from "@/hooks/auth/queryes/useSignupFormState";
import { type CitySearchResult } from "@/lib/api/cities";
import { type FC } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  userInfo: z.string().min(10, {
    message:
      "Não precisa escrever sua biografia... mas um parágrafozinho ajuda!",
  }),
  location: z.string().min(2, { message: "Prometemos: sem stalker, só amor!" }),

  culinaryLevel: z
    .union([z.enum(["beginner", "intermediate", "advanced"]), z.literal("")])
    .refine((v) => v !== "", {
      message:
        "Seja sincero: você queima água ou já faz até fermentação natural?",
    }),

  meetUsInfo: z.string().optional(),

  preference: z
    .union([z.enum(["vegan", "vegetarian"]), z.literal("")])
    .refine((v) => v !== "", {
      message: "Sem carne por amor, estilo ou ranço mesmo?",
    }),
});

const UserInformation: FC<React.ComponentProps<"form">> = ({
  className,
  ...props
}) => {
  const { formData, nextStep, updateFormData, isSubmitting } =
    useSignupFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInfo: formData.userInfo || "",
      meetUsInfo: formData.meetUsInfo || "",
      preference: (formData.preference || "") as z.infer<
        typeof formSchema
      >["preference"],
      culinaryLevel: (formData.culinaryLevel || "") as z.infer<
        typeof formSchema
      >["culinaryLevel"],
      location: formData.location || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const finalData = { ...formData, ...data };
    const { currentStep, ...payload } = finalData;
    console.log(payload);

    updateFormData(payload);
    nextStep();
  }

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Col className="items-center gap-4 px-5 pt-4 pb-5">
          <FormField
            control={form.control}
            name="userInfo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="w-full text-green-500"
                    placeholder="Há 5 anos, decidi me tornar vegano e desde então estou sempre explorando novas receitas..."
                    maxLength={154}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!mb-0" />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="preference"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Col className="gap-3">
                      <Text className="font-maitree font-semibold text-green-500">
                        Eu sou:
                      </Text>

                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-8"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegetarian" id="vegetarian" />
                          <Label
                            htmlFor="vegetarian"
                            className="font-maitree font-bold text-green-500"
                          >
                            Vegetariano(a)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegan" id="vegan" />
                          <Label
                            htmlFor="vegan"
                            className="font-maitree font-bold text-green-500"
                          >
                            Vegano(a)
                          </Label>
                        </div>
                      </RadioGroup>
                    </Col>
                  </FormControl>
                  <FormMessage className="!mb-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="culinaryLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-maitree text-base font-semibold text-green-500">
                    Nível culinário
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="font-lora rounded-sm md:min-w-[200px]">
                        <SelectValue placeholder="Qual seu nível culinário?" />
                      </SelectTrigger>
                      <SelectContent>
                        {culinaryLevelOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="font-maitree"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="!mb-0" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Localização
                </FormLabel>
                <FormControl>
                  <SearchCityLocation
                    value={field.value}
                    onChange={field.onChange}
                    onSelect={(city: CitySearchResult) => {
                      field.onChange(city.displayName);
                    }}
                    placeholder="Digite sua cidade..."
                    error={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage className="!mb-0" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meetUsInfo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="min-h-[97px] w-full text-green-500"
                    placeholder="Como nos encontrou? Tinder? Sinais de fumaça? Conta aí! (opcional)"
                    maxLength={154}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!mb-0" />
              </FormItem>
            )}
          />
        </Col>
        <Col className="items-center gap-2 px-5">
          <SubmitButton
            text="Seguinte"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            <LoadingOutlinedIcon className="!h-6 !w-6 animate-spin" />
          </SubmitButton>
        </Col>
      </form>
    </Form>
  );
};

export default UserInformation;
