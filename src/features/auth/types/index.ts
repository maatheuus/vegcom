export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  informations: SignupInformationsFormData;
}

export interface SignupInformationsFormData {
  aboutInfo: string;
  culinaryLevel: string;
  location: string;
  preferences: "vegan" | "vegetarian";
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
