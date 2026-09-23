"use client";

import { toast } from "@/shared/hooks/use-toast";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCreatePlace } from "../../api/queries/getDirectoryApiClient";
import {
  CATEGORY_SINGULAR_LABELS,
  DIET_LABELS,
  PRICE_RANGE_LABELS,
} from "../../constants";
import { type AddressSuggestion, geocode } from "../../hooks/geocode";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";
import {
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
  buildPlacePayload,
  EMPTY_PLACE_FORM,
  type PlaceFormValues,
  suggestionToAddressFields,
} from "./placeForm";
import { PlaceFormFields } from "./PlaceFormFields";

interface AddPlaceModalProps {
  isOpen: boolean;
  coords: [number, number] | null;
  onCoordsChange: (coords: [number, number]) => void;
  onReposition: () => void;
  onClose: () => void;
}

export function AddPlaceModal({
  isOpen,
  coords,
  onCoordsChange,
  onReposition,
  onClose,
}: AddPlaceModalProps) {
  const [form, setForm] = useState(EMPTY_PLACE_FORM);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdatingPosition, setIsUpdatingPosition] = useState(false);
  // Incrementado a cada busca/fechamento para descartar respostas antigas do geocode.
  const positionRequestId = useRef(0);
  const { requireLogin, openLogin, loginModalProps } = useLoginGate("o local");
  const { mutateAsync: createPlace, isPending: isSubmitting } =
    useCreatePlace();
  const { result: geocoded, isLoading: isDetectingCity } = useReverseGeocode(
    isOpen ? coords : null,
  );
  const payload = buildPlacePayload(form, coords);

  const updateField = <K extends keyof PlaceFormValues>(
    field: K,
    value: PlaceFormValues[K],
  ) => setForm((current) => ({ ...current, [field]: value }));

  // Pré-preenche endereço/cidade detectados pelo pin, sem sobrescrever o que o usuário digitou.
  useEffect(() => {
    if (!geocoded) return;
    setForm((current) => ({
      ...current,
      address: current.address || geocoded.street,
      city: current.city || geocoded.city,
    }));
  }, [geocoded]);

  const handleClose = () => {
    positionRequestId.current += 1;
    setForm(EMPTY_PLACE_FORM);
    setIsReviewing(false);
    setIsSuccess(false);
    setIsUpdatingPosition(false);
    onClose();
  };

  // Fecha o modal sem limpar o formulário: o usuário volta depois de mover o pin.
  const handleReposition = () => {
    positionRequestId.current += 1;
    setIsReviewing(false);
    setIsUpdatingPosition(false);
    onReposition();
  };

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    const { address, city } = suggestionToAddressFields(suggestion);
    setForm((current) => ({ ...current, address, city }));
    onCoordsChange([suggestion.lat, suggestion.lng]);
  };

  const handleCitySelect = async ({ displayName }: { displayName: string }) => {
    const requestId = ++positionRequestId.current;
    updateField("city", displayName);
    setIsUpdatingPosition(true);

    const cityCoords = await geocode(displayName);
    if (positionRequestId.current !== requestId) return;

    setIsUpdatingPosition(false);

    if (!cityCoords) {
      toast({
        variant: "destructive",
        title: "Não foi possível atualizar a posição",
        description: "O local manterá o ponto escolhido no mapa.",
      });
      return;
    }

    onCoordsChange([cityCoords.lat, cityCoords.lng]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload || isSubmitting || requireLogin()) return;
    setIsReviewing(true);
  };

  const handleConfirm = async () => {
    if (!payload || isSubmitting) return;

    try {
      await createPlace(payload);
    } catch (error) {
      if (isUnauthorizedError(error)) {
        openLogin();
        return;
      }
      if (isLocationOutsideBrazilError(error)) {
        toast({
          variant: "destructive",
          title: "Local fora do Brasil",
          description:
            "Por enquanto, locais e eventos só podem ser adicionados no Brasil.",
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Não foi possível adicionar o local",
        description: "Tente novamente em instantes.",
      });
      return;
    }

    setIsSuccess(true);
    toast({
      variant: "success",
      title: "Local enviado para revisão!",
      description:
        "Ele já aparece no mapa só para você e ficará público após a aprovação da nossa equipe.",
    });
  };

  const reviewItems: ReviewItem[] = payload
    ? [
        { label: "Nome", value: payload.name },
        {
          label: "Categoria",
          value: CATEGORY_SINGULAR_LABELS[payload.category] ?? payload.category,
        },
        { label: "Dieta", value: DIET_LABELS[payload.diet] },
        { label: "Endereço", value: payload.address },
        { label: "Horário", value: payload.schedule },
        {
          label: "Faixa de preço",
          value: payload.priceRange
            ? (PRICE_RANGE_LABELS[payload.priceRange] ?? "")
            : "",
        },
        { label: "Telefone", value: payload.phone },
        { label: "Instagram", value: payload.instagram },
        { label: "Descrição", value: payload.description },
        {
          label: "Posição no mapa",
          value: `${payload.lat.toFixed(5)}, ${payload.lng.toFixed(5)}`,
        },
      ].filter((item): item is ReviewItem => Boolean(item.value))
    : [];

  return (
    <>
      <FormModal
        isOpen={isOpen}
        title="Adicionar Local"
        icon={<MapPin className="h-5 w-5 text-green-500" aria-hidden />}
        onClose={handleClose}
      >
        {isSuccess ? (
          <FormSuccess
            title="Local enviado para revisão!"
            description="Nossa equipe revisará as informações antes de publicar o local no mapa."
            onDone={handleClose}
          />
        ) : isReviewing ? (
          <FormReview
            items={reviewItems}
            confirmLabel="Enviar para revisão"
            pendingLabel={isSubmitting ? "Salvando..." : undefined}
            onConfirm={handleConfirm}
            onBack={() => setIsReviewing(false)}
            onAdjustLocation={handleReposition}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="hidden-scrollbar min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-3 py-4">
              <PlaceFormFields
                form={form}
                onFieldChange={updateField}
                coords={coords}
                onCitySelect={handleCitySelect}
                onAddressSelect={handleAddressSelect}
                onReposition={handleReposition}
                isDetectingCity={isDetectingCity}
                isUpdatingPosition={isUpdatingPosition}
              />
            </div>
            <FormActions
              submitLabel="Revisar e enviar"
              pendingLabel={isSubmitting ? "Salvando..." : undefined}
              isDisabled={!payload}
              onCancel={handleClose}
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
