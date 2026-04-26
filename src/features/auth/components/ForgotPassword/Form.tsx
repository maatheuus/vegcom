"use client";

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
import { AtIcon } from "@phosphor-icons/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPassword } from "../../api/queries/getAuthApiClient";
import SubmitButton from "../SubmitButton/SubmitButton";

const formSchema = z.object({
  email: z.string().email({ message: "Endereço de email inválido." }),
});

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const forgotPasswordMutation = useForgotPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function handleForgotPassword(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await forgotPasswordMutation.mutateAsync(data.email);
        setSubmitted(true);
      } catch (error: unknown) {
        const err = error as { code?: string };
        if (err.code === "TOO_MANY_REQUESTS") {
          toast({
            title: "Muitas tentativas",
            description: "Aguarde um momento antes de tentar novamente.",
            variant: "destructive",
          });
          return;
        }
        setSubmitted(true);
      }
    });
  }

  if (submitted) {
    return (
      <Col className="gap-2 px-5 pt-4 pb-8 text-center">
        <Text
          weight={Text.Weight.Normal}
          className="font-lora text-black-100 !text-sm"
        >
          Se esse e-mail estiver cadastrado, você receberá as instruções em
          breve.
        </Text>
      </Col>
    );
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
                      icon={<AtIcon size={18} className="text-green-500" />}
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
        <SubmitButton text="Enviar instruções" isLoading={isPending}>
          <LoadingDots dotColor="light" />
        </SubmitButton>
      </form>
    </Form>
  );
}
