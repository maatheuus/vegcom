import type { StaticImport } from "next/dist/shared/lib/get-img-props";

/**
 * Represents the data for a recipe card.
 */
export interface DataRecipeCard {
  /** Whether the current user has favorited this recipe. */
  isFavorite: boolean;
  /** The rating of the recipe (e.g., out of 5). */
  rating: number;
  /** The title of the recipe. */
  title: string;
  /** The URL or static import for the recipe image. */
  recipeImageUrl: string | StaticImport;
  /** The author of the recipe. */
  user: {
    /** The author's name. */
    name: string;
    /** The author's profile image URL. */
    urlImage: string;
  };
  /** The number of views the recipe has received. */
  views: number;
}

/**
 * Represents basic user data.
 */
export interface UserData {
  /** The user's name. */
  name: string;
  /** The user's profile image URL. */
  urlImage: string;
}

/**
 * Represents an image in a post.
 */
export interface PostImage {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image. */
  alt: string;
  /** The title of the image. */
  title: string;
}

/**
 * Represents a comment on a post.
 */
export interface PostComment {
  /** The user who made the comment. */
  user: UserData;
  /** The text content of the comment. */
  commentContent: string;
  /** The date the comment was made (as a string). */
  commentDate: string;
}

/**
 * Represents the full data structure for a post card.
 */
export interface PostCardDataProps {
  /** The unique identifier of the post. */
  id?: string;
  /** The author of the post. */
  user: UserData;
  /** The title of the post. */
  postTitle: string;
  /** The content of the post. */
  postContent: {
    /** Resources associated with the post. */
    postResources: {
      /** Images attached to the post. */
      images: PostImage[];
      /** Links included in the post. */
      links: string[];
      /** The main text content of the post. */
      content: string;
    };
  };
  /** Comments section data. */
  comments: {
    /** Whether the post has comments. */
    haveComments: boolean;
    /** The total number of comments. */
    commentsNumber: number;
    /** The list of comments. */
    comments: PostComment[];
  };
  /** The number of likes the post has received. */
  postLikes: number;
  /** The date the post was created (as a string). */
  postDate: string;
  /** Tags associated with the post. */
  postTags: string[];
}

/**
 * Represents a simplified comment structure.
 */
export interface Comment {
  /** The user who made the comment. */
  user: {
    /** The user's name. */
    name: string;
    /** The user's profile image URL (optional). */
    urlImage?: string;
  };
}
