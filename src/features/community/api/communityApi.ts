/**
 * Community API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockPosts, type Post, type PostComment } from "@/entities/post";
import { mockDelay, generateMockId } from "@/shared/api/mock";
import type { CreatePostData, UpdatePostData, CreateCommentData } from "../types";

/**
 * Retrieves a list of all community posts.
 *
 * @returns {Promise<Post[]>} A promise resolving to an array of posts.
 */
export const getPosts = async (): Promise<Post[]> => {
  await mockDelay(800);
  return mockPosts;
};

/**
 * Retrieves a single post by its ID.
 *
 * @param {string} id - The unique identifier of the post.
 * @returns {Promise<Post | null>} A promise resolving to the post or null if not found.
 */
export const getPostById = async (id: string): Promise<Post | null> => {
  await mockDelay(600);
  const post = mockPosts.find((p) => p.id === id);
  return post || null;
};

/**
 * Creates a new community post.
 *
 * @param {CreatePostData} data - The content and metadata for the new post.
 * @returns {Promise<Post>} A promise resolving to the newly created post.
 */
export const createPost = async (data: CreatePostData): Promise<Post> => {
  await mockDelay(1000);

  const newPost: Post = {
    id: generateMockId(),
    ...data,
    userId: "mock_user_id",
    user: {
      name: "Current User",
      avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
    likesCount: 0,
    commentsCount: 0,
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newPost;
};

/**
 * Updates an existing post.
 *
 * @param {UpdatePostData} data - The ID of the post to update and the new data.
 * @returns {Promise<Post>} A promise resolving to the updated post.
 * @throws {Error} If the post is not found.
 */
export const updatePost = async (data: UpdatePostData): Promise<Post> => {
  await mockDelay(900);

  const existingPost = mockPosts.find((p) => p.id === data.id);

  if (!existingPost) {
    throw new Error("Post not found");
  }

  return {
    ...existingPost,
    ...data,
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Deletes a post.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<void>} A promise indicating completion.
 */
export const deletePost = async (id: string): Promise<void> => {
  await mockDelay(700);
  console.log("Deleted post:", id);
};

/**
 * Toggles the like status of a post.
 *
 * @param {string} postId - The ID of the post to like/unlike.
 * @returns {Promise<{ likesCount: number }>} A promise resolving to the new likes count.
 */
export const toggleLike = async (
  postId: string,
): Promise<{ likesCount: number }> => {
  await mockDelay(500);

  const post = mockPosts.find((p) => p.id === postId);
  const currentLikes = post?.likesCount || 0;

  // Toggle: if even, increment, if odd, decrement
  const newLikesCount = currentLikes + (currentLikes % 2 === 0 ? 1 : -1);

  return { likesCount: newLikesCount };
};

/**
 * Adds a comment to a post.
 *
 * @param {CreateCommentData} data - The ID of the post and the comment content.
 * @returns {Promise<PostComment>} A promise resolving to the newly created comment.
 */
export const createComment = async (
  data: CreateCommentData,
): Promise<PostComment> => {
  await mockDelay(800);

  const newComment: PostComment = {
    id: generateMockId(),
    content: data.content,
    userId: "mock_user_id",
    user: {
      name: "Current User",
      avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newComment;
};

/**
 * Deletes a comment.
 *
 * @param {string} commentId - The ID of the comment to delete.
 * @returns {Promise<void>} A promise indicating completion.
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  await mockDelay(600);
  console.log("Deleted comment:", commentId);
};
