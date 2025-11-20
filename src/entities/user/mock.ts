/**
 * Mock user data
 */

import type { User, UserProfile } from "./types";

export const mockUsers: User[] = [
  {
    id: "user_1",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Food enthusiast and recipe creator",
    location: "São Paulo, SP",
    culinaryLevel: "advanced",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "user_2",
    name: "Liam Smith",
    email: "liam.smith@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Chef and cooking instructor",
    location: "Rio de Janeiro, RJ",
    culinaryLevel: "professional",
    createdAt: "2024-02-20T14:20:00Z",
    updatedAt: "2024-02-20T14:20:00Z",
  },
  {
    id: "user_3",
    name: "Maria Clara",
    email: "maria.clara@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Passionate about healthy cooking",
    location: "Belo Horizonte, MG",
    culinaryLevel: "intermediate",
    createdAt: "2024-03-10T09:15:00Z",
    updatedAt: "2024-03-10T09:15:00Z",
  },
];

export const mockCurrentUser: UserProfile = {
  id: "user_current",
  name: "You",
  email: "you@example.com",
  avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
  bio: "Vegan food lover",
  location: "São Paulo, SP",
  culinaryLevel: "intermediate",
  recipesCount: 12,
  followersCount: 234,
  followingCount: 156,
  favoritesCount: 45,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};
