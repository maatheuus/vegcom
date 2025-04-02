"use client";

import {
  ArrowCircleRightOutlinedIcon,
  AtOutlinedIcon,
  ClosedEyeOutlinedIcon,
  OpenEyesOutlinedIcon
} from "@/components/icons";
import Button from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { InputIcon } from "@/components/ui/Input";
import Col from "@/components/ui/Layout/Helpers/Col";
import { toast } from "@/hooks/use-toast";
import { login } from "@/lib/supabase/authFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    const { error } = await login(data.email, data.password);

    if (error) {
      toast({
        title: "Erro ao fazer login",
        description:
          error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
        duration: 8000,
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
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <Col className="gap-5 px-5 pt-4 pb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon
                    type="email"
                    placeholder="Seu Email"
                    autoComplete="email"
                    {...field}
                    icon={<AtOutlinedIcon size={18} />}
                  />
                </FormControl>
                <FormMessage>
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
                    placeholder="Sua senha"
                    autoComplete="new-password"
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
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="w-full text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-green-200 hover:text-green-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </Col>
        <Col className="items-center gap-2 px-5 py-4">
          <Button.Icon
            type="submit"
            leftIcon={<ArrowCircleRightOutlinedIcon size={24} />}
            text="Login"
            className="w-full sm:max-w-3xs animate-rotate-icon"
          />
          {/* <Text
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
          /> */}
        </Col>
      </form>
    </Form>
  );
}
