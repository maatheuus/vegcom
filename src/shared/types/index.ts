import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface DataRecipeCard {
  isFavorite: boolean;
  rating: number;
  title: string;
  recipeImageUrl: string | StaticImport;
  user: {
    name: string;
    avatarUrl: string;
  };
  views: number;
}

export interface UserData {
  id: number;
  name: string;
  avatarUrl: string;
  role?: "ADMIN" | "USER";
}

export interface PostUserData {
  id: number;
  name: string;
  urlImage: string;
  role?: "ADMIN" | "USER";
}

export interface PostImage {
  src: string;
  alt: string;
  title: string;
}

export interface PostComment {
  user: PostUserData;
  commentContent: string;
  commentDate: string;
}

export interface PostCardDataProps {
  id?: string | number;
  slug?: string;
  user: PostUserData;
  postTitle: string;
  savedBy: number[];
  postContent: {
    postResources: {
      images: PostImage[];
      links: string[];
      content: string;
      contentHTML?: string;
    };
  };
  comments: {
    haveComments: boolean;
    commentsNumber: number;
    comments: PostComment[];
  };
  postLikes: number;
  likes?: { userId?: number | string; id?: number | string }[];
  postDate: string;
  postTags: string[];
}

export type RecipePreview = {
  type: "recipe";
  slug: string;
  title: string;
  description?: string;
  image?: string;
  cookTime?: string;
  rating?: number;
  href: string;
};

export type PostPreview = {
  type: "post";
  id: string;
  title: string;
  excerpt?: string;
  authorName: string;
  authorAvatar?: string;
  commentsCount: number;
  href: string;
};

export type LinkPreviewData = RecipePreview | PostPreview;
