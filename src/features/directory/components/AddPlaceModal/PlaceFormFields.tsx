import { SearchCityLocation } from "@/shared/ui/SearchCityLocation";
import { MapPin } from "lucide-react";
import { getInstagramHandle } from "../../utils/instagram";
import { formatPhone } from "../../utils/phone";
import {
  cityInputClassName,
  FormField,
  FormHint,
  inputClassName,
} from "../FormModal/FormField";
import { CategoryPicker } from "./CategoryPicker";
import type { PlaceFormValues } from "./placeForm";
import { PriceRangePicker } from "./PriceRangePicker";

interface PlaceFormFieldsProps {
  form: PlaceFormValues;
  onFieldChange: <K extends keyof PlaceFormValues>(
    field: K,
    value: PlaceFormValues[K],
  ) => void;
  coords: [number, number] | null;
  onCitySelect: (city: { displayName: string }) => void;
  isDetectingCity: boolean;
  isUpdatingPosition: boolean;
}

export function PlaceFormFields({
  form,
  onFieldChange,
  coords,
  onCitySelect,
  isDetectingCity,
  isUpdatingPosition,
}: PlaceFormFieldsProps) {
  return (
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

      <FormField
        label="Nome"
        htmlFor="place-name"
        required
        hint="Use o nome pelo qual as pessoas encontram o local."
      >
        <input
          id="place-name"
          value={form.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          placeholder="Ex: Restaurante Verde Vida"
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Categoria"
        required
        hint="A categoria define o ícone e ajuda visitantes a filtrar o mapa."
      >
        <CategoryPicker
          value={form.category}
          onChange={(category) => onFieldChange("category", category)}
        />
      </FormField>

      <FormField
        label="Endereço"
        htmlFor="place-address"
        required
        hint="Inclua número ou referência para que o ponto fique claro no mapa."
      >
        <input
          id="place-address"
          value={form.address}
          onChange={(e) => onFieldChange("address", e.target.value)}
          placeholder="Ex: Rua Augusta, 1500, Consolação"
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Cidade"
        required
        hint={`Ao escolher uma cidade, o ponto vai para o centro dela.${isUpdatingPosition ? " Atualizando posição..." : ""}`}
      >
        <SearchCityLocation
          value={form.city}
          onChange={(city) => onFieldChange("city", city)}
          onSelect={onCitySelect}
          placeholder={
            isDetectingCity ? "Detectando cidade..." : "Busque a cidade"
          }
          disabled={isUpdatingPosition}
          className={cityInputClassName}
        />
      </FormField>

      <FormField
        label="Descrição"
        htmlFor="place-description"
        hint="Conte o que torna esse local útil para a comunidade."
      >
        <textarea
          id="place-description"
          value={form.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="Descreva o local..."
          rows={3}
          className={`${inputClassName} resize-none`}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
        <FormField label="Horário" htmlFor="place-schedule">
          <input
            id="place-schedule"
            value={form.schedule}
            onChange={(e) => onFieldChange("schedule", e.target.value)}
            placeholder="Seg-Sáb: 11h-22h"
            className={`${inputClassName} flex-1`}
          />
        </FormField>
        <FormField label="Faixa de preço">
          <PriceRangePicker
            value={form.priceRange}
            onChange={(priceRange) => onFieldChange("priceRange", priceRange)}
          />
        </FormField>
      </div>
      <FormHint>
        Horário e faixa de preço ajudam a planejar a visita; preencha se souber.
      </FormHint>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Telefone" htmlFor="place-phone">
          <input
            id="place-phone"
            type="tel"
            inputMode="tel"
            maxLength={15}
            value={form.phone}
            onChange={(e) => onFieldChange("phone", formatPhone(e.target.value))}
            placeholder="(11) 99999-0000"
            className={inputClassName}
          />
        </FormField>
        <FormField label="Instagram" htmlFor="place-instagram">
          <div className="flex items-center rounded-xl border border-green-200 bg-white text-sm text-green-800 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20">
            <span className="pl-3 text-green-500" aria-hidden>
              @
            </span>
            <input
              id="place-instagram"
              value={form.instagram}
              onChange={(e) =>
                onFieldChange("instagram", getInstagramHandle(e.target.value))
              }
              placeholder="perfil"
              autoCapitalize="none"
              autoCorrect="off"
              className="min-w-0 flex-1 rounded-xl bg-transparent px-1 py-2.5 pr-3 placeholder:text-green-300 focus:border-0! focus:ring-0! focus:outline-none!"
            />
          </div>
        </FormField>
      </div>
      <FormHint>
        Telefone e Instagram são opcionais, mas facilitam o contato direto.
      </FormHint>
    </div>
  );
}
