"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Aviso discreto de novidade — um pill fino que se mistura à página,
 * mas com um ponto pulsante e o selo "Novo" para puxar o olhar.
 */
export function ExploreCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex justify-center"
    >
      <Link
        href="/explore"
        className={[
          "group inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3.5 pr-3 text-sm",
          "border border-green-200 bg-white/60 shadow-sm backdrop-blur-sm",
          "transition-all duration-300 hover:bg-white hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2",
        ].join(" ")}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-green-200">
          Novo
        </span>
        <span className="hidden h-3.5 w-px bg-green-200 sm:block" aria-hidden />
        <span className="text-green-500">
          Conheça o{" "}
          <em
            className="italic text-black-100"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            mapa vegano
          </em>{" "}
          do Brasil
        </span>
        <ArrowRight
          className="h-3.5 w-3.5 text-green-500 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}
