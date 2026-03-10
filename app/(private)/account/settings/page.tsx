"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";

import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { personalInfoFormSchema } from "@/features/account/components/utils";
import Button from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FloppyDiskIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof personalInfoFormSchema>) => {
    if (form.formState.errors) return;
    console.log("Salvo com sucesso:", values);
    setIsEditing(false);
  };

  const onCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    console.log("Conta deletada permanentemente.");
    setConfirmDelete(false);
  };

  return (
    <AccountLayout>
      <div className="flex items-center justify-between">
        <Header title="Configuração" subTitle="Gerencie sua senha e conta" />

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
              isEditing ? onSubmit(form.getValues()) : setIsEditing(!isEditing)
            }
            className="font-maitree cursor-pointer bg-green-200 py-2"
          >
            {isEditing ? "Salvar Perfil" : "Editar Perfil"}
          </Button.Icon>
        </Row>
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-xl border border-green-200 bg-green-50 p-4">
        <Form {...form}>
          <div className="flex w-full items-start justify-center gap-x-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-maitree text-base font-semibold text-green-500">
                      Nova senha
                    </FormLabel>
                    <FormControl className="rounded-lg">
                      <Input
                        type="password"
                        placeholder="Digite a nova senha"
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-maitree text-base font-semibold text-green-500">
                      Confirmar nova senha
                    </FormLabel>
                    <FormControl className="rounded-lg">
                      <Input
                        type="password"
                        placeholder="Digite novamente a nova senha"
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <Header
          title="Deletar conta"
          subTitle="Essa ação é permanente e não pode ser desfeita"
        />

        <div className="mt-4 flex items-center justify-between">
          <p className="font-maitree text-sm text-red-600">
            Ao deletar sua conta, todos os seus dados serão removidos.
          </p>

          {!confirmDelete ? (
            <Button
              variant="text"
              size="default"
              onClick={() => setConfirmDelete(true)}
              className={clsx(
                "font-maitree cursor-pointer bg-red-500 text-green-50 transition-all duration-300 hover:bg-red-600 hover:text-green-50",
              )}
            >
              Deletar conta
            </Button>
          ) : (
            <div className="flex gap-x-2">
              <Button
                variant="text"
                size="default"
                onClick={handleDeleteAccount}
                className="font-maitree cursor-pointer bg-red-700 text-green-50 transition-all duration-300 hover:bg-red-800"
              >
                Confirmar exclusão
              </Button>

              <Button
                variant="text"
                size="default"
                onClick={() => setConfirmDelete(false)}
                className="font-maitree cursor-pointer border border-red-300 bg-transparent text-red-600 transition-all duration-300 hover:bg-red-100"
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}
