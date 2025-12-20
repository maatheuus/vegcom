"use client";

import { AUTH_ERRORS } from "@/shared/api/errors/codes";
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
import {
  AtIcon,
  CircleNotchIcon,
  EyeClosedIcon,
  EyesIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getSignin } from "../../api/queries/getAuthApiServer";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  email: z.string().email({ message: "Endereço de email inválido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});
const loginErrorMessages: Partial<Record<keyof typeof AUTH_ERRORS, string>> = {
  [AUTH_ERRORS.USER_NOT_FOUND]: "Usuário não encontrado.",
  [AUTH_ERRORS.AUTH_INVALID_CREDENTIALS]: "E-mail ou senha incorretos.",
  [AUTH_ERRORS.INVALID_CURRENT_PASSWORD]: "Senha atual incorreta.",
};

export default function LoginForm() {
  const [showingPassword, setShowingPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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
    try {
      startTransition(async () => {
        await getSignin(credentials);
        router.push("/community/");
      });

      toast({
        title: "Sucesso!",
        description: "Você será redirecionado.",
        variant: "success",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code) {
        toast({
          title: "Erro ao fazer login",
          description:
            loginErrorMessages[error.code as keyof typeof AUTH_ERRORS] ||
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
                      icon={<AtIcon size={18} />}
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
                            className="cursor-pointer"
                          />
                        ) : (
                          <EyeClosedIcon
                            size={18}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
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
              className="font-lora text-black-100 text-sm"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </Col>
        <SubmitButton text="Entrar" isLoading={isPending}>
          <CircleNotchIcon size={24} className="animate-spin" />
        </SubmitButton>
      </form>
    </Form>
  );
}
