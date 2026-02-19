import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface DataRecipeCard {
  isFavorite: boolean;
  rating: number;
  title: string;
  recipeImageUrl: string | StaticImport;
  user: {
    name: string;
    urlImage: string;
  };
  views: number;
}

export interface UserData {
  name: string;
  urlImage: string;
}

export interface PostImage {
  src: string;
  alt: string;
  title: string;
}

export interface PostComment {
  user: UserData;
  commentContent: string;
  commentDate: string;
}

export interface PostCardDataProps {
  id?: string | number;
  slug?: string;
  user: UserData;
  postTitle: string;
  postContent: {
    postResources: {
      images: PostImage[];
      links: string[];
      content: string;
    };
  };
  comments: {
    haveComments: boolean;
    commentsNumber: number;
    comments: PostComment[];
  };
  postLikes: number;
  postDate: string;
  postTags: string[];
}
