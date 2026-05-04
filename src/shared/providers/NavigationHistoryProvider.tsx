"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

interface NavigationHistoryContextValue {
  previousPath: string | null;
  goBack: (fallback?: string) => void;
}

const NavigationHistoryContext =
  createContext<NavigationHistoryContextValue | null>(null);

export function NavigationHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    const prev = historyRef.current.at(-1);
    if (prev !== pathname) {
      historyRef.current = [...historyRef.current, pathname];
    }
  }, [pathname]);

  const goBack = useCallback(
    (fallback = "/") => {
      const history = historyRef.current;

      if (history.length >= 2) {
        const previous = history[history.length - 2];
        historyRef.current = history.slice(0, -1);
        router.push(previous);
      } else {
        router.push(fallback);
      }
    },
    [router],
  );

  const previousPath =
    historyRef.current.length >= 2
      ? historyRef.current[historyRef.current.length - 2]
      : null;

  return (
    <NavigationHistoryContext.Provider value={{ previousPath, goBack }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  const ctx = useContext(NavigationHistoryContext);
  if (!ctx) throw new Error("useNavigationHistory must be used inside NavigationHistoryProvider");
  return ctx;
}
