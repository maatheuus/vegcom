"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChefHat, Heart, Users } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Users,
    title: "Conexão Real",
    description:
      "Faça parte de uma comunidade vibrante. Troque dicas, tire dúvidas e faça amigos que compartilham o mesmo amor pela culinária vegetal.",
  },
  {
    icon: ChefHat,
    title: "Inspiração Diária",
    description:
      "Descubra milhares de receitas testadas e aprovadas pela comunidade. Do café da manhã rápido ao jantar especial, nunca falte criatividade.",
  },
  {
    icon: Heart,
    title: "Compartilhe sua Paixão",
    description:
      "O VegCom é o seu palco. Publique suas próprias criações, monte seu livro de receitas digital e inspire outras pessoas a comerem melhor.",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".features-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".features-title",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
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
    <section ref={containerRef} className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="features-title mb-16 text-center">
          <h2 className="font-frank text-4xl font-bold text-green-600 md:text-5xl">
            Muito mais que um livro de receitas
          </h2>
          <p className="font-maitree mt-4 text-lg text-gray-600">
            Um espaço feito por pessoas, para pessoas que amam cozinhar
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group rounded-3xl bg-green-50 p-8"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white transition-transform duration-300 group-hover:scale-110">
                <feature.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="font-lora mb-4 text-2xl font-bold text-green-800">
                {feature.title}
              </h3>
              <p className="font-maitree leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
