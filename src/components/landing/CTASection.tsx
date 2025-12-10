"use client";

import Button from "@/shared/ui/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Call-to-Action (CTA) section for the landing page.
 * Encourages users to sign up or explore recipes.
 * Uses GSAP for entry animations.
 *
 * @returns {JSX.Element} The rendered CTA section.
 */
export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-content",
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-green-600 py-24"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-white blur-3xl" />
      </div>

      <div className="cta-content relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-frank mb-6 text-4xl font-bold text-white md:text-6xl">
          Pronto para Começar Sua
          <br />
          Jornada Culinária?
        </h2>
        <p className="font-maitree mb-10 text-xl text-green-100">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button.Animated
            variation="light"
            text="Junte-se à Comunidade"
            href="/signup"
          />
          <Button.Animated
            variation="dark"
            text="Explorar Receitas"
            href="/recipes"
          />
        </div>
      </div>
    </section>
  );
}
