import { notificationsApi } from "@/features/community/api/notificationsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export type NotificationType =
  | "COMMENT_REPLY"
  | "COMMENT_LIKE"
  | "RECIPE_LIKE"
  | "POST_LIKE"
  | "FOLLOW"
  | "SYSTEM";

export interface Notification {
  id: number;
  type: NotificationType;
  userId: number;
  actorId: number;
  entityId?: number;
  entityType?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  actor: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
}

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (page: number, limit: number) =>
    ["notifications", "list", page, limit] as const,
  unreadCount: ["notifications", "unread-count"] as const,
};

export function useNotifications(page = 1, limit = 10) {
  const queryClient = useQueryClient();

  const { data: notificationsData } = useQuery({
    queryKey: notificationKeys.list(page, limit),
    queryFn: () => notificationsApi.getNotifications(page, limit),
    placeholderData: {
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    },
  });

  const { data: unreadCountData } = useQuery({
    queryKey: notificationKeys.unreadCount,
    queryFn: notificationsApi.getUnreadCount,
  });

  const markAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });

  const markAsRead = useCallback(
    (id: number) => {
      markAsReadMutation.mutate(String(id));
    },
    [markAsReadMutation],
  );

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  return {
    notifications: notificationsData?.data || [],
    meta: notificationsData?.meta,
    unreadCount: unreadCountData?.count || 0,
    markAsRead,
    markAllAsRead,
    isLoading: markAsReadMutation.isPending || markAllAsReadMutation.isPending,
  };
}
