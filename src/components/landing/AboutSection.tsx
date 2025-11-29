"use client";

import { food } from "@/assets/index";
import { useGSAP } from "@gsap/react";
import { ForkKnifeIcon, HeartIcon, UsersIcon } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const points = [
  {
    icon: ForkKnifeIcon,
    title: "Compartilhe Suas Criações",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
  },
  {
    icon: UsersIcon,
    title: "Conecte-se com Outros",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    icon: HeartIcon,
    title: "Coma Saudável",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
  },
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-image",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".about-content",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".about-point",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".about-content",
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
      className="relative overflow-hidden bg-gradient-to-b from-green-50 to-green-100 py-24"
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-green-300 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-green-400 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center">
        <div className="about-image">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-200 shadow-2xl">
            <Image
              src={food.src}
              alt="Community cooking"
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-6 -bottom-6 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gray-300"
                  />
                ))}
              </div>
              <div>
                <p className="font-bold text-green-900">10k+</p>
                <p className="text-xs text-green-600">Cozinheiros Felizes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-content space-y-8">
          <div>
            <h2 className="font-frank text-4xl font-bold text-green-600 md:text-5xl">
              Mais do que Apenas Receitas,
              <br />É uma Comunidade
            </h2>
            <p className="font-maitree mt-6 text-lg leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>

          <div className="space-y-6">
            {points.map((item) => (
              <div key={item.title} className="about-point flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-lora text-xl font-bold text-green-800">
                    {item.title}
                  </h3>
                  <p className="font-maitree text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
