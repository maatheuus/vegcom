/**
 * Post entity types
 */

export interface PostComment {
  id: string;
  content: string;
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  images?: {
    src: string;
    alt: string;
    title: string;
  }[];
  links?: string[];
  tags?: string[];
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  likesCount?: number;
  commentsCount?: number;
  comments?: PostComment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostCard {
  id: string;
  title: string;
  content: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  likesCount?: number;
  commentsCount?: number;
  tags?: string[];
  createdAt: string;
}
