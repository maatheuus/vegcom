import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateDirectoryEventPayload,
  CreatePlacePayload,
  CreatePlaceReportFollowUpPayload,
  CreatePlaceReportPayload,
  UpdateDirectoryEventPayload,
} from "../../types";
import { directoryApi, type GetEventsParams } from "../directoryApi";

export const directoryKeys = {
  all: ["directory"] as const,
  places: ["directory", "places"] as const,
  events: ["directory", "events"] as const,
};

export const usePlaces = () => {
  return useQuery({
    queryKey: directoryKeys.places,
    queryFn: () => directoryApi.getPlaces(),
    staleTime: 60_000,
  });
};

export const useCreatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlacePayload) =>
      directoryApi.createPlace(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: directoryKeys.places });
    },
  });
};

export const useReportPlace = () => {
  return useMutation({
    mutationFn: (payload: CreatePlaceReportPayload) =>
      directoryApi.reportPlace(payload),
  });
};

export const usePlaceReportFollowUp = () => {
  return useMutation({
    mutationFn: (payload: CreatePlaceReportFollowUpPayload) =>
      directoryApi.followUpOnPlaceReport(payload),
  });
};

export const useEvents = (
  params: Required<GetEventsParams>,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: [...directoryKeys.events, params],
    queryFn: () => directoryApi.getEvents(params),
    staleTime: 60_000,
    enabled: options?.enabled ?? true,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDirectoryEventPayload) =>
      directoryApi.createEvent(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: directoryKeys.events });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      payload,
    }: {
      eventId: number;
      payload: UpdateDirectoryEventPayload;
    }) => directoryApi.updateEvent(eventId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: directoryKeys.events });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: directoryApi.deleteEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: directoryKeys.events });
    },
  });
};
