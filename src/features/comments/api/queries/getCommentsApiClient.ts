import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "../commentsApi";
import type { CommentData, CreateCommentPayload } from "../types";

export const commentKeys = {
  all: ["comments"] as const,
  byRecipe: (recipeId: number) =>
    [...commentKeys.all, "recipe", recipeId] as const,
  rating: (recipeId: number) =>
    [...commentKeys.all, "rating", recipeId] as const,
};

/**
 * Fetch all comments for a recipe
 */
export const useGetCommentsByRecipe = (recipeId: number) => {
  return useQuery({
    queryKey: commentKeys.byRecipe(recipeId),
    queryFn: () => commentsApi.getCommentsByRecipe(recipeId),
    enabled: !!recipeId,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Fetch average rating for a recipe
 */
export const useGetRecipeRating = (recipeId: number) => {
  return useQuery({
    queryKey: commentKeys.rating(recipeId),
    queryFn: () => commentsApi.getRecipeRating(recipeId),
    enabled: !!recipeId,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Create a new comment
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentPayload) => commentsApi.createComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.byRecipe(variables.recipeId),
      });
      queryClient.invalidateQueries({
        queryKey: commentKeys.rating(variables.recipeId),
      });
    },
    onError: (error) => {
      console.error("Erro ao criar comentário:", error);
    },
  });
};

/**
 * Toggle like on a comment with optimistic update
 */
export const useToggleLike = (recipeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentsApi.toggleLike(commentId),
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: commentKeys.byRecipe(recipeId),
      });

      const previousData = queryClient.getQueryData<{ data: CommentData[] }>(
        commentKeys.byRecipe(recipeId),
      );

      queryClient.setQueryData<{ data: CommentData[] }>(
        commentKeys.byRecipe(recipeId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    isLikedByCurrentUser: !comment.isLikedByCurrentUser,
                    likesCount: comment.isLikedByCurrentUser
                      ? comment.likesCount - 1
                      : comment.likesCount + 1,
                  }
                : comment,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          commentKeys.byRecipe(recipeId),
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.byRecipe(recipeId),
      });
    },
  });
};

/**
 * Delete a comment
 */
export const useDeleteComment = (recipeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentsApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.byRecipe(recipeId),
      });
      queryClient.invalidateQueries({
        queryKey: commentKeys.rating(recipeId),
      });
    },
    onError: (error) => {
      console.error("Erro ao deletar comentário:", error);
    },
  });
};
