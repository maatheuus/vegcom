"use client";

import { useEffect, useState } from "react";
import type { GetEventsParams } from "../api/directoryApi";
import { useEvents } from "../api/queries/getDirectoryApiClient";
import { useUrlParams } from "./useUrlParams";

const EVENTS_PER_PAGE = 6;

type EventPeriod = NonNullable<GetEventsParams["period"]>;

/** Página de eventos de um período, sincronizada com o query param `urlKey`. */
export function usePaginatedEvents(period: EventPeriod, urlKey: string) {
  const { searchParams, setParams } = useUrlParams();
  const [page, setPageState] = useState(() =>
    Math.max(1, Number(searchParams.get(urlKey)) || 1),
  );
  const { data, isLoading, isFetching } = useEvents({
    page,
    limit: EVENTS_PER_PAGE,
    period,
  });
  const totalPages = data?.pagination.totalPages ?? 0;

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPageState(totalPages);
  }, [page, totalPages]);

  const setPage = (nextPage: number) => {
    setPageState(nextPage);
    setParams({ [urlKey]: nextPage === 1 ? null : String(nextPage) });
  };

  /** Volta para a primeira página sem mexer na URL (quem chama limpa o param). */
  const resetPage = () => setPageState(1);

  return {
    events: data?.data ?? [],
    total: data?.pagination.total ?? 0,
    totalPages,
    page,
    setPage,
    resetPage,
    isLoading,
    isFetching,
  };
}
