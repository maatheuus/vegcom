"use client";

import { useLogout as useClientLogout } from "@/features/auth/api/queries/getAuthApiClient";
import { useTransition } from "react";

export function useLogout() {
  const { mutateAsync: logout } = useClientLogout();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      window.location.href = "/login";
    });
  };

  return { handleLogout, isPending };
}
