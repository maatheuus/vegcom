"use client";

import { useCallback, useEffect, useState } from "react";

export type GeolocationState =
  | "checking"
  | "idle"
  | "loading"
  | "success"
  | "denied"
  | "error"
  | "skipped";

interface UseGeolocationReturn {
  position: [number, number] | null;
  state: GeolocationState;
  request: () => void;
  skip: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [state, setState] = useState<GeolocationState>("checking");

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
    let isActive = true;

    if (!navigator.permissions) {
      setState("idle");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permission) => {
        if (!isActive) return;
        if (permission.state === "granted") {
          request();
        } else {
          setState("idle");
        }
      })
      .catch(() => {
        if (isActive) setState("idle");
      });

    return () => {
      isActive = false;
    };
  }, [request]);

  const skip = useCallback(() => setState("skipped"), []);

  return { position, state, request, skip };
}
