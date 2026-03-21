"use client";

import { useToast } from "@/shared/hooks/use-toast";
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
import { AtIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  email: z.string().email({ message: "Endereço de email inválido." }),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPassword(data: z.infer<typeof formSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Forgot password data:", data);

    toast({
      title: "Email enviado!",
      description:
        "Se o email estiver cadastrado, você receberá um link de recuperação.",
      variant: "success",
    });

    form.reset();
    router.push("/login");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPassword)}
        className="w-full px-5"
      >
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
          </Col>
        </Col>
        <SubmitButton text="Enviar link" />
      </form>
    </Form>
  );
}
