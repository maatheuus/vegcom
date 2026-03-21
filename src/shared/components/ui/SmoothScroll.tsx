"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  if (!isLandingPage) return null;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: "vertical",
        autoRaf: true,
      }}
      ref={lenisRef}
    />
  );
}
