import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import type { UseFormReturn } from "react-hook-form";

import Text from "@/components/ui/Text";
import Textarea from "@/components/ui/TextArea";
import { useState } from "react";
import {
  bioTooLongMessages,
  bioTooShortMessages,
  culinaryLevelOptions,
  dietOptions,
  maxLengthForBio,
  monthlyGoalOptions,
} from "./utils";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<
    {
      fullName: string;
      email: string;
      location: string;
      bio: string;
      publicProfile: boolean;
      dietType: string;
      culinaryLevel: string;
      monthlyGoal: string;
      password?: string | undefined;
      newPassword?: string | undefined;
      confirmPassword?: string | undefined;
    },
    unknown,
    undefined
  >;
  setBioLength: (length: number) => void;
  bioLength: number;
}

export default function FormInformation({
  form,
  className,
  bioLength,
  setBioLength,
}: Props) {
  const [bioErrorMessage, setBioErrorMessage] = useState<string | null>(null);
  const [bioErrorType, setBioErrorType] = useState<"short" | "long" | null>(
    null
  );

  return (
    <form className={`space-y-6 ${className || ""}`}>
      <div className="w-full flex items-start gap-x-4 flex-col md:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-500">Nome completo</FormLabel>
                <FormControl className="rounded-lg">
                  <Input placeholder="Digite seu nome completo" {...field} />
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
                <FormLabel className="text-green-500">Email</FormLabel>
                <FormControl className="rounded-lg">
                  <Input
                    type="email"
                    placeholder="julio@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-green-500">Localização</FormLabel>
            <FormControl className="rounded-lg">
              <Input placeholder="Ex: São Paulo, SP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="w-full flex items-start gap-x-4 flex-col md:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="dietType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-500">Tipo de dieta</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Selecione seu tipo de dieta" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
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
                <FormLabel className="text-green-500">
                  Nível culinário
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Qual seu nível culinário?" />
                    </SelectTrigger>
                    <SelectContent>
                      {culinaryLevelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
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
      </div>

      <div className="w-full flex items-start gap-x-4 flex-col md:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="monthlyGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-500">Meta mensal</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Quantas receitas por mês?" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthlyGoalOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
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
            name="publicProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-500">Perfil público</FormLabel>
                <div className="flex flex-row items-center justify-between rounded-lg border border-green-200 px-3 py-2">
                  <Text type={Text.Type.BodyFour} className="text-green-500">
                    Permitir que outros vejam suas receitas
                  </Text>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
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
            <FormLabel className="text-green-500">Sobre você</FormLabel>
            <div className="relative">
              <FormControl className="pb-4 pr-6 rounded-lg">
                <Textarea
                  placeholder="Ex: Gosto de criar receitas veganas rápidas."
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
              <div className="absolute bottom-0 right-2">
                <Text
                  as="span"
                  type={Text.Type.BodyFour}
                  className="text-right text-green-500"
                >
                  {bioLength}/{" "}
                  <span
                    className={`${
                      form.formState.errors.bio || bioLength > maxLengthForBio
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {maxLengthForBio}
                  </span>
                </Text>
              </div>
            </div>
            {bioErrorMessage && (
              <div className="w-full flex justify-end">
                <Text type={Text.Type.BodyFour} className="text-red-600">
                  {bioErrorMessage}
                </Text>
              </div>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-green-500">Senha atual</FormLabel>
            <FormControl className="rounded-lg">
              <Input
                type="password"
                placeholder="Digite sua senha atual"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="w-full flex gap-x-4 items-start justify-center">
        <div className="w-full">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-500">Nova senha</FormLabel>
                <FormControl className="rounded-lg">
                  <Input
                    type="password"
                    placeholder="Digite a nova senha"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-500">
                  Confirmar nova senha
                </FormLabel>
                <FormControl className="rounded-lg">
                  <Input
                    type="password"
                    placeholder="Digite novamente a nova senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </form>
  );
}
