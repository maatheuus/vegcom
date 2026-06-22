"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/**
 * Fires the Google Ads `conversion_event_page_view` conversion once on mount.
 * The gtag.js base script is loaded globally in the root layout.
 */
export default function GtagPageViewConversion() {
  useEffect(() => {
    window.gtag?.("event", "conversion_event_page_view", {});
  }, []);

  return null;
}
