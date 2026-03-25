"use client";

import { logout } from "@/features/auth/api/queries/getAuthApiServer";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";

export function useLogout() {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    queryClient.clear();
    startTransition(() => {
      logout();
    });
  };

  return { handleLogout, isPending };
}
