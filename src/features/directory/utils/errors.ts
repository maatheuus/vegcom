import { isAxiosError } from "axios";

export function isUnauthorizedError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 401;
}
