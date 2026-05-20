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
import { zodResolver } from "@hookform/resolvers/zod";
import { AtIcon, EyeClosedIcon, EyesIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { getSafeRedirect } from "@/shared/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignin } from "../../api/queries/getAuthApiClient";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  email: z.string().email({ message: "Endereço de email inválido." }),
  password: z.string().min(1, { message: "A senha não pode estar vazia." }),
});

const loginErrorMessages: Partial<Record<keyof typeof AUTH_ERRORS, string>> = {
  [AUTH_ERRORS.USER_NOT_FOUND]: "Usuário não encontrado.",
  [AUTH_ERRORS.AUTH_INVALID_CREDENTIALS]: "E-mail ou senha incorretos.",
};

export default function LoginForm() {
  const [showingPassword, setShowingPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const signinMutation = useSignin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function togglePasswordVisibility() {
    setShowingPassword((prev) => !prev);
  }

  async function handleLogin(credentials: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await signinMutation.mutateAsync(credentials);
        router.refresh();
        toast({
          title: "Sucesso!",
          description: "Você será redirecionado.",
          variant: "success",
        });
        router.push(getSafeRedirect(searchParams.get("next")));
      } catch (error: unknown) {
        console.error("Login error:", error);
        const err = error as { message?: string; code?: string };
        if (err.message) {
          toast({
            title: "Erro ao fazer login",
            description:
              loginErrorMessages[err.code as keyof typeof AUTH_ERRORS] ||
              "Verifique suas credenciais e tente novamente.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro inesperado",
            description: "Ocorreu um erro ao tentar fazer login.",
            variant: "destructive",
          });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="w-full px-5">
        <Col className="gap-2 pt-4 pb-4 md:pb-8">
          <Col className="gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputIcon
                      type="email"
                      placeholder="Digite seu email"
                      autoComplete="email"
                      {...field}
                      icon={<AtIcon size={18} className="text-green-500" />}
                    />
                  </FormControl>
                  <FormMessage className="!mb-0">
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputIcon
                      type={showingPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      autoComplete="current-password"
                      {...field}
                      icon={
                        showingPassword ? (
                          <EyesIcon
                            size={18}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer text-green-500"
                          />
                        ) : (
                          <EyeClosedIcon
                            size={18}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer text-green-500"
                          />
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="!mb-0">
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </Col>
          <div className="w-full text-right">
            <Link
              href="/forgot-password"
              className="font-lora text-sm font-medium text-green-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </Col>
        <SubmitButton text="Entrar" isLoading={isPending}>
          <LoadingDots dotColor="light" />
        </SubmitButton>
      </form>
    </Form>
  );
}
