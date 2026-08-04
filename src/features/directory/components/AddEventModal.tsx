"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarDays, CheckCircle } from "lucide-react";
import { toast } from "@/shared/hooks/use-toast";
import {
  useCreateEvent,
  useUpdateEvent,
} from "../api/queries/getDirectoryApiClient";
import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { isAxiosError } from "axios";
import { QuickLoginModal } from "./QuickLoginModal";
import type { DirectoryEvent } from "../types";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: DirectoryEvent | null;
}

export function AddEventModal({ isOpen, onClose, event }: AddEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { mutateAsync: createEvent, isPending: isSubmitting } =
    useCreateEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const isEditing = Boolean(event);

  useEffect(() => {
    if (!isOpen) return;
    setTitle(event?.title ?? "");
    setDate(event?.date.slice(0, 10) ?? "");
    setLocation(event?.location ?? "");
    setDescription(event?.description ?? "");
    setLink(event?.link ?? "");
    setIsSuccess(false);
  }, [event, isOpen]);

  const reset = useCallback(() => {
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
    setLink("");
    setIsSuccess(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !date || !location.trim()) return;
      if (!getAccessToken()) {
        setIsLoginOpen(true);
        return;
      }

      try {
        const payload = {
          title: title.trim(),
          date: new Date(date).toISOString(),
          location: location.trim(),
          description: description.trim() || undefined,
          link: link.trim() || undefined,
        };
        if (event) {
          await updateEvent({ eventId: event.id, payload });
        } else {
          await createEvent(payload);
        }
      } catch (error) {
        const isUnauthorized =
          isAxiosError(error) && error.response?.status === 401;
        if (isUnauthorized) {
          setIsLoginOpen(true);
        } else {
          toast({
            variant: "destructive",
            title: `Não foi possível ${isEditing ? "editar" : "adicionar"} o evento`,
            description: "Tente novamente em instantes.",
          });
        }
        return;
      }

      setIsSuccess(true);

      toast({
        variant: "success",
        title: isEditing ? "Evento atualizado!" : "Evento adicionado!",
        description: isEditing
          ? "As alterações já aparecem na lista."
          : "Seu evento já aparece na lista.",
      });

      setTimeout(() => {
        reset();
        onClose();
      }, 1800);
    },
    [
      title,
      date,
      location,
      description,
      link,
      event,
      isEditing,
      createEvent,
      updateEvent,
      reset,
      onClose,
    ],
  );

  const isFormValid = title.trim() && date && location.trim();

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
            onClick={onClose}
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
            aria-label="Adicionar evento"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-green-100 px-5 py-4">
              <div className="flex items-center gap-2 text-green-700">
                <CalendarDays className="h-5 w-5 text-green-500" aria-hidden />
                <h2 className="text-base font-semibold">
                  {isEditing ? "Editar Evento" : "Adicionar Evento"}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-green-400 transition-colors hover:bg-green-100 hover:text-green-600 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

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
                  Evento adicionado!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-title"
                        className="text-xs font-medium text-green-700"
                      >
                        Título <span className="ml-0.5 text-green-400">*</span>
                      </label>
                      <input
                        id="event-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Feira Vegana de São Paulo"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-date"
                        className="text-xs font-medium text-green-700"
                      >
                        Data <span className="ml-0.5 text-green-400">*</span>
                      </label>
                      <input
                        id="event-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-location"
                        className="text-xs font-medium text-green-700"
                      >
                        Local <span className="ml-0.5 text-green-400">*</span>
                      </label>
                      <input
                        id="event-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ex: Parque Ibirapuera, São Paulo - SP"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-description"
                        className="text-xs font-medium text-green-700"
                      >
                        Descrição
                      </label>
                      <textarea
                        id="event-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva o evento..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-link"
                        className="text-xs font-medium text-green-700"
                      >
                        Link
                      </label>
                      <input
                        id="event-link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-green-100 px-5 py-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting || isUpdating}
                    className={[
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      !isFormValid || isSubmitting || isUpdating
                        ? "cursor-not-allowed border border-green-200 bg-green-100 text-green-200"
                        : "active:bg-black-100 bg-green-500 text-white hover:bg-green-200",
                    ].join(" ")}
                  >
                    {isSubmitting || isUpdating ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Salvando...
                      </>
                    ) : isEditing ? (
                      "Salvar alterações"
                    ) : (
                      "Adicionar Evento"
                    )}
                  </button>
                </div>
              </form>
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
                  "Seu formulário foi mantido. Agora você pode publicar o evento.",
              });
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
