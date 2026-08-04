"use client";

import { useState, useEffect, useCallback } from "react";

export type GeolocationState = "idle" | "loading" | "success" | "denied" | "error";

interface UseGeolocationReturn {
  position: [number, number] | null;
  state: GeolocationState;
  request: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [state, setState] = useState<GeolocationState>("idle");

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState("denied");
      return;
    }

    setState("loading");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setState("success");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState("denied");
        } else {
          setState("error");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  return { position, state, request };
}
