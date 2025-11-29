"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { InputIcon } from "@/shared/ui/Input";

import Col from "@/shared/ui/Layout/Helpers/Col";

import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import {
  AtIcon,
  CircleNotchIcon,
  EyeClosedIcon,
  EyesIcon,
  UserCircleDashedIcon,
} from "@phosphor-icons/react";
import { useState, type ComponentProps, type FC } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  username: z.string().min(4, { message: "Deve conter no mínimo 4 letras." }),
  email: z.string().email({ message: "Endereço de email inválido." }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

const SignupForm: FC<ComponentProps<"form">> = ({ className, ...props }) => {
  const [showingPassword, setShowingPassword] = useState<boolean>(false);
  const { formData, updateFormData, nextStep } = useSignupFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: formData.username || "",
      email: formData.email || "",
      password: formData.password || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    updateFormData(data);
    nextStep();
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
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Col className="items-center gap-3 px-5 pt-4 pb-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <InputIcon
                    className="w-full text-green-500"
                    type="text"
                    placeholder="Nome completo"
                    autoComplete="name"
                    {...field}
                    icon={
                      <UserCircleDashedIcon
                        className="text-green-500"
                        size={18}
                      />
                    }
                  />
                </FormControl>
                <FormMessage className="!mb-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <InputIcon
                    className="w-full text-green-500"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    {...field}
                    icon={<AtIcon className="text-green-500" size={18} />}
                  />
                </FormControl>
                <FormMessage className="!mb-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <InputIcon
                    className="w-full"
                    type={showingPassword ? "text" : "password"}
                    placeholder="Senha"
                    autoComplete="new-password"
                    {...field}
                    icon={
                      <div
                        onClick={() => setShowingPassword(!showingPassword)}
                        className="cursor-pointer"
                      >
                        {showingPassword ? (
                          <EyesIcon size={18} className="text-green-500" />
                        ) : (
                          <EyeClosedIcon size={18} className="text-green-500" />
                        )}
                      </div>
                    }
                  />
                </FormControl>
                <FormMessage className="!mb-0" />
              </FormItem>
            )}
          />
        </Col>
        <Col className="items-center gap-2 px-5 py-4">
          <SubmitButton text="Seguinte">
            <CircleNotchIcon className="!h-6 !w-6 animate-spin" />
          </SubmitButton>
        </Col>
      </form>
    </Form>
  );
};

export default SignupForm;
