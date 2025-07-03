"use client";

import useDraggable from "@/hooks/useDraggable";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { memo, useRef } from "react";
import { FlyingSaucerOutlinedIcon } from "../icons";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/Tooltip";

const tipList = [
  "Escolha um nome claro e descritivo para a receita.",
  "Adicione imagens com boa iluminação e qualidade.",
  "Defina o tempo de preparo para ajudar no planejamento.",
  "Classifique sua receita com uma categoria (ex: almoço, sobremesa).",
  "Inclua ingredientes em ordem de uso para facilitar a leitura.",
  "Escreva instruções simples e passo a passo.",
  "Use notas de preparo para compartilhar truques ou sugestões extras.",
  "Avalie e revise sua receita antes de publicar.",
];

const FluctuantTip = memo(function FluctuantTip() {
  const {
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    containerStyle,
    isDragging,
    isMenuOpen,
    dragRef,
    menuStyle,
  } = useDraggable();

  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dragRef}
      className="w-full m-0 right-0 -top-1"
      style={containerStyle}
    >
      <TooltipProvider delayDuration={1000}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Button.Icon
                variant="filled"
                size="md"
                className={clsx("group rounded-full relative z-10 touch-auto", {
                  "bg-green-50 hover:bg-green-200": isMenuOpen,
                  "bg-green-200": !isMenuOpen,
                })}
                icon={
                  <FlyingSaucerOutlinedIcon
                    className={clsx("", {
                      "text-green-50": !isMenuOpen,
                      "text-green-200 group-hover:text-green-50": isMenuOpen,
                    })}
                  />
                }
                aria-label="Receber dicas"
              />
            </div>
          </TooltipTrigger>
          {!isDragging && !isMenuOpen && (
            <TooltipContent className="bg-green-200 text-green-50">
              <span className="text-sm font-medium">Dicas rápidas</span>
            </TooltipContent>
          )}
        </Tooltip>
        <div
          ref={menuRef}
          className={clsx(
            "bg-green-200 rounded-lg transition-all duration-200 ease-in-out absolute z-0 min-w-[250px] max-w-[300px] h-fit overflow-hidden",
            isMenuOpen ? "scale-100" : "scale-0",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          style={menuStyle}
        >
          <div
            ref={contentRef}
            className="p-3 pt-10 w-full h-full text-green-50 space-y-4"
          >
            <Text type={Text.Type.BodyThree} weight={Text.Weight.Medium}>
              Dicas rápidas para você turbinar sua receita.
            </Text>

            <ul className="list-inside list-decimal font-normal font-frank">
              {tipList.map((tip, idx) => (
                <li key={idx}>
                  <Text as="span" type={Text.Type.BodyFour}>
                    {tip}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
});

export default FluctuantTip;
