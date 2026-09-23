"use client";

import { toast } from "@/shared/hooks/use-toast";
import { format, isBefore, parseISO, startOfTomorrow } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCreateEvent,
  useUpdateEvent,
} from "../../api/queries/getDirectoryApiClient";
import type { AddressSuggestion } from "../../hooks/geocode";
import type { DirectoryEvent } from "../../types";
import {
  getEventValidationMessages,
  isLocationOutsideBrazilError,
  isUnauthorizedError,
} from "../../utils/errors";
import { FormActions } from "../FormModal/FormActions";
import { FormModal } from "../FormModal/FormModal";
import { FormReview, type ReviewItem } from "../FormModal/FormReview";
import { FormSuccess } from "../FormModal/FormSuccess";
import { useLoginGate } from "../FormModal/useLoginGate";
import { QuickLoginModal } from "../QuickLoginModal";
import {
  buildEventPayload,
  getInitialEventForm,
  isEventFormComplete,
  resolveEventCoordinates,
  suggestionToEventFields,
  type EventCoordinates,
  type EventFormValues,
} from "./eventForm";
import { EventFormFields } from "./EventFormFields";

const REVIEW_MESSAGE =
  "Ele já aparece para você e ficará público após a aprovação da nossa equipe.";

/** yyyy-MM-dd → dd/MM/yyyy para o preview. */
function formatEventDate(date: string): string {
  return format(parseISO(date), "dd/MM/yyyy");
}

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: DirectoryEvent | null;
}

export function AddEventModal({ isOpen, onClose, event }: AddEventModalProps) {
  const [form, setForm] = useState(() => getInitialEventForm(event));
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewCoords, setReviewCoords] = useState<EventCoordinates | null>(
    null,
  );

  const [pickedCoords, setPickedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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
    setIsReviewing(false);
    setReviewCoords(null);
    setPickedCoords(null);
    setIsSuccess(false);
  }, [event, isOpen]);

  const updateField = (
    field: Exclude<keyof EventFormValues, "monthly">,
    value: string,
  ) => {
    if (field === "city") setIsCitySelected(false);
    // Editar rua/cidade à mão invalida o ponto exato vindo da busca.
    if (field === "street" || field === "city") setPickedCoords(null);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleCitySelect = (city: string) => {
    setForm((current) => ({ ...current, city }));
    setIsCitySelected(true);
    setPickedCoords(null);
  };

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    const { street, city } = suggestionToEventFields(suggestion);
    setForm((current) => ({ ...current, street, city }));
    setIsCitySelected(true);
    setPickedCoords({ lat: suggestion.lat, lng: suggestion.lng });
  };

  const updateMonthly = (monthly: boolean) => {
    setForm((current) => ({ ...current, monthly }));
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

    let coordinates: EventCoordinates | null;
    if (pickedCoords) {
      coordinates = { ...pickedCoords, isApproximate: false };
    } else {
      setIsLocating(true);
      coordinates = await resolveEventCoordinates(
        form.street.trim(),
        form.city.trim(),
        event,
      );
      setIsLocating(false);
    }

    if (!coordinates) {
      toast({
        variant: "destructive",
        title: "Não foi possível localizar o endereço",
        description: "Não encontramos nem a cidade informada.",
      });
      return;
    }

    setReviewCoords(coordinates);
    setIsReviewing(true);
  };

  const handleConfirm = async () => {
    if (!reviewCoords || isSaving) return;

    const coordinates = reviewCoords;
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
      const validationMessages = getEventValidationMessages(error);
      if (validationMessages.length > 0) {
        toast({
          variant: "destructive",
          title: "Revise os campos do evento",
          description: validationMessages.join(" "),
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

  const reviewItems: ReviewItem[] = [
    { label: "Título", value: form.title.trim() },
    {
      label: "Data",
      value: form.date ? formatEventDate(form.date) : "",
    },
    { label: "Evento mensal", value: form.monthly ? "Sim" : "Não" },
    { label: "Rua / endereço", value: form.street.trim() },
    { label: "Cidade", value: form.city.trim() },
    ...(form.description.trim()
      ? [{ label: "Descrição", value: form.description.trim() }]
      : []),
    ...(form.link.trim() ? [{ label: "Link", value: form.link.trim() }] : []),
  ];

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
        ) : isReviewing ? (
          <FormReview
            items={reviewItems}
            note={
              reviewCoords?.isApproximate
                ? "Não encontramos a rua exata; o pin será posicionado no centro da cidade."
                : undefined
            }
            confirmLabel={
              isEditing ? "Salvar alterações" : "Enviar para revisão"
            }
            pendingLabel={isSaving ? "Salvando..." : undefined}
            onConfirm={handleConfirm}
            onBack={() => setIsReviewing(false)}
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
                onMonthlyChange={updateMonthly}
                onCitySelect={handleCitySelect}
                onAddressSelect={handleAddressSelect}
                hasCityError={Boolean(form.city.trim()) && !isCitySelected}
              />
            </div>
            <FormActions
              submitLabel={isEditing ? "Salvar alterações" : "Revisar e enviar"}
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
