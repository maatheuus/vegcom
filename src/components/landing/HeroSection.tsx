"use client";

import Button from "@/shared/ui/Button";
import { useGSAP } from "@gsap/react";
import { MouseScrollIcon } from "@phosphor-icons/react";
import gsap from "gsap";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        );

      // Scroll indicator animation
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-green-100 to-green-100 px-4 text-center"
    >
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-green-300 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-green-400 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-200 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl space-y-8">
        <h1 className="hero-title font-frank text-5xl leading-tight font-bold text-green-600 md:text-7xl lg:text-8xl">
          Descubra Deliciosas
          <br />
          <span className="text-green-500">Receitas Vegetarianas</span>
        </h1>

        <p className="hero-subtitle font-maitree mx-auto max-w-2xl text-xl text-gray-700 md:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="hero-cta">
          <Button.Animated text="Explorar Receitas" href="/recipes" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-green-500"
      >
        <MouseScrollIcon size={32} />
      </div>
    </section>
  );
}
