/**
 * Community feature types
 */

export * from "@/entities/post";

/**
 * Data required to create a new community post.
 */
export interface CreatePostData {
  /** The title of the post. */
  title: string;
  /** The main content of the post. */
  content: string;
  /** Optional list of images to attach. */
  images?: {
    /** Image source URL. */
    src: string;
    /** Alternative text for the image. */
    alt: string;
    /** Title/caption for the image. */
    title: string;
  }[];
  /** Optional list of external links. */
  links?: string[];
  /** Optional list of tags to categorize the post. */
  tags?: string[];
}

/**
 * Data required to update an existing post.
 * Includes the ID and any fields from CreatePostData that should be changed.
 */
export interface UpdatePostData extends Partial<CreatePostData> {
  /** The ID of the post to update. */
  id: string;
}

/**
 * Data required to create a new comment on a post.
 */
export interface CreateCommentData {
  /** The ID of the post being commented on. */
  postId: string;
  /** The text content of the comment. */
  content: string;
}
