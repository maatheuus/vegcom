/**
 * Community API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockPosts, type Post, type PostComment } from "@/entities/post";
import type { PostCardDataProps } from "@/shared";
import { generateMockId, mockDelay } from "@/shared/api/mock";
import { mockPostCardData } from "../components/mockData";
import type {
  CreateCommentData,
  CreatePostData,
  UpdatePostData,
} from "../types";

/**
 * Get all posts
 */
export const getPosts = async (): Promise<PostCardDataProps[]> => {
  await mockDelay(800);
  return mockPostCardData;
};

/**
 * Get post by ID
 */
export const getPostById = async (
  id: string,
): Promise<PostCardDataProps | null> => {
  await mockDelay(600);
  const post = mockPostCardData.find((p) => p.id === Number(id));
  console.log("post:", mockPostCardData, post, id);
  return post || null;
};

/**
 * Create new post
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
 * Update post
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
 * Delete post
 */
export const deletePost = async (id: string): Promise<void> => {
  await mockDelay(700);
  console.log("Deleted post:", id);
};

/**
 * Like/unlike post
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
 * Create comment
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
 * Delete comment
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  await mockDelay(600);
  console.log("Deleted comment:", commentId);
};
