import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { directoryApi } from "../directoryApi";
import type {
  CreateDirectoryEventPayload,
  CreatePlacePayload,
  CreatePlaceReportPayload,
  DirectoryEvent,
  UpdateDirectoryEventPayload,
} from "../../types";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlaceReportPayload) =>
      directoryApi.reportPlace(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: directoryKeys.places });
    },
  });
};

export const useEvents = () => {
  return useQuery({
    queryKey: directoryKeys.events,
    queryFn: directoryApi.getEvents,
    staleTime: 60_000,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDirectoryEventPayload) =>
      directoryApi.createEvent(payload),
    onSuccess: (event) => {
      queryClient.setQueryData<DirectoryEvent[]>(
        directoryKeys.events,
        (current = []) => [
          event,
          ...current.filter((item) => item.id !== event.id),
        ],
      );
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
    onSuccess: (event) => {
      queryClient.setQueryData<DirectoryEvent[]>(
        directoryKeys.events,
        (current = []) =>
          current.map((item) => (item.id === event.id ? event : item)),
      );
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: directoryApi.deleteEvent,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<DirectoryEvent[]>(
        directoryKeys.events,
        (current = []) => current.filter((item) => item.id !== id),
      );
    },
  });
};
