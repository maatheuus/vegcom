import { notificationsApi } from "@/features/community/api/notificationsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

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
  createdAt: string;
  isRead: boolean;
}

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (page: number, limit: number) => ["notifications", "list", page, limit] as const,
  unreadCount: ["notifications", "unread-count"] as const,
};

export function useNotifications(page = 1, limit = 10) {
  const queryClient = useQueryClient();

  const { data: notificationsData } = useQuery({
    queryKey: notificationKeys.list(page, limit),
    queryFn: () => notificationsApi.getNotifications(page, limit),
    // Placeholder data to prevent crash if backend not ready, or remove if strict
    placeholderData: { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } }
  });

  const { data: unreadCountData } = useQuery({
    queryKey: notificationKeys.unreadCount,
    queryFn: notificationsApi.getUnreadCount,
    // Polling could be enabled here for real-time-ish updates
    // refetchInterval: 30000
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

  const markAsRead = useCallback((id: string) => {
    markAsReadMutation.mutate(id);
  }, [markAsReadMutation]);

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  return {
    notifications: notificationsData?.data || [],
    meta: notificationsData?.meta,
    unreadCount: unreadCountData?.count || 0,
    markAsRead,
    markAllAsRead,
    isLoading: markAsReadMutation.isPending || markAllAsReadMutation.isPending
  };
}
