"use client";

import {
  useSignin,
  useSignup,
} from "@/features/auth/api/queries/getAuthApiClient";
import { isAxiosError } from "axios";
import clsx from "clsx";
import { Eye, EyeOff, KeyRound, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

type Mode = "signin" | "signup";

interface QuickLoginModalProps {
  isOpen: boolean;
  className?: string;
  description?: string;
  onClose: () => void;
  onAuthenticated: () => void;
}

export function QuickLoginModal({
  isOpen,
  className,
  description = "Seus dados continuam aqui. Entre e continue sem sair do mapa.",
  onClose,
  onAuthenticated,
}: QuickLoginModalProps) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: signin, isPending: isSigningIn } = useSignin();
  const { mutateAsync: signup, isPending: isSigningUp } = useSignup();
  const isPending = isSigningIn || isSigningUp;
  const isSignup = mode === "signup";

  if (!isOpen || typeof document === "undefined") return null;

  const handleClose = () => {
    setMode("signin");
    setError(null);
    onClose();
  };

  const switchMode = () => {
    setMode((currentMode) => (currentMode === "signin" ? "signup" : "signin"));
    setError(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      if (isSignup) {
        await signup({ name: name.trim(), email: email.trim(), password });
      }

      await signin({ email: email.trim(), password });
      onAuthenticated();
    } catch (cause) {
      const errorCode = isAxiosError(cause)
        ? (cause.response?.data as { code?: string } | undefined)?.code
        : undefined;

      setError(
        errorCode === "USER_ALREADY_EXISTS"
          ? "Este e-mail já está cadastrado. Faça login para continuar."
          : isSignup
            ? "Não foi possível criar sua conta. Tente novamente."
            : "E-mail ou senha incorretos.",
      );
    }
  };

  return createPortal(
    <div
      className={clsx(
        "bg-black-100/45 fixed inset-0 z-[1700] flex items-end p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-5",
        className,
      )}
      role="presentation"
    >
      <form
        onSubmit={submit}
        className="w-full rounded-t-[2rem] border border-green-200 bg-white px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_24px_70px_rgba(27,78,48,0.3)] sm:max-w-md sm:rounded-[2rem] sm:p-7"
        role="dialog"
        aria-modal
        aria-labelledby="quick-login-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
                {isSignup ? (
                  <UserPlus className="size-5" />
                ) : (
                  <KeyRound className="size-5" />
                )}
              </span>
              <h2
                id="quick-login-title"
                className="font-lora text-black-100 text-2xl font-bold italic"
              >
                {isSignup ? "Crie sua conta" : "Entre para contribuir"}
              </h2>
            </div>
            <p className="font-maitree mt-3 text-sm leading-relaxed text-green-500">
              {isSignup
                ? "Leva só alguns segundos. Você completa seu perfil depois."
                : description}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar login"
            className="rounded-full p-2 text-green-200 transition hover:bg-green-100 hover:text-green-500"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {isSignup && (
            <label className="block text-sm font-bold text-green-500">
              Nome
              <input
                required
                minLength={4}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                className="text-black-100 mt-1.5 w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 transition outline-none placeholder:text-green-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </label>
          )}
          <label className="block text-sm font-bold text-green-500">
            E-mail
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="voce@exemplo.com"
              className="text-black-100 mt-1.5 w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 transition outline-none placeholder:text-green-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
          </label>
          <label className="block text-sm font-bold text-green-500">
            Senha
            <div className="relative mt-1.5">
              <input
                required
                minLength={isSignup ? 8 : undefined}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder={isSignup ? "Mínimo de 8 caracteres" : "Sua senha"}
                className="text-black-100 w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 pr-12 transition outline-none placeholder:text-green-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-2 text-green-200 hover:bg-green-100 hover:text-green-500"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </label>
          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={switchMode}
            className="rounded-full px-5 py-3 text-sm font-bold text-green-500 hover:bg-green-100"
          >
            {isSignup ? "Já tenho uma conta" : "Criar uma conta"}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-200 disabled:cursor-not-allowed disabled:bg-green-100 disabled:text-green-200"
          >
            {isPending
              ? isSignup
                ? "Criando..."
                : "Entrando..."
              : isSignup
                ? "Criar conta e continuar"
                : "Entrar e continuar"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
