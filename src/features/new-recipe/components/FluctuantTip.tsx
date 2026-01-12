"use client";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import { FlyingSaucerIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface FluctuantTipProps {
  tips?: string[];
}

type MenuPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const FluctuantTip = memo(function FluctuantTip({
  tips = [],
}: FluctuantTipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>("top-left");
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const calculatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const isRight = rect.left > viewportWidth / 2;
    const isBottom = rect.top > viewportHeight / 2;

    if (isRight && isBottom) setMenuPosition("top-left");
    else if (!isRight && isBottom) setMenuPosition("top-right");
    else if (isRight && !isBottom) setMenuPosition("bottom-left");
    else setMenuPosition("bottom-right");
  };

  const toggleOpen = () => {
    if (!isDragging) {
      if (!isOpen) {
        calculatePosition();
      }
      setIsOpen((prev) => !prev);
    }
  };

  const getMenuStyles = () => {
    switch (menuPosition) {
      case "top-left":
        return {
          bottom: "100%",
          right: 0,
          originX: 1,
          originY: 1,
          marginBottom: "16px",
        };
      case "top-right":
        return {
          bottom: "100%",
          left: 0,
          originX: 0,
          originY: 1,
          marginBottom: "16px",
        };
      case "bottom-left":
        return {
          top: "100%",
          right: 0,
          originX: 1,
          originY: 0,
          marginTop: "16px",
        };
      case "bottom-right":
        return {
          top: "100%",
          left: 0,
          originX: 0,
          originY: 0,
          marginTop: "16px",
        };
    }
  };

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        onDragStart={() => {
          setIsDragging(true);
          setIsOpen(false);
        }}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        className="pointer-events-auto absolute cursor-grab touch-none"
        style={{ right: 30, bottom: 100 }}
      >
        <div className="relative" ref={buttonRef}>
          <div onClick={toggleOpen}>
            <Button.Icon
              variant="filled"
              size="md"
              className={clsx(
                "group relative z-20 h-12 w-12 rounded-full shadow-lg transition-colors duration-300",
                {
                  "bg-green-50 hover:bg-green-200": isOpen,
                  "bg-green-200 hover:bg-green-500": !isOpen,
                },
              )}
              icon={
                <FlyingSaucerIcon
                  className={clsx("transition-colors duration-300", {
                    "text-green-200 group-hover:text-green-50": isOpen,
                    "text-green-50": !isOpen,
                  })}
                />
              }
              aria-label="Dicas"
            />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute w-[280px] rounded-xl bg-green-200 p-4 shadow-xl"
                style={getMenuStyles()}
              >
                <div className="space-y-3 text-green-50">
                  <div className="flex items-center justify-between border-b border-green-50/20 pb-2">
                    <Text
                      type={Text.Type.BodyThree}
                      weight={Text.Weight.Bold}
                      className="font-lora"
                    >
                      Dicas da Etapa
                    </Text>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                      }}
                      className="cursor-pointer text-green-50/70 hover:text-green-50"
                    >
                      ✕
                    </button>
                  </div>

                  {tips.length > 0 ? (
                    <ul className="font-maitree list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed">
                      {tips.map((tip, idx) => (
                        <li key={idx}>
                          <span className="text-green-50">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Text
                      type={Text.Type.BodyFour}
                      className="italic opacity-80"
                    >
                      Sem dicas para esta etapa.
                    </Text>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
});

export default FluctuantTip;
