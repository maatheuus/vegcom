"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "vegcom:community-sidebar-open";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useCommunitySidebar() {
  const [isOpen, setIsOpen] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsOpen(stored === "true");
    }
  }, []);

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return { isOpen, toggle };
}
