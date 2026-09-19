"use client";

import { toast } from "@/shared/hooks/use-toast";
import { isBefore, parseISO, startOfTomorrow } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCreateEvent,
  useUpdateEvent,
} from "../../api/queries/getDirectoryApiClient";
import type { DirectoryEvent } from "../../types";
import {
  isLocationOutsideBrazilError,
  isUnauthorizedError,
} from "../../utils/errors";
import { FormActions } from "../FormModal/FormActions";
import { FormModal } from "../FormModal/FormModal";
import { FormSuccess } from "../FormModal/FormSuccess";
import { useLoginGate } from "../FormModal/useLoginGate";
import { QuickLoginModal } from "../QuickLoginModal";
import {
  buildEventPayload,
  getInitialEventForm,
  isEventFormComplete,
  resolveEventCoordinates,
  type EventFormValues,
} from "./eventForm";
import { EventFormFields } from "./EventFormFields";

const REVIEW_MESSAGE =
  "Nossa equipe revisará o evento antes de publicá-lo no mapa.";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: DirectoryEvent | null;
}

export function AddEventModal({ isOpen, onClose, event }: AddEventModalProps) {
  const [form, setForm] = useState(() => getInitialEventForm(event));
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  // Só aceitamos cidades escolhidas na lista (IBGE); texto livre pode não existir.
  const [isCitySelected, setIsCitySelected] = useState(Boolean(event?.city));
  const { requireLogin, openLogin, loginModalProps } = useLoginGate("o evento");
  const { mutateAsync: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const isEditing = Boolean(event);
  const isSaving = isCreating || isUpdating;
  const pendingLabel = isLocating
    ? "Localizando..."
    : isSaving
      ? "Salvando..."
      : undefined;
  const isFormValid = isEventFormComplete(form) && isCitySelected;

  useEffect(() => {
    if (!isOpen) return;
    setForm(getInitialEventForm(event));
    setIsCitySelected(Boolean(event?.city));
    setIsSuccess(false);
  }, [event, isOpen]);

  const updateField = (field: keyof EventFormValues, value: string) => {
    if (field === "city") setIsCitySelected(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleCitySelect = (city: string) => {
    setForm((current) => ({ ...current, city }));
    setIsCitySelected(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || pendingLabel) return;

    if (!isEditing && isBefore(parseISO(form.date), startOfTomorrow())) {
      toast({
        variant: "destructive",
        title: "Escolha uma data futura",
        description:
          "Novos eventos só podem ser adicionados a partir de amanhã.",
      });
      return;
    }
    if (requireLogin()) return;

    setIsLocating(true);
    const coordinates = await resolveEventCoordinates(
      form.street.trim(),
      form.city.trim(),
      event,
    );
    setIsLocating(false);

    if (!coordinates) {
      toast({
        variant: "destructive",
        title: "Não foi possível localizar o endereço",
        description: "Não encontramos nem a cidade informada.",
      });
      return;
    }

    const payload = buildEventPayload(form, coordinates);

    try {
      if (event) {
        await updateEvent({ eventId: event.id, payload });
      } else {
        await createEvent(payload);
      }
    } catch (error) {
      if (isUnauthorizedError(error)) {
        openLogin();
        return;
      }
      if (isLocationOutsideBrazilError(error)) {
        toast({
          variant: "destructive",
          title: "Evento fora do Brasil",
          description:
            "Por enquanto, locais e eventos só podem ser adicionados no Brasil.",
        });
        return;
      }
      toast({
        variant: "destructive",
        title: `Não foi possível ${isEditing ? "editar" : "adicionar"} o evento`,
        description: "Tente novamente em instantes.",
      });
      return;
    }

    setIsSuccess(true);
    toast({
      variant: "success",
      title: isEditing ? "Evento atualizado!" : "Evento enviado para revisão!",
      description: isEditing
        ? "As alterações já aparecem na lista."
        : coordinates.isApproximate
          ? `${REVIEW_MESSAGE} Como não encontramos a rua, o pin será posicionado no centro da cidade.`
          : REVIEW_MESSAGE,
    });
  };

  return (
    <>
      <FormModal
        isOpen={isOpen}
        title={isEditing ? "Editar Evento" : "Adicionar Evento"}
        icon={<CalendarDays className="h-5 w-5 text-green-500" aria-hidden />}
        onClose={onClose}
      >
        {isSuccess ? (
          <FormSuccess
            title={
              isEditing ? "Evento atualizado!" : "Evento enviado para revisão!"
            }
            description={
              isEditing
                ? undefined
                : "Nossa equipe revisará as informações antes de publicar o evento no mapa."
            }
            onDone={onClose}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-3 py-4">
              <EventFormFields
                form={form}
                onFieldChange={updateField}
                onCitySelect={handleCitySelect}
                hasCityError={Boolean(form.city.trim()) && !isCitySelected}
              />
            </div>
            <FormActions
              submitLabel={isEditing ? "Salvar alterações" : "Adicionar Evento"}
              pendingLabel={pendingLabel}
              isDisabled={!isFormValid}
              onCancel={onClose}
            />
          </form>
        )}
      </FormModal>
      <QuickLoginModal
        {...loginModalProps}
        isOpen={isOpen && loginModalProps.isOpen}
      />
    </>
  );
}
