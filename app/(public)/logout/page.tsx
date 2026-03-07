"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-lora mb-2 text-2xl font-semibold text-green-500">
          Saindo...
        </h1>
        <p className="font-maitree text-green-200">
          Você será redirecionado em instantes.
        </p>
      </div>
    </div>
  );
}
