"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, X } from "lucide-react";
import { isAxiosError } from "axios";
import { useSignin } from "@/features/auth/api/queries/getAuthApiClient";

interface QuickLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export function QuickLoginModal({
  isOpen,
  onClose,
  onAuthenticated,
}: QuickLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: signin, isPending } = useSignin();

  if (!isOpen) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await signin({ email: email.trim(), password });
      onAuthenticated();
    } catch (cause) {
      setError(
        isAxiosError(cause)
          ? "E-mail ou senha incorretos."
          : "Não foi possível entrar agora. Tente novamente.",
      );
    }
  };

  return (
    <div
      className="bg-black-100/45 fixed inset-0 z-[1700] flex items-end p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-5"
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
          <div>
            <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-green-100 text-green-500">
              <KeyRound className="size-5" />
            </span>
            <h2
              id="quick-login-title"
              className="font-lora text-black-100 text-2xl font-bold italic"
            >
              Entre para contribuir
            </h2>
            <p className="font-maitree mt-2 text-sm leading-relaxed text-green-500">
              Seus dados continuam aqui. Entre e continue sem sair do mapa.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar login"
            className="rounded-full p-2 text-green-200 transition hover:bg-green-100 hover:text-green-500"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-6 space-y-4">
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Sua senha"
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
            <p className="rounded-xl bg-green-100 px-3 py-2 text-sm font-medium text-green-500">
              {error}
            </p>
          )}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-3 text-sm font-bold text-green-500 hover:bg-green-100"
          >
            Voltar ao formulário
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-200 disabled:cursor-not-allowed disabled:bg-green-100 disabled:text-green-200"
          >
            {isPending ? "Entrando..." : "Entrar e continuar"}
          </button>
        </div>
      </form>
    </div>
  );
}
