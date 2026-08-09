"use client";

import { toast } from "@/shared/hooks/use-toast";
import { isAxiosError } from "axios";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useReportPlace } from "../api/queries/getDirectoryApiClient";
import type { ReportType } from "../types";
import { QuickLoginModal } from "./QuickLoginModal";

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
    value: "wrong_info",
    label: "Apenas delivery agora",
    description: "Não atende mais presencialmente, só delivery",
  },
  {
    value: "price_change",
    label: "Não tem mais opções veganas",
    description: "O local deixou de oferecer opções veganas/vegetarianas",
  },
  {
    value: "other",
    label: "Outro",
    description: "Descreva o problema abaixo",
  },
];

interface ReportModalProps {
  isOpen: boolean;
  placeId: number;
  placeName: string;
  onClose: () => void;
}

export function ReportModal({
  isOpen,
  placeId,
  placeName,
  onClose,
}: ReportModalProps) {
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { mutateAsync: reportPlace, isPending: isSubmitting } =
    useReportPlace();

  const reset = useCallback(() => {
    setSelectedType(null);
    setDescription("");
    setIsSuccess(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedType) return;

    try {
      await reportPlace({
        placeId,
        type: selectedType,
        description: description || undefined,
      });
    } catch (error) {
      const status = isAxiosError(error)
        ? error.response?.status
        : typeof error === "object" && error !== null && "status" in error
          ? (error as { status?: number }).status
          : undefined;

      if (status === 401) {
        setIsLoginOpen(true);
        return;
      }

      toast({
        variant: "destructive",
        title: "Não foi possível enviar o relato",
        description: "Tente novamente em instantes.",
      });
      return;
    }

    setIsSuccess(true);

    toast({
      variant: "success",
      title: "Relato enviado!",
      description:
        "Obrigado por contribuir com a comunidade. Sua sugestão será analisada.",
    });

    setTimeout(() => {
      reset();
      onClose();
    }, 1800);
  }, [selectedType, description, placeId, reportPlace, reset, onClose]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

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
            {/* Header */}
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

            {/* Success state */}
            {isSuccess ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  <CheckCircle
                    className="h-16 w-16 text-green-500"
                    aria-hidden
                  />
                </motion.div>
                <p className="text-center text-lg font-semibold text-green-800">
                  Relato enviado com sucesso!
                </p>
                <p className="text-center text-sm text-green-600">
                  Obrigado por ajudar a manter a comunidade atualizada.
                </p>
              </div>
            ) : (
              <>
                {/* Body */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <p className="mb-1 text-sm text-green-600">
                    Relatar problema sobre:{" "}
                    <strong className="text-green-800">{placeName}</strong>
                  </p>
                  <p className="mb-4 text-xs text-green-200">
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
                          <span className="text-xs font-medium text-green-200">
                            {option.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <label
                          htmlFor="report-description"
                          className="mt-4 mb-1.5 block text-xs font-medium text-green-600"
                        >
                          Observações <span className="italic">(opcional)</span>
                        </label>
                        <textarea
                          id="report-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Conte mais detalhes sobre o problema..."
                          rows={3}
                          className="w-full resize-none rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-800 placeholder:opacity-80 focus:ring-0! focus:outline-none!"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
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
                    disabled={!selectedType || isSubmitting}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      !selectedType || isSubmitting
                        ? "cursor-not-allowed bg-green-200 text-white"
                        : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Relato"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
          <QuickLoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onAuthenticated={() => {
              setIsLoginOpen(false);
              toast({
                variant: "success",
                title: "Login realizado!",
                description:
                  "Seu relato foi mantido. Agora você pode enviá-lo.",
              });
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
