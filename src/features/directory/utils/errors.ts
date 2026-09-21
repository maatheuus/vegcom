import { isAxiosError } from "axios";

const LOCATION_OUTSIDE_BRAZIL_ERROR_CODE = "directory_location_outside_brazil";

type DirectoryErrorResponse = {
  code?: string;
  details?: string[];
};

export function isUnauthorizedError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 401;
}

export function isLocationOutsideBrazilError(error: unknown) {
  if (!isAxiosError(error)) return false;

  const data = error.response?.data as DirectoryErrorResponse | undefined;
  return data?.code === LOCATION_OUTSIDE_BRAZIL_ERROR_CODE;
}

const EVENT_FIELD_MESSAGES: Record<string, string> = {
  title: "O título pode ter no máximo 150 caracteres.",
  location: "O endereço pode ter no máximo 255 caracteres.",
  street: "O endereço pode ter no máximo 255 caracteres.",
  city: "A cidade pode ter no máximo 150 caracteres.",
  description: "A descrição pode ter no máximo 1000 caracteres.",
  link: "Informe um link completo e válido, por exemplo: https://site.com.br.",
};

/** Traduz os erros de validação da API (`details`) em mensagens por campo. */
export function getEventValidationMessages(error: unknown) {
  // O interceptor do axios rejeita com o corpo da resposta espalhado no objeto.
  const details = (error as { details?: unknown } | null)?.details;
  if (!Array.isArray(details)) return [];

  const fields = details.map((detail) => String(detail).split(" ")[0]);
  const messages = fields.map((field) => EVENT_FIELD_MESSAGES[field]);
  return [...new Set(messages.filter(Boolean))];
}
