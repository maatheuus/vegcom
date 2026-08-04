import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateDirectoryEventPayload,
  CreatePlacePayload,
  CreatePlaceReportPayload,
  DirectoryEvent,
  Place,
  PlaceCategory,
  PlaceStatus,
  UpdateDirectoryEventPayload,
} from "../types";

export interface GetPlacesParams {
  category?: PlaceCategory;
  status?: PlaceStatus;
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

  reportPlace: async ({
    placeId,
    ...payload
  }: CreatePlaceReportPayload): Promise<Place> => {
    const { data } = await api.post<Place>(
      `/directory/places/${placeId}/reports`,
      payload,
    );
    return data;
  },

  getEvents: async (): Promise<DirectoryEvent[]> => {
    const { data } = await api.get<DirectoryEvent[]>("/directory/events");
    return data ?? [];
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
