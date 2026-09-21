import { SearchCityLocation } from "@/shared/ui/SearchCityLocation";
import {
  cityInputClassName,
  FormField,
  inputClassName,
} from "../FormModal/FormField";
import { EventDatePicker } from "./EventDatePicker";
import type { EventFormValues } from "./eventForm";

interface EventFormFieldsProps {
  form: EventFormValues;
  onFieldChange: (field: keyof EventFormValues, value: string) => void;
  onCitySelect: (city: string) => void;
  /** Cidade digitada mas não escolhida na lista de sugestões. */
  hasCityError: boolean;
}

export function EventFormFields({
  form,
  onFieldChange,
  onCitySelect,
  hasCityError,
}: EventFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        label="Título"
        htmlFor="event-title"
        required
        hint="Use um nome que ajude a identificar o encontro no mapa."
      >
        <input
          id="event-title"
          maxLength={150}
          value={form.title}
          onChange={(e) => onFieldChange("title", e.target.value)}
          placeholder="Ex: Feira Vegana de São Paulo"
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Data"
        htmlFor="event-date"
        required
        hint="Escolha uma data a partir de amanhã."
      >
        <EventDatePicker
          id="event-date"
          value={form.date}
          onChange={(date) => onFieldChange("date", date)}
        />
      </FormField>

      <FormField
        label="Rua / endereço"
        htmlFor="event-street"
        required
        hint="Informe o endereço mais completo que tiver para melhorar a posição do pin."
      >
        <input
          id="event-street"
          value={form.street}
          onChange={(e) => onFieldChange("street", e.target.value)}
          placeholder="Ex: Av. Paulista, 1000"
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Cidade"
        required
        hint={
          hasCityError ? (
            <span className="text-red-600">
              Selecione a cidade na lista de sugestões.
            </span>
          ) : (
            "Se a rua não estiver no mapa, o evento será marcado no centro da cidade."
          )
        }
      >
        <SearchCityLocation
          value={form.city}
          onChange={(city) => onFieldChange("city", city)}
          onSelect={(city) => onCitySelect(city.displayName)}
          placeholder="Busque a cidade"
          className={cityInputClassName}
          error={hasCityError}
        />
      </FormField>

      <FormField
        label="Descrição"
        htmlFor="event-description"
        hint="Conte o essencial: proposta, público e o que esperar do evento."
      >
        <textarea
          id="event-description"
          maxLength={1000}
          value={form.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="Descreva o evento..."
          rows={3}
          className={`${inputClassName} resize-none`}
        />
      </FormField>

      <FormField
        label="Link"
        htmlFor="event-link"
        hint="Use o link oficial para inscrições, programação ou mais detalhes."
      >
        <input
          id="event-link"
          type="url"
          value={form.link}
          onChange={(e) => onFieldChange("link", e.target.value)}
          placeholder="https://..."
          className={inputClassName}
        />
      </FormField>
    </div>
  );
}
