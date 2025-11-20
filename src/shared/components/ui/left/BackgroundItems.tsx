"use client";

import Text from "@/shared/ui/Text";
import { motion } from "framer-motion";

const letters = [
  { char: "S", className: "home-s" },
  { char: "A", className: "home-a" },
  { char: "U", className: "home-u" },
  { char: "D", className: "home-d" },
  { char: "E", className: "home-e" },
];

export default function BackgroundItems() {
  return (
    <>
      {letters.map((letter, index) => (
        <motion.div
          key={letter.char}
          className={letter.className}
          initial={{ opacity: 0, y: -100, rotate: -15 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
            opacity: {
              duration: 4 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            opacity: 0.9,
            transition: { duration: 0.3 },
          }}
        >
          <Text
            weight={Text.Weight.Bold}
            className="font-rancho !text-[318px] text-green-200/80 uppercase"
          >
            {letter.char}
          </Text>
        </motion.div>
      ))}
    </>
  );
}
