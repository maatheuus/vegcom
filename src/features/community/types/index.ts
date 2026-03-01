export * from "@/entities/post";

export type CommunityPostType = "POST" | "RESOURCE" | "ANNOUNCEMENT";

export interface GetPostsParams {
  page?: number;
  limit?: number;
  type?: CommunityPostType;
}

export interface CreatePostData {
  postTitle: string;
  type?: "POST" | "RESOURCE";
  postContent: {
    postResources: {
      content: string;
      contentHTML?: string;
      images?: { src: File; alt?: string; title?: string }[];
      links?: string[];
    };
  };
  postTags?: string[];
}

export interface CreateCommentData {
  commentContent: string;
}
