"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function ScrollMouse({ size = 24, ...props }: Props) {
  const scrollRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    const el = scrollRef.current;
    if (!el) return;

    gsap.set(el, {
      transformBox: "fill-box",
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

    tl.fromTo(
      el,
      { y: -8, opacity: 0 },
      { y: 8, opacity: 1, duration: 0.8, ease: "power1.out" },
    ).to(el, {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
      {...props}
    >
      <path
        d="M144,16H112A64.07,64.07,0,0,0,48,80v96a64.07,64.07,0,0,0,64,64h32a64.07,64.07,0,0,0,64-64V80A64.07,64.07,0,0,0,144,16Zm48,160a48.05,48.05,0,0,1-48,48H112a48.05,48.05,0,0,1-48-48V80a48.05,48.05,0,0,1,48-48h32a48.05,48.05,0,0,1,48,48Z"
        fill="currentColor"
      />
      <path
        ref={scrollRef}
        d="M136,83.31v89.38l10.34-10.35a8,8,0,0,1,11.32,11.32l-24,24a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L120,172.69V83.31L109.66,93.66A8,8,0,0,1,98.34,82.34l24-24a8,8,0,0,1,11.32,0l24,24a8,8,0,0,1-11.32,11.32Z"
        fill="currentColor"
      />
    </svg>
  );
}
