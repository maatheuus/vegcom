import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateDirectoryEventPayload,
  CreatePlacePayload,
  CreatePlaceReportFollowUpPayload,
  CreatePlaceReportPayload,
  DirectoryEvent,
  DirectoryEventsPage,
  Place,
  PlaceCategory,
  PlaceReportReceipt,
  UpdateDirectoryEventPayload,
} from "../types";

export interface GetPlacesParams {
  category?: PlaceCategory;
}

export interface GetEventsParams {
  page?: number;
  limit?: number;
  period?: "upcoming" | "past";
}

export const directoryApi = {
  getPlaces: async (params?: GetPlacesParams): Promise<Place[]> => {
    const { data } = await api.get<Place[]>("/directory/places", { params });
    return data ?? [];
  },

  createPlace: async (payload: CreatePlacePayload): Promise<Place> => {
    const { data } = await api.post<Place>("/directory/places", payload);
    return data;
  },

  deletePlace: async (placeId: number): Promise<{ id: number }> => {
    const { data } = await api.delete<{ id: number }>(
      `/directory/places/${placeId}`,
    );
    return data;
  },

  reportPlace: async ({
    placeId,
    ...payload
  }: CreatePlaceReportPayload): Promise<PlaceReportReceipt> => {
    const { data } = await api.post<PlaceReportReceipt>(
      `/directory/places/${placeId}/reports`,
      payload,
    );
    return data;
  },

  followUpOnPlaceReport: async (
    payload: CreatePlaceReportFollowUpPayload,
  ): Promise<{ received: true }> => {
    const { data } = await api.post<{ received: true }>(
      "/directory/reports/follow-up",
      payload,
    );
    return data;
  },

  unsubscribeFromPlaceReport: async (
    token: string,
  ): Promise<{ received: true }> => {
    const { data } = await api.post<{ received: true }>(
      "/directory/reports/unsubscribe",
      { token },
    );
    return data;
  },

  getEvents: async (params: GetEventsParams): Promise<DirectoryEventsPage> => {
    const { data } = await api.get<DirectoryEventsPage | DirectoryEvent[]>(
      "/directory/events",
      { params },
    );

    if (!Array.isArray(data)) return data;

    const page = params.page ?? 1;
    const limit = params.limit ?? data.length;
    const now = Date.now();
    const periodEvents = data.filter((event) => {
      const eventDate = new Date(event.date).getTime();

      if (params.period === "upcoming") return eventDate >= now;
      if (params.period === "past") return eventDate < now;
      return true;
    });
    const orderedEvents = [...periodEvents].sort((first, second) => {
      const firstDate = new Date(first.date).getTime();
      const secondDate = new Date(second.date).getTime();

      return params.period === "past"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
    const total = orderedEvents.length;

    return {
      data: orderedEvents.slice((page - 1) * limit, page * limit),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  createEvent: async (
    payload: CreateDirectoryEventPayload,
  ): Promise<DirectoryEvent> => {
    const { data } = await api.post<DirectoryEvent>(
      "/directory/events",
      payload,
    );
    return data;
  },

  updateEvent: async (
    eventId: number,
    payload: UpdateDirectoryEventPayload,
  ): Promise<DirectoryEvent> => {
    const { data } = await api.patch<DirectoryEvent>(
      `/directory/events/${eventId}`,
      payload,
    );
    return data;
  },

  deleteEvent: async (eventId: number): Promise<{ id: number }> => {
    const { data } = await api.delete<{ id: number }>(
      `/directory/events/${eventId}`,
    );
    return data;
  },
};
