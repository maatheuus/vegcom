/**
 * Mock post data used for development and testing.
 */

import type { Post, PostComment } from "./types";

/**
 * Array of mock comments.
 */
export const mockComments: PostComment[] = [
  {
    id: "comment_1",
    content: "Concordo muito com esse ponto! Obrigado por compartilhar.",
    userId: "user_3",
    user: {
      name: "Maria Clara",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    createdAt: "2024-05-10T10:00:00Z",
    updatedAt: "2024-05-10T10:00:00Z",
  },
  {
    id: "comment_2",
    content: "Muito interessante, nunca tinha pensado dessa forma.",
    userId: "user_2",
    user: {
      name: "João Pedro",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    createdAt: "2024-05-09T15:30:00Z",
    updatedAt: "2024-05-09T15:30:00Z",
  },
];

/**
 * Array of mock posts including content, authors, stats, and comments.
 */
export const mockPosts: Post[] = [
  {
    id: "post_1",
    title: "Como melhorar sua produtividade com TypeScript",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    images: [
      {
        src: "https://picsum.photos/seed/post1/800/600",
        alt: "TypeScript productivity",
        title: "TypeScript productivity tips",
      },
    ],
    links: ["https://medium.com/artigo-produtividade-ts"],
    tags: ["typescript", "produtividade", "desenvolvimento"],
    userId: "user_1",
    user: {
      name: "João Silva",
      avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    likesCount: 1345,
    commentsCount: 2,
    comments: mockComments,
    createdAt: "2024-05-12T14:00:00Z",
    updatedAt: "2024-05-12T14:00:00Z",
  },
  {
    id: "post_2",
    title: "Entendendo React Hooks com exemplos práticos",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    images: [],
    links: [],
    tags: ["react", "hooks", "frontend"],
    userId: "user_2",
    user: {
      name: "Ana Costa",
      avatarUrl: "https://randomuser.me/api/portraits/women/20.jpg",
    },
    likesCount: 786,
    commentsCount: 0,
    comments: [],
    createdAt: "2024-04-28T10:30:00Z",
    updatedAt: "2024-04-28T10:30:00Z",
  },
];
