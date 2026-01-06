"use client";

import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { useGetUser } from "@/features/account/api/queries/getAuthApiClient";
import Button from "@/shared/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/Form";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { Switch } from "@/shared/ui/Switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloppyDiskIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const notificationSettingsSchema = z.object({
  recipeLike: z.boolean().default(true),
  commentReply: z.boolean().default(true),
  commentLike: z.boolean().default(true),
  marketing: z.boolean().default(false),
});

type NotificationSettingsForm = z.infer<typeof notificationSettingsSchema>;

export default function NotificationSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: _user } = useGetUser();

  // In a real app, these default values would come from user.emailPreferences
  const form = useForm<NotificationSettingsForm>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      recipeLike: true,
      commentReply: true,
      commentLike: true,
      marketing: false,
    },
  });

  const onSubmit = (values: NotificationSettingsForm) => {
    console.log("Saving notification settings:", values);
    // Here we would call the API to update preferences
    setIsEditing(false);
  };

  const onCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <AccountLayout>
      <div className="flex items-center justify-between">
        <Header
          title="Notificações"
          subTitle="Gerencie quais emails você deseja receber"
        />

        <Row className="gap-x-2">
          <Button
            variant="text"
            size="default"
            onClick={onCancel}
            aria-hidden={!isEditing}
            className={clsx(
              "font-maitree cursor-pointer border-none bg-transparent transition-all duration-300",
              isEditing
                ? "visible z-10 translate-x-0 opacity-100"
                : "pointer-events-none invisible z-0 translate-x-24 opacity-0",
            )}
          >
            Cancelar
          </Button>
          <Button.Icon
            leftIcon={
              isEditing ? (
                <FloppyDiskIcon className="!size-4" />
              ) : (
                <PencilSimpleIcon className="!size-4" />
              )
            }
            variant="filled"
            size="default"
            onClick={() =>
              isEditing ? form.handleSubmit(onSubmit)() : setIsEditing(true)
            }
            className="font-maitree cursor-pointer bg-green-500 py-2"
          >
            {isEditing ? "Salvar Preferências" : "Editar Preferências"}
          </Button.Icon>
        </Row>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-lora text-lg font-bold text-green-500 italic">
                Interações
              </h3>

              <FormField
                control={form.control}
                name="commentReply"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-green-100 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="font-maitree text-base text-green-800">
                        Respostas em comentários
                      </FormLabel>
                      <p className="font-maitree text-sm text-green-600/70">
                        Receba um email quando alguém responder ao seu
                        comentário.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commentLike"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-green-100 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="font-maitree text-base text-green-800">
                        Curtidas em comentários
                      </FormLabel>
                      <p className="font-maitree text-sm text-green-600/70">
                        Receba um email quando alguém curtir seu comentário.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipeLike"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-green-100 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="font-maitree text-base text-green-800">
                        Curtidas em Receitas/Posts
                      </FormLabel>
                      <p className="font-maitree text-sm text-green-600/70">
                        Receba um email quando alguém curtir suas publicações.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-lora text-lg font-bold text-green-500 italic">
                Outros
              </h3>

              <FormField
                control={form.control}
                name="marketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-green-100 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="font-maitree text-base text-green-800">
                        Marketing e Novidades
                      </FormLabel>
                      <p className="font-maitree text-sm text-green-600/70">
                        Receba novidades sobre o VegCom e receitas em destaque.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </AccountLayout>
  );
}
