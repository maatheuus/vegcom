"use client";

import { login } from "@/features/auth/api/authApi";
import { toast } from "@/shared/hooks/use-toast";
import {
  AtOutlinedIcon,
  ClosedEyeOutlinedIcon,
  OpenEyesOutlinedIcon,
} from "@/shared/icons";
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
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  email: z.string().email({ message: "Endereço de email inválido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export default function LoginForm() {
  const [showingPassword, setShowingPassword] = useState<boolean>(false);
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

  async function handleLogin(data: z.infer<typeof formSchema>) {
    const { error } = await login(data);

    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: error || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Você foi logado com sucesso.",
        variant: "success",
      });
    }
  }

  // async function handleLoginWithGoogle() {
  //   const { error } = await loginWithGoogle();

  //   if (error) {
  //     toast({
  //       title: "Erro ao fazer login",
  //       description:
  //         error.message || "Verifique suas credenciais e tente novamente.",
  //       variant: "destructive",
  //       duration: 8000,
  //     });
  //   } else {
  //     toast({
  //       title: "Sucesso!",
  //       description: " Vocé foi logado com sucesso.",
  //       variant: "success",
  //     });
  //   }
  // }

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
                      icon={<AtOutlinedIcon size={18} />}
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
                          <OpenEyesOutlinedIcon
                            size={18}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
                          />
                        ) : (
                          <ClosedEyeOutlinedIcon
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
        <SubmitButton text="Entrar" />
      </form>
    </Form>
  );
}

{
  /* <Text
  as="span"
  className="text-green-500 text-xs"
  weight={Text.Weight.SemiBold}
>
  ou
</Text>
<Button.Icon
  type="button"
  onClick={handleLoginWithGoogle}
  variant="text"
  leftIcon={<GoogleOutlinedIcon size={24} />}
  text="Continue com Google"
  className="w-full sm:max-w-3xs hover:text-green-700"
/> */
}
