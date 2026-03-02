import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/Select";
import { Switch } from "@/shared/ui/Switch";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import Text from "@/shared/ui/Text";
import Textarea from "@/shared/ui/TextArea";
import clsx from "clsx";
import { useState } from "react";
import {
    bioTooLongMessages,
    bioTooShortMessages,
    culinaryLevelOptions,
    dietOptions,
    maxLengthForBio,
    personalInfoFormSchema,
} from "../utils";

type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<PersonalInfoFormValues>;
  setBioLength: (length: number) => void;
  isEditing?: boolean;
}

export default function FormInformation({
  form,
  className,
  isEditing,
  setBioLength,
}: Props) {
  const [bioErrorMessage, setBioErrorMessage] = useState<string | null>(null);
  const [bioErrorType, setBioErrorType] = useState<"short" | "long" | null>(
    null,
  );

  const { email, location, publicProfile, culinaryLevel } = form.getValues();

  return (
    <form className={`space-y-6 ${className || ""}`}>
      <div className="flex w-full flex-col items-start gap-x-4 md:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Nome completo
                </FormLabel>
                <FormControl className="rounded-lg">
                  <Input
                    placeholder="Digite seu nome completo"
                    disabled={isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Email
                </FormLabel>
                <FormControl className="rounded-lg">
                  <Input
                    type="email"
                    placeholder={email || "email@gmail.com"}
                    disabled={isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-x-4 md:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Localização
                </FormLabel>
                <FormControl className="rounded-lg">
                  <Input
                    placeholder={location || "Ex: São Paulo, SP"}
                    disabled={isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="publicProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Perfil público
                </FormLabel>
                <div
                  className={clsx(
                    "flex h-full flex-row items-center justify-between rounded-lg border border-green-200 p-3",
                    isEditing && "opacity-50",
                  )}
                >
                  <Text
                    type={Text.Type.BodyFour}
                    className="font-maitree text-base text-green-500"
                  >
                    Permitir que outros vejam suas receitas
                  </Text>
                  <FormControl>
                    <Switch
                      checked={publicProfile}
                      onCheckedChange={field.onChange}
                      disabled={isEditing}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-x-4 md:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="dietType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Estilo de vida
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    disabled={isEditing}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="font-lora min-h-[2.875rem] rounded-lg">
                      <SelectValue placeholder="Selecione seu estilo de vida" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietOptions.map((option) => (
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="culinaryLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-maitree text-base font-semibold text-green-500">
                  Nível culinário
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    disabled={isEditing}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="font-lora min-h-[2.875rem] rounded-lg">
                      <SelectValue placeholder="Qual seu nível culinário?" />
                    </SelectTrigger>
                    <SelectContent>
                      {culinaryLevelOptions.map((option) => {
                        const level = culinaryLevelOptions.find(
                          (level) => level.value === culinaryLevel,
                        );

                        return (
                          <SelectItem
                            key={option.value}
                            value={level?.value || option.value}
                            className="font-maitree"
                          >
                            {option.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="font-maitree text-base font-semibold text-green-500">
              Sobre você
            </FormLabel>
            <FormControl className="rounded-lg pr-6 pb-4">
              <Textarea
                placeholder="Ex: Gosto de criar receitas veganas rápidas."
                disabled={isEditing}
                showCharacterCount
                maxLength={maxLengthForBio}
                className="w-full max-w-full"
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  const length = value.length;

                  field.onChange(e);
                  setBioLength(length);

                  if (length < 50 && bioErrorType !== "short") {
                    const randomMsg =
                      bioTooShortMessages[
                        Math.floor(Math.random() * bioTooShortMessages.length)
                      ];
                    setBioErrorMessage(randomMsg);
                    setBioErrorType("short");
                  } else if (
                    length > maxLengthForBio &&
                    bioErrorType !== "long"
                  ) {
                    const randomMsg =
                      bioTooLongMessages[
                        Math.floor(Math.random() * bioTooLongMessages.length)
                      ];
                    setBioErrorMessage(randomMsg);
                    setBioErrorType("long");
                  } else if (length >= 50 && length <= maxLengthForBio) {
                    setBioErrorMessage(null);
                    setBioErrorType(null);
                  }
                }}
              />
            </FormControl>
            {bioErrorMessage && (
              <div className="flex w-full justify-end">
                <Text type={Text.Type.BodyFour} className="text-red-600">
                  {bioErrorMessage}
                </Text>
              </div>
            )}
          </FormItem>
        )}
      />
    </form>
  );
}
