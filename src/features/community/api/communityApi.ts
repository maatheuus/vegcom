"use server";

import type { PostCardDataProps, PostComment } from "@/shared";
import { api } from "@/shared/api/axios/axiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import type {
  CreateCommentData,
  CreatePostData,
  GetPostsParams,
} from "../types";

export interface PaginatedPosts {
  data: PostCardDataProps[];
  page: number;
  limit: number;
}

export const getPosts = async (
  params?: GetPostsParams,
): Promise<PaginatedPosts> => {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;

  const { data } = await api.get<PostCardDataProps[]>("/community", {
    params: { ...params, page, limit },
  });

  return {
    data: data ?? [],
    page,
    limit,
  };
};

// export const getAnnouncements = async (
//   params?: GetPostsParams,
// ): Promise<PostCardDataProps[]> => {
//   const { data } = await api.get<PostCardDataProps[]>("admin/announcements", {
//     params,
//   });
//   return data;
// };

export const getPostById = async (
  id: string,
): Promise<PostCardDataProps | null> => {
  try {
    const { data } = await api.get<PostCardDataProps>(`/community/${id}`);
    return data;
  } catch (err) {
    if ((err as { status?: number })?.status === 404) return null;
    throw err;
  }
};

export const createPost = async (
  payload: CreatePostData | FormData,
): Promise<PostCardDataProps> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não está autenticado");
  }

  const { data } = await api.post<PostCardDataProps>("/community", payload, {
    headers: {
      ...(payload instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deletePost = async (postId: string): Promise<void> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não está autenticado");
  }

  await api.delete(`/community/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  revalidateTag("posts");
};

export const createComment = async (
  postId: string,
  payload: CreateCommentData,
): Promise<PostComment> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não está autenticado");
  }

  const { data } = await api.post<PostComment>(
    `/community/${postId}/comments`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const toggleLike = async (
  postId: string,
): Promise<{ postLikes: number }> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não está autenticado");
  }

  const { data } = await api.post<{ postLikes: number }>(
    `/community/${postId}/likes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  revalidateTag("posts");
  return data;
};

export const toggleSave = async (
  postId: number,
  userId: number,
): Promise<{
  success: boolean;
  message: string;
  saved: boolean;
}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não está autenticado");
  }

  const { data } = await api.post<{
    success: boolean;
    message: string;
    saved: boolean;
  }>(
    `/community/posts/${postId}/save`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
