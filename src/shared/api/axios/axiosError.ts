import axios, { AxiosError } from "axios";
import { ERROR_MESSAGES } from "../errors/messages";

interface BackendErrorResponse {
  message: string | string[];
  code?: string;
  error?: string;
  statusCode?: number;
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<BackendErrorResponse>;
    const data = axiosError.response?.data;

    if (data?.code && ERROR_MESSAGES[data.code]) {
      return ERROR_MESSAGES[data.code];
    }

    if (data?.message) {
      if (Array.isArray(data.message)) {
        return data.message[0];
      }
      return data.message;
    }

    if (axiosError.code === "ERR_NETWORK") {
      return "Erro de conexão. Verifique sua internet.";
    }

    return axiosError.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro desconhecido.";
};
