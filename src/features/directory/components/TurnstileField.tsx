"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type TurnstileMode = "invisible" | "visible";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          appearance: "interaction-only" | "always";
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileFieldProps {
  mode: TurnstileMode;
  onToken: (token?: string) => void;
}

export function TurnstileField({ mode, onToken }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const container = containerRef.current;
    if (!siteKey || !container) {
      setHasError(true);
      return;
    }

    let widgetId: string | undefined;
    let active = true;
    onToken(undefined);

    const render = () => {
      if (!active || !window.turnstile || !containerRef.current) return;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "turnstile-spin-v2",
        appearance: mode === "visible" ? "always" : "interaction-only",
        callback: (token) => onToken(token),
        "error-callback": () => setHasError(true),
        "expired-callback": () => onToken(undefined),
      });
    };

    void loadTurnstile()
      .then(render)
      .catch(() => setHasError(true));

    return () => {
      active = false;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [mode, onToken]);

  if (hasError) {
    return (
      <p className="text-xs text-red-600" role="alert">
        Não foi possível carregar a verificação. Tente novamente em instantes.
      </p>
    );
  }

  return (
    <div
      className={clsx(mode === "invisible" && "h-0 overflow-hidden")}
      aria-label="Verificação de segurança"
    >
      {mode === "visible" && (
        <p className="mb-2 text-xs text-green-600">
          Confirme a verificação de segurança para enviar outro relato hoje.
        </p>
      )}
      <div
        ref={containerRef}
        className="cf-turnstile"
        data-action="turnstile-spin-v2"
      />
    </div>
  );
}

let turnstileLoader: Promise<void> | undefined;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (turnstileLoader) return turnstileLoader;

  turnstileLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
  return turnstileLoader;
}
