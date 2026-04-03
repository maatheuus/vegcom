"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { getAccessToken } from "@/shared/api/axios/axiosInstance";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirectedRef = useRef(false);
  const token = getAccessToken();
  const { data: user, isLoading, isFetching, isError } = useGetUser();

  useEffect(() => {
    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";

    if (hasRedirectedRef.current) return;

    if (!token) {
      hasRedirectedRef.current = true;
      router.replace(`/login${next}`);
      return;
    }

    if (!isLoading && !isFetching && (isError || !user)) {
      hasRedirectedRef.current = true;
      router.replace(`/login${next}`);
    }
  }, [isError, isFetching, isLoading, pathname, router, token, user]);

  if (!token) {
    return null;
  }

  if (isLoading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="font-lora text-lg text-green-500 italic">
          Carregando...
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return null;
  }

  return children;
}
