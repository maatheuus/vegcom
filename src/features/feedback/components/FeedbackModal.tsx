"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, SpinnerGapIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import Textarea from "@/shared/ui/TextArea";

const ASSUNTO_OPTIONS = [
  { value: "Bug", label: "Bug", emoji: "🐛" },
  { value: "Sugestão", label: "Sugestão", emoji: "💡" },
  { value: "Receitas", label: "Receitas", emoji: "🍽️" },
  { value: "Comunidade", label: "Comunidade", emoji: "👥" },
  { value: "Assinatura", label: "Assinatura", emoji: "💳" },
  { value: "Chat IA", label: "Chat IA", emoji: "🤖" },
  { value: "Outro", label: "Outro", emoji: "✨" },
] as const;

type AssuntoValue = (typeof ASSUNTO_OPTIONS)[number]["value"];

const feedbackSchema = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    assunto: z.enum(
      ASSUNTO_OPTIONS.map((o) => o.value) as [AssuntoValue, ...AssuntoValue[]],
      { required_error: "Selecione um assunto" },
    ),
    assuntoOutro: z.string().optional(),
    mensagem: z
      .string()
      .min(10, "Mensagem deve ter pelo menos 10 caracteres")
      .max(500),
    honeypot: z.string().max(0),
  })
  .refine(
    (data) => {
      if (data.assunto === "Outro") {
        return data.assuntoOutro && data.assuntoOutro.trim().length >= 2;
      }
      return true;
    },
    {
      message: "Especifique o assunto (mínimo 2 caracteres)",
      path: ["assuntoOutro"],
    },
  );

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackModal() {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      nome: "",
      email: "",
      assunto: undefined,
      assuntoOutro: "",
      mensagem: "",
      honeypot: "",
    },
  });

  const assunto = form.watch("assunto");
  const isSubmitting = form.formState.isSubmitting;
  const isSuccess =
    form.formState.isSubmitSuccessful && !form.formState.isSubmitting;

  function handleOpenChange(val: boolean) {
    if (!val && !isSubmitting) {
      form.reset();
    }
  }

  async function onSubmit(values: FeedbackFormValues) {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      form.setError("root", {
        message:
          (data as { message?: string }).message ??
          "Erro ao enviar mensagem. Tente novamente.",
      });
      return;
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="font-maitree cursor-pointer rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20">
          Feedback
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>Enviar Feedback</DialogTitle>
          <DialogDescription>Conte-nos o que está pensando!</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait" initial={false}>
          {isSuccess ? (
            <SuccessState key="success" onClose={() => form.reset()} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                >
                  {/* Honeypot – hidden from real users, traps bots */}
                  <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                      <input
                        type="text"
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                        className="pointer-events-none absolute -top-full opacity-0"
                        {...field}
                      />
                    )}
                  />

                  {/* Nome */}
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-maitree text-sm font-medium text-green-200">
                          Nome
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-sm"
                            placeholder="Seu nome"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-maitree text-sm font-medium text-green-200">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-sm"
                            type="email"
                            placeholder="seu@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Assunto */}
                  <FormField
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-maitree text-sm font-medium text-green-200">
                          Assunto
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-wrap gap-2">
                            {ASSUNTO_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => field.onChange(opt.value)}
                                className={cn(
                                  "font-maitree flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-all duration-150",
                                  field.value === opt.value
                                    ? "border-green-500 bg-green-500/10 font-semibold text-green-600"
                                    : "border-green-100 text-green-500 hover:border-green-500/70 hover:text-green-500",
                                )}
                              >
                                <span>{opt.emoji}</span>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Assunto personalizado – aparece dinamicamente quando "Outro" */}
                  <AnimatePresence>
                    {assunto === "Outro" && (
                      <motion.div
                        key="assunto-outro"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <FormField
                          control={form.control}
                          name="assuntoOutro"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-maitree text-sm font-medium text-green-200">
                                Especifique o assunto
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="rounded-sm"
                                  placeholder="Descreva brevemente..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mensagem */}
                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-maitree text-sm font-medium text-green-200">
                          Mensagem
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escreva sua mensagem aqui..."
                            showCharacterCount
                            maxLength={500}
                            className="w-full resize-none break-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.formState.errors.root && (
                    <p className="font-maitree text-sm text-red-500">
                      {form.formState.errors.root.message}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="text"
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="default"
                      disabled={isSubmitting}
                      className="min-w-28"
                    >
                      {isSubmitting ? (
                        <>
                          <SpinnerGapIcon className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-4 py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <CheckCircleIcon className="size-16 text-green-500" weight="fill" />
      </motion.div>
      <div className="space-y-1">
        <p className="font-maitree text-base font-semibold text-green-200">
          Mensagem enviada com sucesso!
        </p>
        <p className="font-maitree text-sm text-green-500">
          Entraremos em contato o mais breve possível.
        </p>
      </div>
      <DialogClose asChild>
        <Button variant="default" size="sm" onClick={onClose}>
          Fechar
        </Button>
      </DialogClose>
    </motion.div>
  );
}
