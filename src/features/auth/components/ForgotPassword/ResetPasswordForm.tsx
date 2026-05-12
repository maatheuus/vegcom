"use client";

import { AUTH_ERRORS } from "@/shared/api/errors/codes";
import LoadingDots from "@/shared/components/ui/Loadings/LoadingDots";
import { toast } from "@/shared/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { InputIcon } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyesIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResetPassword } from "../../api/queries/getAuthApiClient";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    confirmPassword: z.string().min(1, { message: "Confirme sua senha." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [showingPassword, setShowingPassword] = useState(false);
  const [showingConfirmPassword, setShowingConfirmPassword] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const resetPasswordMutation = useResetPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  async function handleResetPassword(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await resetPasswordMutation.mutateAsync({
          token,
          newPassword: data.newPassword,
        });
        toast({
          title: "Senha redefinida!",
          description: "Sua senha foi atualizada com sucesso.",
          variant: "success",
        });
        router.push("/login");
      } catch (error: unknown) {
        const err = error as { code?: string };
        if (err.code === AUTH_ERRORS.INVALID_RESET_TOKEN) {
          setInvalidToken(true);
        } else {
          toast({
            title: "Erro ao redefinir senha",
            description: "Ocorreu um erro inesperado. Tente novamente.",
            variant: "destructive",
          });
        }
      }
    });
  }

  if (invalidToken) {
    return (
      <Col className="items-center gap-3 px-5 pt-4 pb-8 text-center">
        <Text
          weight={Text.Weight.Normal}
          className="font-lora text-black-100 !text-sm"
        >
          Este link é inválido ou já expirou. Solicite um novo link de
          recuperação.
        </Text>
        <Link
          href="/forgot-password"
          className="font-lora text-sm font-semibold text-green-500"
        >
          Solicitar novo link
        </Link>
      </Col>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
        className="w-full px-5"
      >
        <Col className="gap-2 pt-4 pb-4 md:pb-8">
          <Col className="gap-5">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputIcon
                      iconClassName="bg-green-50"
                      type={showingPassword ? "text" : "password"}
                      placeholder="Nova senha"
                      autoComplete="new-password"
                      {...field}
                      icon={
                        showingPassword ? (
                          <EyesIcon
                            size={18}
                            onClick={() => setShowingPassword(false)}
                            className="cursor-pointer text-green-500"
                          />
                        ) : (
                          <EyeClosedIcon
                            size={18}
                            onClick={() => setShowingPassword(true)}
                            className="cursor-pointer text-green-500"
                          />
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="!mb-0">
                    {form.formState.errors.newPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputIcon
                      iconClassName="bg-green-50"
                      type={showingConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar nova senha"
                      autoComplete="new-password"
                      {...field}
                      icon={
                        showingConfirmPassword ? (
                          <EyesIcon
                            size={18}
                            onClick={() => setShowingConfirmPassword(false)}
                            className="cursor-pointer text-green-500"
                          />
                        ) : (
                          <EyeClosedIcon
                            size={18}
                            onClick={() => setShowingConfirmPassword(true)}
                            className="cursor-pointer text-green-500"
                          />
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="!mb-0">
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </Col>
        </Col>
        <SubmitButton text="Redefinir senha" isLoading={isPending}>
          <LoadingDots dotColor="light" />
        </SubmitButton>
      </form>
    </Form>
  );
}
