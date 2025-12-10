"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 1200, suffix: "+", label: "Receitas" },
  { number: 10000, suffix: "+", label: "Membros da Comunidade" },
  { number: 4, suffix: ".8", label: "Avaliação Média" },
  { number: 50000, suffix: "+", label: "Visualizações Mensais" },
];

/**
 * StatsSection component for the landing page.
 * Displays key platform statistics with animated counters.
 * Uses GSAP for counting animations triggered by scroll.
 *
 * @returns {JSX.Element} The rendered Stats section.
 */
export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      stats.forEach((stat, index) => {
        const element = `.stat-number-${index}`;
        gsap.fromTo(
          element,
          { innerText: 0 },
          {
            innerText: stat.number,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
            onUpdate: function () {
              const value = Math.floor(this.targets()[0].innerText);
              this.targets()[0].innerText = value.toLocaleString();
            },
          },
        );
      });

      gsap.fromTo(
        ".stat-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
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
      className="bg-gradient-to-r from-green-500 to-green-600 py-20"
    >
      <div className="container__default">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-frank mb-2 text-4xl font-bold text-white md:text-5xl">
                <span className={`stat-number-${index}`}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="stat-label font-maitree text-lg text-green-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
