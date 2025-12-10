/**
 * Post entity types
 */

/**
 * Represents a comment on a post.
 */
export interface PostComment {
  /** Unique identifier for the comment. */
  id: string;
  /** Text content of the comment. */
  content: string;
  /** ID of the user who made the comment. */
  userId: string;
  /** Basic details of the user who made the comment. */
  user: {
    /** The commenter's name. */
    name: string;
    /** The commenter's avatar URL. */
    avatarUrl: string;
  };
  /** Timestamp when the comment was created (ISO string). */
  createdAt: string;
  /** Timestamp when the comment was last updated (ISO string). */
  updatedAt: string;
}

/**
 * Represents a Post entity.
 */
export interface Post {
  /** Unique identifier for the post. */
  id: string;
  /** Title of the post. */
  title: string;
  /** Main content of the post (text or HTML). */
  content: string;
  /** Optional array of images attached to the post. */
  images?: {
    /** Image source URL. */
    src: string;
    /** Alternative text for accessibility. */
    alt: string;
    /** Title/caption for the image. */
    title: string;
  }[];
  /** Optional array of external links related to the post. */
  links?: string[];
  /** Optional array of tags or categories. */
  tags?: string[];
  /** ID of the author. */
  userId: string;
  /** Basic details of the author. */
  user: {
    /** The author's name. */
    name: string;
    /** The author's avatar URL. */
    avatarUrl: string;
  };
  /** Number of likes the post has received. */
  likesCount?: number;
  /** Number of comments on the post. */
  commentsCount?: number;
  /** Array of comments (often loaded separately or partially). */
  comments?: PostComment[];
  /** Timestamp when the post was created (ISO string). */
  createdAt: string;
  /** Timestamp when the post was last updated (ISO string). */
  updatedAt: string;
}

/**
 * Simplified Post structure for displaying in a list or card view.
 */
export interface PostCard {
  /** Unique identifier for the post. */
  id: string;
  /** Title of the post. */
  title: string;
  /** Brief content or excerpt. */
  content: string;
  /** Basic details of the author. */
  user: {
    /** The author's name. */
    name: string;
    /** The author's avatar URL. */
    avatarUrl: string;
  };
  /** Number of likes. */
  likesCount?: number;
  /** Number of comments. */
  commentsCount?: number;
  /** Tags associated with the post. */
  tags?: string[];
  /** Timestamp when the post was created (ISO string). */
  createdAt: string;
}
