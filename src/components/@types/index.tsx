import type { StaticImageData } from "next/image";

export interface DataRecipeCard {
  isFavorite?: boolean;
  rating?: number;
  title: string;
  recipeImageUrl: string | StaticImageData;
  user: {
    name: string;
    urlImage: string;
  };
  views?: number;
}

export interface Comment {
  user: {
    name: string;
    urlImage: string;
  };
  commentContent: string;
  commentDate: string;
}

export interface PostCardDataProps {
  user: {
    name: string;
    urlImage: string;
  };
  postTitle: string;
  postContent: {
    postResources?: {
      images?: {
        src: string;
        alt: string;
        title: string;
      }[];
      links?: string[];
      content: string;
    };
  };
  comments: {
    haveComments?: boolean;
    commentsNumber?: number;
    comments?: Comment[];
  };
  postLikes?: number;
  postDate: string;
  postTags?: string[];
}
