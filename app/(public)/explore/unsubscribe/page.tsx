"use client";

import { directoryApi } from "@/features/directory/api/directoryApi";
import { useEffect, useState } from "react";

export default function DirectoryReportUnsubscribePage() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setComplete(true);
      return;
    }

    void directoryApi.unsubscribeFromPlaceReport(token).finally(() => {
      setComplete(true);
    });
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl items-center px-6">
      <p className="text-center text-green-800" role="status">
        {complete
          ? "Você não receberá novos emails de acompanhamento deste relato."
          : "Atualizando sua preferência..."}
      </p>
    </main>
  );
}
