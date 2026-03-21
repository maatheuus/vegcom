"use client";

import type { Recipe } from "@/entities/recipe";
import { RecipeGrid } from "@/features/recipes/components/RecipeGrid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface MostViewedClientProps {
  recipes: Recipe[];
}

export function MostViewedClient({ recipes }: MostViewedClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".most-viewed-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".most-viewed-title",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".most-viewed-grid",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".most-viewed-grid",
            start: "top 75%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-white to-green-50 py-24"
    >
      <div className="container__default">
        <div className="most-viewed-title mb-16 text-center">
          <h2 className="font-frank text-4xl font-bold text-green-600 md:text-5xl">
            Receitas Mais Visualizadas
          </h2>
          <p className="font-maitree mt-4 text-lg text-gray-600">
            Favoritas da comunidade que você precisa experimentar
          </p>
        </div>

        <div className="most-viewed-grid">
          <RecipeGrid recipes={recipes} />
        </div>
      </div>
    </section>
  );
}
