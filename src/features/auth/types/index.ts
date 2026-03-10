import type { CulinaryLevel, Preference } from "@/features/account";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  informations: SignupInformationsFormData;
}

export interface SignupInformationsFormData {
  aboutInfo: string;
  culinaryLevel: CulinaryLevel;
  location: string;
  preference: Preference;
  meetUs?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
}

export interface AuthError {
  message: string;
  status: number;
}
