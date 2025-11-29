/**
 * Community feature types
 */

export * from "@/entities/post";

export interface CreatePostData {
  title: string;
  content: string;
  images?: {
    src: string;
    alt: string;
    title: string;
  }[];
  links?: string[];
  tags?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export interface CreateCommentData {
  postId: string;
  content: string;
}
