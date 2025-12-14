import { api } from "@/shared/api/axios/axiosInstance";
import type { AuthResponse, LoginCredentials, SignupData } from "../types";
import type { User } from "./types";

export const authApi = {
  getUser: async () => {
    const { data: responseData } = await api.get<User>("/auth/me");
    return responseData;
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

  // loginWithGoogle: async () => {
  //   const { data: responseData } = await api.post<ApiResponse<User>>("/auth/login/google");
  //   return responseData;
  // },
};
