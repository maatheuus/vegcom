import { useCallback, useState } from "react";

export type NotificationType = "COMMENT_REPLY" | "COMMENT_LIKE" | "RECIPE_LIKE" | "FOLLOW" | "SYSTEM";

export interface Notification {
  id: string;
  type: NotificationType;
  actorId: string;
  actorName: string;
  actorAvatar?: string;
  entityId?: string;
  entityName?: string;
  message: string;
  timestamp: string; // ISO string in real app, relative time in mock for now
  isRead: boolean;
}

// Mock Data matching the specs
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "COMMENT_REPLY",
    actorId: "u1",
    actorName: "Maria Silva",
    message: "respondeu seu comentário",
    entityName: "Feijoada Vegana",
    timestamp: "2 min atrás",
    isRead: false,
  },
  {
    id: "2",
    type: "RECIPE_LIKE",
    actorId: "u2",
    actorName: "João Santos",
    message: "curtiu sua receita",
    entityName: "Bolo de Chocolate Fit",
    timestamp: "15 min atrás",
    isRead: false,
  },
  {
    id: "3",
    type: "COMMENT_REPLY",
    actorId: "u3",
    actorName: "Ana Costa",
    message: "respondeu seu comentário",
    entityName: "Smoothie Verde Energético",
    timestamp: "1 hora atrás",
    isRead: true,
  },
  {
    id: "4",
    type: "RECIPE_LIKE",
    actorId: "u4",
    actorName: "Pedro Oliveira",
    message: "curtiu sua receita",
    entityName: "Hambúrguer de Grão-de-Bico",
    timestamp: "3 horas atrás",
    isRead: true,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    // In a real app, this would be an API call: PATCH /notifications/:id/read
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    // In a real app, this would be an API call: PATCH /notifications/read-all
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
