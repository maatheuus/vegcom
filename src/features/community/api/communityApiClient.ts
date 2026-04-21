import { api } from "@/shared/api/axios/axiosInstance";
import type { PostCardDataProps } from "@/shared";
import type { CreatePostData } from "../types";

export const createPostWithImages = async (
  formData: FormData,
  signal?: AbortSignal,
): Promise<PostCardDataProps> => {
  const { data } = await api.post<PostCardDataProps>("/community", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    signal,
  });
  return data;
};

export const createPostClient = async (
  payload: CreatePostData,
): Promise<PostCardDataProps> => {
  const { data } = await api.post<PostCardDataProps>("/community", payload);
  return data;
};
