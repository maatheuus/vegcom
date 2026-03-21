import Text from "@/shared/ui/Text";
import { motion } from "framer-motion";

const letters = [
  { char: "S", className: "home-s" },
  { char: "A", className: "home-a" },
  { char: "Ú", className: "home-u" },
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
          initial={{
            opacity: 0,
            y: index % 2 === 0 ? -100 : 100,
          }}
          animate={{
            opacity: 0.5,
            y: 0,
          }}
          transition={{
            type: "spring",
            damping: 8,
            stiffness: 120,
            delay: 0.8 + index * 0.1,
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
