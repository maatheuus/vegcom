"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export default function ProgressProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider
      height="4px"
      color="#276b37"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
