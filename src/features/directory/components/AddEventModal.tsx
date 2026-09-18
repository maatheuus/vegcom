"use client";

import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { toast } from "@/shared/hooks/use-toast";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { SearchCityLocation } from "@/shared/ui/SearchCityLocation";
import { isAxiosError } from "axios";
import clsx from "clsx";
import { format, isBefore, parseISO, startOfTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  useCreateEvent,
  useUpdateEvent,
} from "../api/queries/getDirectoryApiClient";
import { geocode } from "../hooks/geocode";
import type { DirectoryEvent } from "../types";
import { QuickLoginModal } from "./QuickLoginModal";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: DirectoryEvent | null;
}

async function geocodeEventLocation(street: string, city: string) {
  const exactLocation = await geocode(`${street}, ${city}`);
  if (exactLocation) return { ...exactLocation, isApproximate: false };

  const cityLocation = await geocode(city);
  return cityLocation ? { ...cityLocation, isApproximate: true } : null;
}

export function AddEventModal({ isOpen, onClose, event }: AddEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { mutateAsync: createEvent, isPending: isSubmitting } =
    useCreateEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const isEditing = Boolean(event);
  const minimumEventDate = startOfTomorrow();
  const selectedDate = date ? parseISO(date) : undefined;

  useEffect(() => {
    if (!isOpen) return;
    setTitle(event?.title ?? "");
    setDate(event?.date.slice(0, 10) ?? "");
    setStreet(event?.street ?? event?.location ?? "");
    setCity(event?.city ?? "");
    setDescription(event?.description ?? "");
    setLink(event?.link ?? "");
    setIsSuccess(false);
    setIsDatePickerOpen(false);
  }, [event, isOpen]);

  const reset = useCallback(() => {
    setTitle("");
    setDate("");
    setStreet("");
    setCity("");
    setDescription("");
    setLink("");
    setIsSuccess(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !date || !street.trim() || !city.trim()) return;
      if (!isEditing && isBefore(parseISO(date), minimumEventDate)) {
        toast({
          variant: "destructive",
          title: "Escolha uma data futura",
          description:
            "Novos eventos só podem ser adicionados a partir de amanhã.",
        });
        return;
      }
      if (!getAccessToken()) {
        setIsLoginOpen(true);
        return;
      }

      let isApproximateLocation = false;

      try {
        setIsGeocoding(true);
        const hasCurrentCoordinates =
          event?.street === street.trim() &&
          event.city === city.trim() &&
          event.lat !== undefined &&
          event.lng !== undefined;

        const coordinates = hasCurrentCoordinates
          ? { lat: event.lat!, lng: event.lng!, isApproximate: false }
          : await geocodeEventLocation(street.trim(), city.trim());

        if (!coordinates) {
          toast({
            variant: "destructive",
            title: "Não foi possível localizar o endereço",
            description: "Não encontramos nem a cidade informada.",
          });
          return;
        }
        isApproximateLocation = coordinates.isApproximate;
        const { lat, lng } = coordinates;

        const payload = {
          title: title.trim(),
          date: new Date(date).toISOString(),
          location: `${street.trim()}, ${city.trim()}`,
          street: street.trim(),
          city: city.trim(),
          lat,
          lng,
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
      } finally {
        setIsGeocoding(false);
      }

      setIsSuccess(true);

      toast({
        variant: "success",
        title: isEditing ? "Evento atualizado!" : "Evento adicionado!",
        description: isEditing
          ? "As alterações já aparecem na lista."
          : isApproximateLocation
            ? "Não encontramos a rua; o pin aparece no centro da cidade."
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
      street,
      city,
      description,
      link,
      event,
      isEditing,
      minimumEventDate,
      createEvent,
      updateEvent,
      reset,
      onClose,
    ],
  );

  const isFormValid = title.trim() && date && street.trim() && city.trim();

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
            className="fixed inset-4 z-[1400] m-auto flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-green-200 bg-white shadow-2xl sm:max-h-[90vh]"
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
                className="rounded-full p-1 text-green-200 transition-colors hover:bg-green-100 hover:text-green-600 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
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
              <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col overflow-hidden"
              >
                <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-3 py-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-title"
                        className="text-xs font-medium text-green-700"
                      >
                        Título <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <input
                        id="event-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Feira Vegana de São Paulo"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Use um nome que ajude a identificar o encontro no mapa.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-date"
                        className="text-xs font-medium text-green-700"
                      >
                        Data <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <Popover
                        open={isDatePickerOpen}
                        onOpenChange={setIsDatePickerOpen}
                      >
                        <PopoverTrigger asChild>
                          <button
                            id="event-date"
                            type="button"
                            className="flex w-full items-center justify-between rounded-xl border border-green-200 bg-white px-3 py-2.5 text-left text-sm text-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                          >
                            <span
                              className={clsx(
                                !selectedDate && "text-green-700",
                              )}
                            >
                              {selectedDate
                                ? format(selectedDate, "dd/MM/yyyy")
                                : "Selecione a data"}
                            </span>
                            <CalendarDays
                              className="size-4 text-green-600"
                              aria-hidden
                            />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          sideOffset={8}
                          className="z-[1500] w-auto rounded-xl border border-green-100 bg-white p-0 shadow-xl"
                        >
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(nextDate) => {
                              if (!nextDate) return;
                              setDate(format(nextDate, "yyyy-MM-dd"));
                              setIsDatePickerOpen(false);
                            }}
                            defaultMonth={selectedDate ?? minimumEventDate}
                            startMonth={minimumEventDate}
                            disabled={{ before: minimumEventDate }}
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs leading-relaxed text-green-200">
                        Escolha uma data a partir de amanhã.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="event-street"
                        className="text-xs font-medium text-green-700"
                      >
                        Rua / endereço{" "}
                        <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <input
                        id="event-street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Ex: Av. Paulista, 1000"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Informe o endereço mais completo que tiver para melhorar
                        a posição do pin.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-green-700">
                        Cidade <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <SearchCityLocation
                        value={city}
                        onChange={setCity}
                        onSelect={(selectedCity) =>
                          setCity(selectedCity.displayName)
                        }
                        placeholder="Busque a cidade"
                        className="rounded-xl border-green-200 px-3 py-2.5 text-sm text-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Se a rua não estiver no mapa, o evento será marcado no
                        centro da cidade.
                      </p>
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
                      <p className="text-xs leading-relaxed text-green-200">
                        Conte o essencial: proposta, público e o que esperar do
                        evento.
                      </p>
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
                      <p className="text-xs leading-relaxed text-green-200">
                        Use o link oficial para inscrições, programação ou mais
                        detalhes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-end gap-2 border-t border-green-100 px-5 py-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !isFormValid || isSubmitting || isUpdating || isGeocoding
                    }
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      !isFormValid || isSubmitting || isUpdating || isGeocoding
                        ? "cursor-not-allowed border border-green-200 bg-green-100 text-green-200"
                        : "active:bg-black-100 bg-green-500 text-white hover:bg-green-200",
                    )}
                  >
                    {isSubmitting || isUpdating || isGeocoding ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {isGeocoding ? "Localizando..." : "Salvando..."}
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
