import { UserProfileDetails } from "../types";
import { food } from "@/assets";

export const mockUserProfileData: UserProfileDetails = {
  id: "1",
  name: "Chef Emma",
  avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  bio: "Apaixonada por gastronomia e por criar receitas que trazem memórias felizes. Sempre testando novos ingredientes e compartilhando dicas de culinária para todos os níveis.",
  recipes: [
    {
      id: "101",
      title: "Creamy Mushroom Risotto",
      imageUrl: food,
      user: {
        name: "Chef Emma",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      rating: 4.8,
      views: 1320,
      isFavorite: true,
    },
    {
      id: "102",
      title: "Spicy Thai Noodles",
      imageUrl: food,
      user: {
        name: "Chef Emma",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      rating: 4.5,
      views: 950,
      isFavorite: false,
    },
  ],
  posts: [
    {
      id: 201,
      postTitle: "Dicas para o risoto perfeito!",
      postContent: {
        type: "TEXT",
        postResources: {
          content: "A dica de ouro é nunca lavar o arroz arbório. O amido é o que dá a cremosidade perfeita ao prato. Além disso, sempre adicione o caldo aos poucos, sempre quente!",
        },
      },
      postDate: new Date().toISOString(),
      user: {
        id: "1",
        name: "Chef Emma",
        urlImage: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      likes: [],
      savedBy: [],
      postLikes: 42,
      comments: {
        commentsNumber: 5,
        comments: [
          {
            id: 1,
            date: new Date().toISOString(),
            comment: "Ótima dica!",
            user: {
              name: "John Doe",
              urlImage: "https://randomuser.me/api/portraits/men/32.jpg"
            }
          }
        ]
      }
    }
  ]
};
