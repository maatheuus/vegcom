import { isAxiosError } from "axios";

const LOCATION_OUTSIDE_BRAZIL_ERROR_CODE = "directory_location_outside_brazil";

type DirectoryErrorResponse = {
  code?: string;
};

export function isUnauthorizedError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 401;
}

export function isLocationOutsideBrazilError(error: unknown) {
  if (!isAxiosError(error)) return false;

  const data = error.response?.data as DirectoryErrorResponse | undefined;
  return data?.code === LOCATION_OUTSIDE_BRAZIL_ERROR_CODE;
}
