import type { PostCardDataProps, PostComment } from "@/shared";
import { api } from "@/shared/api/axios/axiosInstance";
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
  } catch (err: any) {
    if (err?.status === 404) return null;
    throw err;
  }
};

export const createPost = async (
  payload: CreatePostData | FormData,
): Promise<PostCardDataProps> => {
  const { data } = await api.post<PostCardDataProps>("/community", payload, {
    headers:
      payload instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
  });

  return data;
};

export const createComment = async (
  postId: string,
  payload: CreateCommentData,
): Promise<PostComment> => {
  const { data } = await api.post<PostComment>(
    `/community/${postId}/comments`,
    payload,
  );
  return data;
};

export const toggleLike = async (
  postId: string,
): Promise<{ postLikes: number }> => {
  const { data } = await api.post<{ postLikes: number }>(
    `/community/${postId}/likes`,
  );
  return data;
};
