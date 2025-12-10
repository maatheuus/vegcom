"use client";

import { useGSAP } from "@gsap/react";
import {
  CarrotIcon,
  CoffeeIcon,
  IceCreamIcon,
  LeafIcon,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Café da Manhã",
    icon: CoffeeIcon,
    href: "/recipes?category=breakfast",
  },
  { name: "Vegano", icon: LeafIcon, href: "/recipes?category=vegan" },
  {
    name: "Sobremesas",
    icon: IceCreamIcon,
    href: "/recipes?category=desserts",
  },
  { name: "Saladas", icon: CarrotIcon, href: "/recipes?category=salads" },
];

/**
 * CategoriesSection component for the landing page.
 * Displays a grid of recipe categories as clickable cards.
 * Uses GSAP for entry animations.
 *
 * @returns {JSX.Element} The rendered Categories section.
 */
export function CategoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".category-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".category-title",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".category-card",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-green-100 to-white py-24"
    >
      <div className="container__default">
        <div className="category-title mb-16 text-center">
          <h2 className="font-frank text-4xl font-bold text-green-600 md:text-5xl">
            Navegue por Categoria
          </h2>
          <p className="font-maitree mt-4 text-lg text-gray-600">
            Encontre a receita perfeita para qualquer ocasião
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="category-card group relative flex w-full max-w-32 flex-col items-center justify-center gap-4 rounded-3xl border border-white/60 bg-white p-6 shadow-lg shadow-green-900/5 transition-all duration-300 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
                <category.icon size={28} strokeWidth={2} />
              </div>
              <span className="font-maitree text-center text-sm font-bold text-green-500 transition-colors group-hover:text-green-700 sm:text-base">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
