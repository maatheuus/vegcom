"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { useState, useTransition } from "react";

import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";

import {
  useDeleteAccount,
  useUpdatePassword,
} from "@/features/account/hooks/mutations/useUpdateProfile";
import {
  useGetUser,
  useLogout,
} from "@/features/auth/api/queries/getAuthApiClient";
import { updatePasswordFormSchema } from "@/features/auth/utils";
import Button from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, WarningIcon } from "@phosphor-icons/react";
import {
  FloppyDiskIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import type { z } from "zod";

function canUpdatePassword(passwordUpdatedAt?: string): {
  allowed: boolean;
  hoursLeft: number;
} {
  if (!passwordUpdatedAt) return { allowed: true, hoursLeft: 0 };

  const last = new Date(passwordUpdatedAt).getTime();
  const now = Date.now();
  const diffHours = (now - last) / (1000 * 60 * 60);

  if (diffHours >= 24) return { allowed: true, hoursLeft: 0 };

  return { allowed: false, hoursLeft: Math.ceil(24 - diffHours) };
}

export default function Page() {
  const [, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteStep, setDeleteStep] = useState<"idle" | "confirm" | "password">(
    "idle",
  );
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState("");
  const { data: user } = useGetUser();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword();
  const { mutateAsync: deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccount();

  const { allowed: canChange, hoursLeft } = canUpdatePassword(
    user?.passwordUpdatedAt,
  );

  const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePasswordFormSchema>) => {
    if (!canChange) return;
    if (Object.keys(form.formState.errors).length > 0) return;

    try {
      await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      onCancel();
      startTransition(async () => {
        await logout();
        window.location.href = "/login";
      });
    } catch (error: unknown) {
      console.log("password error", error);

      const err = error as {
        code: string;
        message: string;
        status: number;
        statusCode: number;
        error: string;
      };

      if (err.code === "INVALID_CURRENT_PASSWORD") {
        form.setError("currentPassword", {
          type: "manual",
          message: "Senha atual inválida",
        });
      }

      if (err.message === "Access token not found") {
        form.setError("currentPassword", {
          type: "manual",
          message: "Sessão expirada, faça login novamente",
        });
        startTransition(async () => {
          await logout();
          window.location.href = "/login";
        });
      }

      if (err.code === "PASSWORD_MISMATCH") {
        form.setError("confirmPassword", {
          type: "manual",
          message: "As senhas não coincidem",
        });
      }
    }
  };

  const onCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    setDeletePasswordError("");
    try {
      await deleteAccount(deletePassword);
      startTransition(async () => {
        await logout();
        window.location.href = "/";
      });
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === "INVALID_PASSWORD") {
        setDeletePasswordError("Senha incorreta. Tenta de novo, vai.");
      } else {
        setDeletePasswordError("Algo deu errado. Tenta mais tarde.");
      }
    }
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
            disabled={isUpdatingPassword}
            className={clsx(
              "font-maitree cursor-pointer border-none bg-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:bg-transparent",
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
            disabled={isUpdatingPassword || !canChange}
            onClick={() =>
              isEditing
                ? form.handleSubmit(onSubmit)()
                : setIsEditing(!isEditing)
            }
            className="font-maitree cursor-pointer bg-green-200 py-1 disabled:cursor-not-allowed disabled:bg-green-200"
          >
            {isEditing ? "Salvar Perfil" : "Editar Perfil"}
          </Button.Icon>
        </Row>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 gap-6 rounded-xl border p-4",
          canChange
            ? "border-green-200 bg-green-50"
            : "border-amber-200 bg-amber-50/50",
        )}
      >
        <div className="flex items-center gap-2">
          <InfoIcon
            size={16}
            weight="fill"
            className={clsx(
              "mt-0.5 shrink-0",
              canChange ? "text-green-500" : "text-amber-500",
            )}
          />
          <p
            className={clsx(
              "font-maitree text-xs",
              canChange ? "text-green-500" : "text-amber-600",
            )}
          >
            {canChange
              ? "A senha só pode ser alterada uma vez por dia."
              : `Você já alterou sua senha recentemente. Aguarde ${hoursLeft}h para alterar novamente.`}
          </p>
        </div>

        <Form {...form}>
          <div className="flex w-full flex-col gap-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-maitree text-base font-semibold text-green-500">
                    Senha atual
                  </FormLabel>
                  <FormControl className="rounded-lg">
                    <Input
                      type="password"
                      placeholder="Digite sua senha atual"
                      disabled={!isEditing || !canChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full items-start gap-x-4">
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
                          disabled={!isEditing || !canChange}
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
                          disabled={!isEditing || !canChange}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
            <WarningIcon size={16} weight="fill" className="text-red-500" />
          </div>
          <div className="flex-1">
            <p className="font-lora text-sm font-semibold text-red-700">
              Deletar conta
            </p>
            <p className="font-maitree mt-0.5 text-xs text-red-400">
              Essa ação é permanente e não pode ser desfeita. Todos os seus
              dados serão removidos.
            </p>
          </div>
        </div>

        <div className="mt-4">
          {deleteStep === "idle" && (
            <div className="flex justify-end">
              <Button
                variant="text"
                size="default"
                onClick={() => setDeleteStep("confirm")}
                className="font-maitree cursor-pointer border border-red-200 bg-transparent text-red-500 transition-all duration-300 hover:border-red-300 hover:bg-red-100 hover:text-red-600"
              >
                Deletar conta
              </Button>
            </div>
          )}

          {deleteStep === "confirm" && (
            <div className="space-y-3">
              <div className="rounded-lg border border-red-200 bg-red-100/50 p-3">
                <p className="font-lora text-sm font-semibold text-red-700">
                  Espera, vai mesmo?
                </p>
                <p className="font-maitree mt-1 text-xs text-red-500">
                  Suas receitas, comentários e toda sua jornada vegana somem
                  para sempre. As cenouras vão sentir falta.
                </p>
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <Button
                  variant="text"
                  size="default"
                  onClick={() => setDeleteStep("idle")}
                  className="font-maitree cursor-pointer border border-red-200 bg-transparent text-red-400 transition-all duration-300 hover:bg-red-100"
                >
                  Vou ficar!
                </Button>
                <Button
                  variant="text"
                  size="default"
                  onClick={() => setDeleteStep("password")}
                  className="font-maitree cursor-pointer bg-red-500 text-white transition-all duration-300 hover:bg-red-600"
                >
                  Quero deletar mesmo
                </Button>
              </div>
            </div>
          )}

          {deleteStep === "password" && (
            <div className="space-y-3">
              <div className="rounded-lg border border-red-200 bg-red-100/50 p-3">
                <p className="font-lora text-sm font-semibold text-red-700">
                  Última chance de reconsiderar...
                </p>
                <p className="font-maitree mt-1 text-xs text-red-500">
                  Confirme sua senha para continuar. Sim, é de propósito — é
                  chato mesmo.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  name="delete-account"
                  type="password"
                  placeholder="Digite sua senha"
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setDeletePasswordError("");
                  }}
                  disabled={isDeletingAccount}
                  className="rounded-md border-red-200 focus-visible:ring-red-300"
                />
                {deletePasswordError && (
                  <p className="font-maitree text-xs text-red-500">
                    {deletePasswordError}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <Button
                  variant="text"
                  size="default"
                  disabled={isDeletingAccount}
                  onClick={() => {
                    setDeleteStep("idle");
                    setDeletePassword("");
                    setDeletePasswordError("");
                  }}
                  className="font-maitree cursor-pointer border border-red-200 bg-transparent text-red-400 transition-all duration-300 hover:bg-red-100 disabled:cursor-not-allowed"
                >
                  Cancelar
                </Button>
                <Button
                  variant="text"
                  size="default"
                  disabled={!deletePassword || isDeletingAccount}
                  onClick={handleDeleteAccount}
                  className="font-maitree cursor-pointer bg-red-500 text-white transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeletingAccount ? "Deletando..." : "Confirmar exclusão"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}
