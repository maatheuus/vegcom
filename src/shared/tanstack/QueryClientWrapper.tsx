"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Initialize the QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable auto-refetch on window focus
    },
  },
});

/**
 * Wrapper component that provides the TanStack Query Client to the application.
 * It also includes the React Query Devtools for development.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to wrap.
 * @returns {JSX.Element} The QueryClientProvider wrapping the children.
 */
export default function QueryClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
