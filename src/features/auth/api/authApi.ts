import { api } from "@/shared/api/axios/axiosInstance";
import type { AuthResponse, LoginCredentials, SignupData } from "../types";
import type { ApiResponse, User, UserInformations } from "./types";

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  informations?: Partial<UserInformations>;
}

export interface UpdatePasswordPayload {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

export const authApi = {
  checkEmail: async (email: string) => {
    const formatedEmail = email.toLowerCase().trim();

    const { data: responseData } = await api.get<{ available: boolean }>(
      "/auth/check-email",
      { params: { email: formatedEmail } },
    );
    return responseData;
  },

  getUser: async () => {
    const { data: responseData } = await api.get<ApiResponse<User>>("/auth/me");
    return responseData.data;
  },

  signin: async (credentials: LoginCredentials) => {
    const { data: responseData } = await api.post<AuthResponse>(
      "/auth/signin",
      credentials,
    );
    return responseData;
  },

  signup: async (data: SignupData) => {
    const { data: responseData } = await api.post<User>("/auth/signup", data);
    return responseData;
  },

  logout: async () => {
    const { data: responseData } = await api.post<User>("/auth/logout");
    return responseData;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const { data: responseData } = await api.put<{
      success: boolean;
      message: string;
    }>("/auth/me", payload);
    return responseData;
  },

  updatePassword: async (payload: UpdatePasswordPayload) => {
    const { data: responseData } = await api.put<{
      success: boolean;
      message: string;
    }>("/auth/update-password", payload);
    return responseData;
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseData } = await api.post<{
      success: boolean;
      message: string;
      avatarUrl: string;
    }>("/auth/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return responseData;
  },
};
