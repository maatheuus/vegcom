import { api } from "@/shared/api/axios/axiosInstance";
import type { Notification } from "@/features/community/hooks/useNotifications";

export interface NotificationsResponse {
  data: Notification[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UnreadCountResponse {
  count: number;
}

export const notificationsApi = {
  getNotifications: async (page = 1, limit = 10) => {
    const { data } = await api.get<NotificationsResponse>(
      `/notifications?page=${page}&limit=${limit}`,
    );
    return data;
  },

  getUnreadCount: async () => {
    const { data } = await api.get<UnreadCountResponse>("/notifications/unread-count");
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.patch<{ success: boolean }>(`/notifications/${id}/read`);
    return data;
  },

  markAllAsRead: async () => {
    const { data } = await api.patch<{ success: boolean; count: number }>(
      "/notifications/read-all",
    );
    return data;
  },
};
