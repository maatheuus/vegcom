/**
 * Types for Comments API
 */

// Request Payloads
export interface CreateCommentPayload {
  recipeId: number;
  text?: string;
  rating: number; // 1-5
}

export interface UpdateCommentPayload {
  text?: string;
  rating?: number;
}

// Response Types
export interface CommentUser {
  id: number;
  name: string;
  email: string;
}

export interface CommentData {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  user: CommentUser;
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface GetCommentsResponse {
  success: boolean;
  data: CommentData[];
}

export interface CreateCommentResponse {
  success: boolean;
  data: CommentData;
}

export interface UpdateCommentResponse {
  success: boolean;
  data: CommentData;
}

export interface DeleteCommentResponse {
  success: boolean;
  message: string;
}

export interface ToggleLikeResponse {
  success: boolean;
  liked: boolean;
  likesCount: number;
}

export interface GetRatingResponse {
  success: boolean;
  averageRating: number;
  totalRatings: number;
}
