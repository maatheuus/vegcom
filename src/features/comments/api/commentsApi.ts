import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateCommentPayload,
  CreateCommentResponse,
  DeleteCommentResponse,
  GetCommentsResponse,
  GetRatingResponse,
  ToggleLikeResponse,
  UpdateCommentPayload,
  UpdateCommentResponse,
} from "./types";

const commentsApi = {
  /**
   * Create a new comment on a recipe
   */
  createComment: async (data: CreateCommentPayload) => {
    const { data: responseData } = await api.post<CreateCommentResponse>(
      "/comments/create",
      data,
    );
    return responseData;
  },

  /**
   * Get all comments for a recipe
   */
  getCommentsByRecipe: async (recipeId: number) => {
    const { data } = await api.get<GetCommentsResponse>(
      `/comments/recipe/${recipeId}`,
    );
    return data;
  },

  /**
   * Get the average rating for a recipe
   */
  getRecipeRating: async (recipeId: number) => {
    const { data } = await api.get<GetRatingResponse>(
      `/comments/recipe/${recipeId}/rating`,
    );
    return data;
  },

  /**
   * Update a comment (only owner can update)
   */
  updateComment: async (id: number, data: UpdateCommentPayload) => {
    const { data: responseData } = await api.put<UpdateCommentResponse>(
      `/comments/update/${id}`,
      data,
    );
    return responseData;
  },

  /**
   * Delete a comment (only owner can delete)
   */
  deleteComment: async (id: number) => {
    const { data } = await api.delete<DeleteCommentResponse>(
      `/comments/delete/${id}`,
    );
    return data;
  },

  /**
   * Toggle like on a comment
   */
  toggleLike: async (id: number) => {
    const { data } = await api.patch<ToggleLikeResponse>(
      `/comments/${id}/like`,
    );
    return data;
  },
};

export { commentsApi };
