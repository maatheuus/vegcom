"use server";

import type { PostCardDataProps, PostComment } from "@/shared";
import { api } from "@/shared/api/axios/axiosInstance";
import { serverFetch } from "@/shared/api/axios/serverFetch";
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

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { data } = await api.get<PostCardDataProps[]>("/community", {
    params: { ...params, page, limit },
    ...(token && {
      headers: { Authorization: `Bearer ${token}` },
    }),
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
  return serverFetch<PostCardDataProps>(`/community/${id}`, {
    method: "GET",
  });
};

export const createPost = async (
  payload: CreatePostData | FormData,
): Promise<PostCardDataProps> => {
  return serverFetch<PostCardDataProps>("/community", {
    method: "POST",
    body: payload,
  });
};

export const deletePost = async (postId: string): Promise<void> => {
  revalidateTag("posts");
  return serverFetch(`/community/posts/${postId}`, {
    method: "DELETE",
  });
};

export const createComment = async (
  postId: string,
  payload: CreateCommentData,
): Promise<PostComment> => {
  return serverFetch(`/community/${postId}/comments`, {
    method: "POST",
    body: payload,
  });
};

export const toggleLike = async (
  postId: string,
): Promise<{ postLikes: number }> => {
  revalidateTag("posts");
  return serverFetch(`/community/${postId}/likes`, {
    method: "POST",
  });
};

export const createReport = async (payload: {
  reason: string;
  communityPostId?: number | string;
  targetUserId?: number;
}): Promise<void> => {
  return serverFetch("/reports", {
    method: "POST",
    body: payload,
  });
};

export const toggleSave = async (
  postId: number,
  userId: number,
): Promise<{
  success: boolean;
  message: string;
  saved: boolean;
}> => {
  return serverFetch(`/community/posts/${postId}/save`, {
    method: "POST",
    body: { userId },
  });
};
