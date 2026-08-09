"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { toast } from "@/shared/hooks/use-toast";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  usePlaceReportFollowUp,
  useReportPlace,
} from "../api/queries/getDirectoryApiClient";
import type { ReportType } from "../types";
import { TurnstileField } from "./TurnstileField";

const ANONYMOUS_REPORTS_KEY = "vg_directory_report_count";

const REPORT_OPTIONS: {
  value: ReportType;
  label: string;
  description: string;
}[] = [
  {
    value: "closed",
    label: "Local fechou",
    description: "Este estabelecimento não está mais em funcionamento",
  },
  {
    value: "moved",
    label: "Mudou de endereço",
    description: "O local mudou para outro endereço",
  },
  {
    value: "no_longer_vegan",
    label: "Não tem mais opções veganas",
    description: "O local deixou de oferecer opções veganas",
  },
  {
    value: "wrong_info",
    label: "Informação incorreta",
    description: "Há algum dado deste local que precisa ser corrigido",
  },
];

interface ReportModalProps {
  isOpen: boolean;
  placeId: number;
  placeName: string;
  userPosition?: [number, number] | null;
  onClose: () => void;
}

export function ReportModal({
  isOpen,
  placeId,
  placeName,
  userPosition,
  onClose,
}: ReportModalProps) {
  const { data: user } = useGetUser();
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const [followUpToken, setFollowUpToken] = useState<string>();
  const [followUpEmail, setFollowUpEmail] = useState("");
  const [hasFollowUpConsent, setHasFollowUpConsent] = useState(false);
  const [hasFollowedUp, setHasFollowedUp] = useState(false);
  const [anonymousReportsToday, setAnonymousReportsToday] = useState(0);
  const { mutateAsync: reportPlace, isPending: isSubmitting } =
    useReportPlace();
  const { mutateAsync: followUpOnReport, isPending: isFollowingUp } =
    usePlaceReportFollowUp();
  const isAuthenticated = Boolean(user?.id);
  const hasReceivedReport = Boolean(followUpToken);
  const isSubmitDisabled =
    !selectedType || isSubmitting || (!isAuthenticated && !turnstileToken);
  const isFollowUpDisabled =
    !hasFollowedUp &&
    (isFollowingUp ||
      !hasFollowUpConsent ||
      (!isAuthenticated && !followUpEmail.trim()));

  useEffect(() => {
    if (isOpen) setAnonymousReportsToday(getAnonymousReportsToday());
  }, [isOpen]);

  const reset = useCallback(() => {
    setSelectedType(null);
    setDescription("");
    setTurnstileToken(undefined);
    setFollowUpToken(undefined);
    setFollowUpEmail("");
    setHasFollowUpConsent(false);
    setHasFollowedUp(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedType || (!isAuthenticated && !turnstileToken)) return;

    try {
      const receipt = await reportPlace({
        placeId,
        type: selectedType,
        description: description.trim() || undefined,
        latitude: userPosition?.[0],
        longitude: userPosition?.[1],
        turnstileToken,
      });
      setFollowUpToken(receipt.followUpToken);

      if (!isAuthenticated) {
        const nextCount = saveAnonymousReport();
        setAnonymousReportsToday(nextCount);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Não foi possível enviar o relato",
        description: "Tente novamente em instantes.",
      });
    }
  }, [
    description,
    isAuthenticated,
    placeId,
    reportPlace,
    selectedType,
    turnstileToken,
    userPosition,
  ]);

  const handleFollowUp = useCallback(async () => {
    if (!followUpToken || !hasFollowUpConsent) return;
    if (!isAuthenticated && !followUpEmail.trim()) return;

    try {
      await followUpOnReport({
        followUpToken,
        email: isAuthenticated ? undefined : followUpEmail.trim(),
      });
      setHasFollowedUp(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Não foi possível registrar o acompanhamento",
        description: "Tente novamente em instantes.",
      });
    }
  }, [
    followUpEmail,
    followUpOnReport,
    followUpToken,
    hasFollowUpConsent,
    isAuthenticated,
  ]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[1300] bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-4 z-[1400] m-auto flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-green-200 bg-white shadow-2xl"
            role="dialog"
            aria-modal
            aria-label="Informar problema"
          >
            <div className="flex items-center justify-between border-b border-green-100 px-5 py-4">
              <div className="flex items-center gap-2 text-green-700">
                <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden />
                <h2 className="text-base font-semibold">Informar Problema</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-1 text-green-500 transition-colors hover:bg-green-100 hover:text-green-600 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!hasReceivedReport ? (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <p className="mb-1 text-sm text-green-600">
                    Relatar problema sobre:{" "}
                    <strong className="text-green-800">{placeName}</strong>
                  </p>
                  <p className="mb-4 text-xs text-green-500">
                    Selecione o tipo de alteração que deseja sugerir:
                  </p>

                  <div
                    className="flex flex-col gap-2"
                    role="radiogroup"
                    aria-label="Tipo de problema"
                  >
                    {REPORT_OPTIONS.map((option) => {
                      const isSelected = selectedType === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedType(option.value)}
                          className={clsx(
                            "flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all duration-150",
                            "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                            isSelected
                              ? "border-green-500 bg-green-50 shadow-sm"
                              : "border-green-100 bg-white hover:border-green-200 hover:bg-green-50/50",
                          )}
                        >
                          <span
                            className={clsx(
                              "text-sm font-medium",
                              isSelected ? "text-green-800" : "text-green-500",
                            )}
                          >
                            {option.label}
                          </span>
                          <span className="text-xs font-medium text-green-500">
                            {option.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedType && (
                    <>
                      <label
                        htmlFor="report-description"
                        className="mt-4 mb-1.5 block text-xs font-medium text-green-600"
                      >
                        Observações <span className="italic">(opcional)</span>
                      </label>
                      <textarea
                        id="report-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Conte mais detalhes sobre o problema..."
                        rows={3}
                        maxLength={500}
                        className="w-full resize-none rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800! placeholder:text-green-800 placeholder:opacity-80 focus:ring-0! focus:outline-none!"
                      />
                    </>
                  )}

                  {!isAuthenticated && (
                    <div className="mt-4">
                      <TurnstileField
                        mode={
                          anonymousReportsToday > 0 ? "visible" : "invisible"
                        }
                        onToken={setTurnstileToken}
                      />
                      <p className="mt-3 text-xs leading-relaxed text-green-600">
                        Usamos um cookie necessário para prevenir fraude neste
                        formulário.{" "}
                        <Link
                          href="/privacy"
                          target="_blank"
                          className="font-medium underline underline-offset-2"
                        >
                          Saiba como tratamos esses dados.
                        </Link>
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-green-100 px-5 py-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      isSubmitDisabled
                        ? "cursor-not-allowed bg-green-200 text-white"
                        : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
                    )}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar relato"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col px-5 py-8">
                <div className="flex flex-col items-center gap-3 text-center">
                  <CheckCircle
                    className="h-14 w-14 text-green-500"
                    aria-hidden
                  />
                  <p className="text-lg font-semibold text-green-800">
                    Relato recebido. Nossa equipe vai verificar.
                  </p>
                </div>

                {hasFollowedUp ? (
                  <p className="mt-8 text-center text-sm leading-relaxed text-green-700">
                    {isAuthenticated
                      ? "Vamos avisar você nas notificações quando houver uma atualização."
                      : "Vamos avisar você por email quando houver uma atualização."}
                  </p>
                ) : (
                  <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-4">
                    <h3 className="text-sm font-semibold text-green-800">
                      Quer saber no que deu?
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-green-700">
                      {isAuthenticated
                        ? "A gente te avisa nas notificações quando verificarmos este lugar."
                        : "A gente te avisa por email quando verificarmos este lugar."}
                    </p>

                    {!isAuthenticated && (
                      <label
                        htmlFor="report-follow-up-email"
                        className="mt-4 block text-xs font-medium text-green-700"
                      >
                        Seu email
                        <input
                          id="report-follow-up-email"
                          type="email"
                          value={followUpEmail}
                          onChange={(event) =>
                            setFollowUpEmail(event.target.value)
                          }
                          className="mt-1.5 w-full rounded-lg! border border-green-200 bg-white px-3 py-2 text-sm text-green-800 focus-visible:ring-0! focus-visible:outline-none"
                        />
                      </label>
                    )}

                    <label className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-green-700">
                      <input
                        type="checkbox"
                        checked={hasFollowUpConsent}
                        onChange={(event) =>
                          setHasFollowUpConsent(event.target.checked)
                        }
                        className="accent-accent mt-0.5 size-4 rounded border-green-200 text-green-600 focus:ring-green-500"
                      />
                      Concordo em receber este único acompanhamento sobre este
                      relato.
                    </label>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-end gap-2 pt-6">
                  {!hasFollowedUp && (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                    >
                      Não, obrigado
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={hasFollowedUp ? handleClose : handleFollowUp}
                    disabled={isFollowUpDisabled}
                    className={clsx(
                      "rounded-xl px-5 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      isFollowUpDisabled
                        ? "cursor-not-allowed bg-green-200 text-white"
                        : "bg-green-600 text-white hover:bg-green-700",
                    )}
                  >
                    {hasFollowedUp
                      ? "Fechar"
                      : isFollowingUp
                        ? "Salvando..."
                        : "Me avisar"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getAnonymousReportsToday() {
  if (typeof window === "undefined") return 0;
  const today = new Date().toISOString().slice(0, 10);
  try {
    const value = JSON.parse(
      window.localStorage.getItem(ANONYMOUS_REPORTS_KEY) ?? "{}",
    ) as { date?: string; count?: number };
    return value.date === today ? (value.count ?? 0) : 0;
  } catch {
    return 0;
  }
}

function saveAnonymousReport() {
  if (typeof window === "undefined") return 0;
  const count = getAnonymousReportsToday() + 1;
  const today = new Date().toISOString().slice(0, 10);
  window.localStorage.setItem(
    ANONYMOUS_REPORTS_KEY,
    JSON.stringify({ date: today, count }),
  );
  return count;
}
