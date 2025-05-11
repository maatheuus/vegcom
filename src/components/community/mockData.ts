import { food } from "@/assets";
import type { DataRecipeCard, PostCardDataProps } from "../@types";

export const mockTrendingData: DataRecipeCard[] = [
  {
    isFavorite: true,
    rating: 4.8,
    title: "Creamy Mushroom Risotto",
    recipeImageUrl: food,
    user: {
      name: "Emma Johnson",
      urlImage: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    views: 1320,
  },
];

export const mockExploreData: DataRecipeCard[] = [
  {
    isFavorite: false,
    rating: 3.2,
    title: "Spicy Thai Noodles",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 875,
  },
];

export const mockPostCardData: PostCardDataProps[] = [
  {
    user: {
      name: "João Silva",
      urlImage: "https://example.com/users/joao.jpg",
    },
    postTitle: "Como melhorar sua produtividade com TypeScript",
    postContent: {
      postResources: {
        images: [
          {
            src: "https://picsum.photos/seed/picsum/200/300",
            alt: "Image from posts",
            title: "Image from posts",
          },
          {
            src: "https://picsum.photos/seed/picsum/200/300",
            alt: "Image from posts",
            title: "Image from posts",
          },
          {
            src: "https://picsum.photos/seed/picsum/200/300",
            alt: "Image from posts",
            title: "Image from posts",
          },
        ],
        links: [
          "https://medium.com/artigo-produtividade-ts",
          "https://medium.com/artigo-produtividade-ts",
        ],
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: {
      haveComments: true,
      commentsNumber: 2,
      comments: [
        {
          user: {
            name: "Maria Oliveira",
            urlImage: "https://example.com/users/maria.jpg",
          },
          commentContent: "Excelente artigo, aprendi bastante!",
          commentDate: "2025-05-01",
        },
        {
          user: {
            name: "Maria Oliveira",
            urlImage: "https://example.com/users/maria.jpg",
          },
          commentContent: "Excelente artigo, aprendi bastante!",
          commentDate: "2025-05-01",
        },
        {
          user: {
            name: "Maria Oliveira",
            urlImage: "https://example.com/users/maria.jpg",
          },
          commentContent: "Excelente artigo, aprendi bastante!",
          commentDate: "2025-05-01",
        },
        {
          user: {
            name: "Maria Oliveira",
            urlImage: "https://example.com/users/maria.jpg",
          },
          commentContent: "Excelente artigo, aprendi bastante!",
          commentDate: "2025-05-01",
        },
        {
          user: {
            name: "Carlos Souza",
            urlImage: "https://example.com/users/carlos.jpg",
          },
          commentContent: "Gostei das dicas de produtividade!",
          commentDate: "2025-05-02",
        },
      ],
    },
    postViews: 1345,
    postDate: "2025-05-12",
    postTags: ["typescript", "produtividade", "desenvolvimento"],
  },
  {
    user: {
      name: "Ana Costa",
      urlImage: "https://example.com/users/ana.jpg",
    },
    postTitle: "Entendendo React Hooks com exemplos práticos",
    postContent: {
      postResources: {
        images: [],
        links: [],
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
    comments: {
      haveComments: false,
      commentsNumber: 0,
      comments: [],
    },
    postViews: 786,
    postDate: "2025-04-28",
    postTags: ["react", "hooks", "frontend"],
  },
];

export const mockPostContent = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
It has survived not only five centuries, but also the leap into electronic typesetting, 
remaining essentially unchanged.
`;

export const mockComments = [
  {
    id: "1",
    content: "Concordo muito com esse ponto! Obrigado por compartilhar.",
    user: {
      name: "Maria Clara",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    date: "2 dias atrás",
  },
  {
    id: "2",
    content: "Muito interessante, nunca tinha pensado dessa forma.",
    user: {
      name: "João Pedro",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    date: "3 dias atrás",
  },
  {
    id: "3",
    content: "Acho que isso poderia ser ainda mais aprofundado com dados.",
    user: {
      name: "Ana Luiza",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    date: "5 dias atrás",
  },
  {
    id: "4",
    content: "Acho que isso poderia ser ainda mais aprofundado com dados.",
    user: {
      name: "Ana Luiza",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    date: "5 dias atrás",
  },
  {
    id: "5",
    content: "Acho que isso poderia ser ainda mais aprofundado com dados.",
    user: {
      name: "Ana Luiza",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    date: "5 dias atrás",
  },
  {
    id: "6",
    content: "Acho que isso poderia ser ainda mais aprofundado com dados.",
    user: {
      name: "Ana Luiza",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    date: "5 dias atrás",
  },
  {
    id: "7",
    content: "Acho que isso poderia ser ainda mais aprofundado com dados.",
    user: {
      name: "Ana Luiza",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    date: "5 dias atrás",
  },
];
