"use client";

import { toast } from "@/shared/hooks/use-toast";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCreatePlace } from "../../api/queries/getDirectoryApiClient";
import { geocode } from "../../hooks/geocode";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";
import { isUnauthorizedError } from "../../utils/errors";
import { FormActions } from "../FormModal/FormActions";
import { FormModal } from "../FormModal/FormModal";
import { FormSuccess } from "../FormModal/FormSuccess";
import { useLoginGate } from "../FormModal/useLoginGate";
import { QuickLoginModal } from "../QuickLoginModal";
import {
  buildPlacePayload,
  EMPTY_PLACE_FORM,
  type PlaceFormValues,
} from "./placeForm";
import { PlaceFormFields } from "./PlaceFormFields";

interface AddPlaceModalProps {
  isOpen: boolean;
  coords: [number, number] | null;
  onCoordsChange: (coords: [number, number]) => void;
  onClose: () => void;
}

export function AddPlaceModal({
  isOpen,
  coords,
  onCoordsChange,
  onClose,
}: AddPlaceModalProps) {
  const [form, setForm] = useState(EMPTY_PLACE_FORM);
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
    setIsSuccess(false);
    setIsUpdatingPosition(false);
    onClose();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload || isSubmitting || requireLogin()) return;

    try {
      await createPlace(payload);
    } catch (error) {
      if (isUnauthorizedError(error)) {
        openLogin();
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
        "Nossa equipe revisará as informações. Ele aparecerá no mapa após a aprovação.",
    });
  };

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
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-3 py-4">
              <PlaceFormFields
                form={form}
                onFieldChange={updateField}
                coords={coords}
                onCitySelect={handleCitySelect}
                isDetectingCity={isDetectingCity}
                isUpdatingPosition={isUpdatingPosition}
              />
            </div>
            <FormActions
              submitLabel="Adicionar Local"
              pendingLabel={isSubmitting ? "Salvando..." : undefined}
              isDisabled={!payload}
              onCancel={handleClose}
            />
          </form>
        )}
      </FormModal>
      <QuickLoginModal {...loginModalProps} isOpen={isOpen && loginModalProps.isOpen} />
    </>
  );
}
