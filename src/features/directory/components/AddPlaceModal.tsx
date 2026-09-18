"use client";

import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { toast } from "@/shared/hooks/use-toast";
import { SearchCityLocation } from "@/shared/ui/SearchCityLocation";
import { isAxiosError } from "axios";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Coffee,
  Croissant,
  MapPin,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCreatePlace } from "../api/queries/getDirectoryApiClient";
import { geocode } from "../hooks/geocode";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import type { PlaceCategory } from "../types";
import { QuickLoginModal } from "./QuickLoginModal";

interface AddPlaceModalProps {
  isOpen: boolean;
  coords: [number, number] | null;
  onCoordsChange: (coords: [number, number]) => void;
  onClose: () => void;
}

const CATEGORY_OPTIONS: {
  key: PlaceCategory;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "restaurant",
    label: "Restaurante",
    icon: <UtensilsCrossed className="h-4 w-4" aria-hidden />,
  },
  {
    key: "market",
    label: "Feira",
    icon: <ShoppingBag className="h-4 w-4" aria-hidden />,
  },
  {
    key: "bakery",
    label: "Padaria",
    icon: <Croissant className="h-4 w-4" aria-hidden />,
  },
  {
    key: "cafe",
    label: "Café",
    icon: <Coffee className="h-4 w-4" aria-hidden />,
  },
  {
    key: "entrepreneur",
    label: "Empreendedor",
    icon: <Store className="h-4 w-4" aria-hidden />,
  },
  {
    key: "other",
    label: "Outro",
    icon: <MapPin className="h-4 w-4" aria-hidden />,
  },
];

const PRICE_OPTIONS: { value: 1 | 2 | 3; symbol: string; label: string }[] = [
  { value: 1, symbol: "$", label: "Econômico" },
  { value: 2, symbol: "$$", label: "Médio" },
  { value: 3, symbol: "$$$", label: "Caro" },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getInstagramHandle(value: string) {
  return value.trim().replace(/^@+/, "");
}

export function AddPlaceModal({
  isOpen,
  coords,
  onCoordsChange,
  onClose,
}: AddPlaceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PlaceCategory | null>(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [priceRange, setPriceRange] = useState<1 | 2 | 3 | undefined>(
    undefined,
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUpdatingPosition, setIsUpdatingPosition] = useState(false);
  const positionRequestId = useRef(0);
  const { mutateAsync: createPlace, isPending: isSubmitting } =
    useCreatePlace();
  const { result: geocoded, isLoading: isGeocoding } = useReverseGeocode(
    isOpen ? coords : null,
  );

  // Pré-preenche endereço/cidade detectados pelo pin (sem sobrescrever o que o usuário digitou)
  useEffect(() => {
    if (!geocoded) return;
    if (geocoded.street) {
      setAddress((current) => current || geocoded.street);
    }
    if (geocoded.city) {
      setCity((current) => current || geocoded.city);
    }
  }, [geocoded]);

  const reset = useCallback(() => {
    positionRequestId.current += 1;
    setName("");
    setCategory(null);
    setAddress("");
    setCity("");
    setPhone("");
    setInstagram("");
    setDescription("");
    setSchedule("");
    setPriceRange(undefined);
    setIsSuccess(false);
    setIsUpdatingPosition(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleCitySelect = useCallback(
    async (selectedCity: { displayName: string }) => {
      const selectedCityName = selectedCity.displayName;
      const requestId = positionRequestId.current + 1;
      positionRequestId.current = requestId;
      setCity(selectedCityName);
      setIsUpdatingPosition(true);

      const cityCoords = await geocode(selectedCityName);
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
    },
    [onCoordsChange],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (
        !name.trim() ||
        !category ||
        !address.trim() ||
        !city.trim() ||
        !coords
      )
        return;
      if (!getAccessToken()) {
        setIsLoginOpen(true);
        return;
      }

      try {
        await createPlace({
          name: name.trim(),
          category,
          lat: coords[0],
          lng: coords[1],
          address: `${address.trim()}, ${city.trim()}`,
          phone: phone.trim() || undefined,
          instagram: instagram.trim()
            ? `@${getInstagramHandle(instagram)}`
            : undefined,
          description: description.trim() || undefined,
          schedule: schedule.trim() || undefined,
          priceRange,
        });
      } catch (error) {
        const isUnauthorized =
          isAxiosError(error) && error.response?.status === 401;
        if (isUnauthorized) {
          setIsLoginOpen(true);
        } else {
          toast({
            variant: "destructive",
            title: "Não foi possível adicionar o local",
            description: "Tente novamente em instantes.",
          });
        }
        return;
      }

      setIsSuccess(true);

      toast({
        variant: "success",
        title: "Local publicado!",
        description: "Ele já aparece no mapa para a comunidade.",
      });

      setTimeout(() => {
        reset();
        onClose();
      }, 1800);
    },
    [
      name,
      category,
      address,
      city,
      phone,
      instagram,
      description,
      schedule,
      priceRange,
      coords,
      createPlace,
      reset,
      onClose,
    ],
  );

  const isFormValid =
    name.trim() && category && address.trim() && city.trim() && coords;

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
            aria-label="Adicionar local"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-green-100 px-5 py-4">
              <div className="flex items-center gap-2 text-green-500">
                <MapPin className="h-5 w-5 text-green-500" aria-hidden />
                <h2 className="text-base font-semibold">Adicionar Local</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
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
                  Local publicado!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col overflow-hidden"
              >
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <div className="flex flex-col gap-4">
                    {coords && (
                      <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-xs text-green-700">
                        <MapPin
                          className="h-4 w-4 shrink-0 text-green-500"
                          aria-hidden
                        />
                        <span>
                          Posição escolhida:{" "}
                          <strong>
                            {coords[0].toFixed(5)}, {coords[1].toFixed(5)}
                          </strong>
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="place-name"
                        className="text-xs font-medium text-green-500"
                      >
                        Nome <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <input
                        id="place-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Restaurante Verde Vida"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Use o nome pelo qual as pessoas encontram o local.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-green-500">
                        Categoria{" "}
                        <span className="ml-0.5 text-green-200">*</span>
                      </span>
                      <div
                        className="flex flex-wrap gap-2"
                        role="radiogroup"
                        aria-label="Categoria"
                      >
                        {CATEGORY_OPTIONS.map((option) => {
                          const isActive = category === option.key;
                          return (
                            <button
                              key={option.key}
                              type="button"
                              role="radio"
                              aria-checked={isActive}
                              onClick={() => setCategory(option.key)}
                              className={clsx(
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                                "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                                isActive
                                  ? "bg-green-500 text-white shadow-sm"
                                  : "bg-green-50 text-green-500 hover:bg-green-100",
                              )}
                            >
                              {option.icon}
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs leading-relaxed text-green-200">
                        A categoria define o ícone e ajuda visitantes a filtrar
                        o mapa.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="place-address"
                        className="text-xs font-medium text-green-500"
                      >
                        Endereço{" "}
                        <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <input
                        id="place-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex: Rua Augusta, 1500, Consolação"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Inclua número ou referência para que o ponto fique claro
                        no mapa.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-green-500">
                        Cidade <span className="ml-0.5 text-green-200">*</span>
                      </label>
                      <SearchCityLocation
                        value={city}
                        onChange={setCity}
                        onSelect={handleCitySelect}
                        placeholder={
                          isGeocoding
                            ? "Detectando cidade..."
                            : "Busque a cidade"
                        }
                        disabled={isUpdatingPosition}
                        className="rounded-xl border-green-200 px-3 py-2.5 text-sm text-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Ao escolher uma cidade, o ponto vai para o centro dela.
                        {isUpdatingPosition && " Atualizando posição..."}
                      </p>
                    </div>

                    <div className="order-10 grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="place-phone"
                          className="text-xs font-medium text-green-500"
                        >
                          Telefone
                        </label>
                        <input
                          id="place-phone"
                          type="tel"
                          inputMode="tel"
                          maxLength={15}
                          value={phone}
                          onChange={(e) =>
                            setPhone(formatPhone(e.target.value))
                          }
                          placeholder="(11) 99999-0000"
                          className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="place-instagram"
                          className="text-xs font-medium text-green-500"
                        >
                          Instagram
                        </label>
                        <div className="flex items-center rounded-xl border border-green-200 bg-white text-sm text-green-800 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20">
                          <span className="pl-3 text-green-500" aria-hidden>
                            @
                          </span>
                          <input
                            id="place-instagram"
                            value={instagram}
                            onChange={(e) =>
                              setInstagram(getInstagramHandle(e.target.value))
                            }
                            placeholder="perfil"
                            autoCapitalize="none"
                            autoCorrect="off"
                            className="min-w-0 flex-1 rounded-xl bg-transparent px-1 py-2.5 pr-3 placeholder:text-green-300 focus:border-0! focus:!ring-0 focus:outline-none!"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="order-10 -mt-2 text-xs leading-relaxed text-green-200">
                      Telefone e Instagram são opcionais, mas facilitam o
                      contato direto.
                    </p>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="place-description"
                        className="text-xs font-medium text-green-500"
                      >
                        Descrição
                      </label>
                      <textarea
                        id="place-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva o local..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                      <p className="text-xs leading-relaxed text-green-200">
                        Conte o que torna esse local útil para a comunidade.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="place-schedule"
                          className="text-xs font-medium text-green-500"
                        >
                          Horário
                        </label>
                        <input
                          id="place-schedule"
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                          placeholder="Seg-Sáb: 11h-22h"
                          className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-green-500">
                          Faixa de preço
                        </span>
                        <div
                          className="flex items-center gap-1.5"
                          role="radiogroup"
                          aria-label="Faixa de preço"
                        >
                          {PRICE_OPTIONS.map((option) => {
                            const isActive = priceRange === option.value;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                role="radio"
                                aria-checked={isActive}
                                aria-label={option.label}
                                title={option.label}
                                onClick={() =>
                                  setPriceRange(
                                    isActive ? undefined : option.value,
                                  )
                                }
                                className={clsx(
                                  "flex flex-1 flex-col items-center rounded-xl border px-2 py-1.5 transition-all duration-200",
                                  "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none",
                                  isActive
                                    ? "border-green-500 bg-green-500 text-white shadow-sm"
                                    : "border-green-200 bg-white text-green-500 hover:bg-green-50",
                                )}
                              >
                                <span className="text-sm leading-tight font-semibold">
                                  {option.symbol}
                                </span>
                                <span
                                  className={clsx(
                                    "text-[10px] leading-tight",
                                    isActive
                                      ? "text-white/80"
                                      : "text-green-200",
                                  )}
                                >
                                  {option.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-green-200">
                      Horário e faixa de preço ajudam a planejar a visita;
                      preencha se souber.
                    </p>
                  </div>
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
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      !isFormValid || isSubmitting
                        ? "cursor-not-allowed border border-green-200 bg-green-100 text-green-200"
                        : "active:bg-black-100 bg-green-500 text-white hover:bg-green-200",
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Salvando...
                      </>
                    ) : (
                      "Adicionar Local"
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
                  "Seu formulário foi mantido. Agora você pode publicar o local.",
              });
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
