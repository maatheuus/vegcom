"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MapPin,
  CheckCircle,
  UtensilsCrossed,
  ShoppingBag,
  Croissant,
  Coffee,
  Store,
} from "lucide-react";
import type { PlaceCategory } from "../types";
import { toast } from "@/shared/hooks/use-toast";
import { useCreatePlace } from "../api/queries/getDirectoryApiClient";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { isAxiosError } from "axios";
import { QuickLoginModal } from "./QuickLoginModal";

interface AddPlaceModalProps {
  isOpen: boolean;
  coords: [number, number] | null;
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

export function AddPlaceModal({ isOpen, coords, onClose }: AddPlaceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PlaceCategory | null>(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [priceRange, setPriceRange] = useState<1 | 2 | 3 | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !category || !address.trim() || !city.trim() || !coords)
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
          instagram: instagram.trim() || undefined,
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
          toast({ variant: "destructive", title: "Não foi possível adicionar o local", description: "Tente novamente em instantes." });
        }
        return;
      }

      setIsSuccess(true);

      toast({
        variant: "success",
        title: "Local adicionado!",
        description: "O novo ponto já aparece no mapa.",
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
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="h-5 w-5 text-green-500" aria-hidden />
                <h2 className="text-base font-semibold">Adicionar Local</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-1 text-green-400 transition-colors hover:bg-green-100 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
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
                  <CheckCircle className="h-16 w-16 text-green-500" aria-hidden />
                </motion.div>
                <p className="text-center text-lg font-semibold text-green-800">
                  Local adicionado!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-4">
                    {coords && (
                      <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-xs text-green-700">
                        <MapPin className="h-4 w-4 shrink-0 text-green-500" aria-hidden />
                        <span>
                          Posição escolhida:{" "}
                          <strong>
                            {coords[0].toFixed(5)}, {coords[1].toFixed(5)}
                          </strong>
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="place-name" className="text-xs font-medium text-green-700">
                        Nome <span className="ml-0.5 text-green-400">*</span>
                      </label>
                      <input
                        id="place-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Restaurante Verde Vida"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-green-700">
                        Categoria <span className="ml-0.5 text-green-400">*</span>
                      </span>
                      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Categoria">
                        {CATEGORY_OPTIONS.map((option) => {
                          const isActive = category === option.key;
                          return (
                            <button
                              key={option.key}
                              type="button"
                              role="radio"
                              aria-checked={isActive}
                              onClick={() => setCategory(option.key)}
                              className={[
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
                                isActive
                                  ? "bg-green-500 text-white shadow-sm"
                                  : "bg-green-50 text-green-500 hover:bg-green-100",
                              ].join(" ")}
                            >
                              {option.icon}
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="place-address" className="text-xs font-medium text-green-700">
                        Endereço <span className="ml-0.5 text-green-400">*</span>
                      </label>
                      <input
                        id="place-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex: Rua Augusta, 1500, Consolação"
                        className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="place-city" className="text-xs font-medium text-green-700">
                        Cidade <span className="ml-0.5 text-green-400">*</span>
                        {geocoded?.city && (
                          <span className="ml-1.5 font-normal text-green-400">
                            — detectada pelo pin
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          id="place-city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder={
                            isGeocoding ? "Detectando cidade..." : "Ex: São Paulo, SP"
                          }
                          className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                        {isGeocoding && (
                          <span className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="place-phone" className="text-xs font-medium text-green-700">
                          Telefone
                        </label>
                        <input
                          id="place-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(11) 99999-0000"
                          className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="place-instagram"
                          className="text-xs font-medium text-green-700"
                        >
                          Instagram
                        </label>
                        <input
                          id="place-instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="@perfil"
                          className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="place-description"
                        className="text-xs font-medium text-green-700"
                      >
                        Descrição
                      </label>
                      <textarea
                        id="place-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva o local..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="place-schedule"
                          className="text-xs font-medium text-green-700"
                        >
                          Horário
                        </label>
                        <input
                          id="place-schedule"
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                          placeholder="Seg-Sáb: 11h-22h"
                          className="w-full rounded-xl border border-green-200 bg-white px-3 py-2.5 text-sm text-green-800 placeholder:text-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-green-700">Faixa de preço</span>
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
                                  setPriceRange(isActive ? undefined : option.value)
                                }
                                className={[
                                  "flex flex-1 flex-col items-center rounded-xl border px-2 py-1.5 transition-all duration-200",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                                  isActive
                                    ? "border-green-500 bg-green-500 text-white shadow-sm"
                                    : "border-green-200 bg-white text-green-500 hover:bg-green-50",
                                ].join(" ")}
                              >
                                <span className="text-sm font-semibold leading-tight">
                                  {option.symbol}
                                </span>
                                <span
                                  className={[
                                    "text-[10px] leading-tight",
                                    isActive ? "text-white/80" : "text-green-400",
                                  ].join(" ")}
                                >
                                  {option.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-green-100 px-5 py-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={[
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
                      !isFormValid || isSubmitting
                        ? "cursor-not-allowed border border-green-200 bg-green-100 text-green-200"
                        : "bg-green-500 text-white hover:bg-green-200 active:bg-black-100",
                    ].join(" ")}
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
              toast({ variant: "success", title: "Login realizado!", description: "Seu formulário foi mantido. Agora você pode publicar o local." });
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
