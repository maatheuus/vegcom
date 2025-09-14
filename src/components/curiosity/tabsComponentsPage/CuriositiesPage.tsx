import {
  ArrowsClockwiseOutlinedIcon,
  SparklesOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import React, { useEffect, useState } from "react";
import { defaultCuriosities } from "../curiosites/utils";

export interface Curiosity {
  id: string;
  category:
    | "história"
    | "saúde"
    | "cultura"
    | "estatística"
    | "personalidade"
    | "religião";
  title: string;
  description: string;
  year?: string;
  icon: React.ElementType;
  highlight?: string;
  source?: string;
}

export default function CuriositiesPage() {
  const [currentCuriosity, setCurrentCuriosity] = useState<Curiosity | null>(
    null
  );
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const generateCuriosity = () => {
    setIsAnimating(true);

    if (usedIds.size >= defaultCuriosities.length) {
      setUsedIds(new Set());
    }

    const availableCuriosities = defaultCuriosities.filter(
      (c) => !usedIds.has(c.id)
    );

    const randomIndex = Math.floor(Math.random() * availableCuriosities.length);
    const selected = availableCuriosities[randomIndex];

    setTimeout(() => {
      setCurrentCuriosity(selected);
      setUsedIds((prev) => new Set(prev).add(selected.id));
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    generateCuriosity();
  }, []);

  return (
    <div className="h-full overflow-auto">
      <main className="flex-1 h-full my-auto flex items-center justify-center">
        <div className="max-w-3xl w-full">
          {currentCuriosity && (
            <div
              className={`border border-green-50 px-8 pb-4 space-y-8 overflow-hidden transition-all duration-500 ${
                isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <div>
                <Text
                  as="h2"
                  type={Text.Type.HeadingFour}
                  weight={Text.Weight.Bold}
                  className="mb-4 text-green-500 bg-green-50 text-center"
                >
                  {currentCuriosity.title}
                </Text>

                <Text
                  type={Text.Type.BodyThree}
                  className="text-green-500 !leading-relaxed text-center"
                >
                  {currentCuriosity.description}
                </Text>

                {currentCuriosity.source && (
                  <p className="text-sm text-green-500 mt-6 pt-6 border-t border-gray-100 italic">
                    Fonte:{" "}
                    <strong className="text-green-500">
                      {currentCuriosity.source}
                    </strong>
                  </p>
                )}
              </div>

              <div className="w-full flex justify-between">
                {currentCuriosity.highlight && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1B4E30] to-[#5C8068] rounded-full border border-[#BECBBC]">
                    <SparklesOutlinedIcon size={16} className="text-green-50" />
                    <span className="text-sm font-semibold text-green-50">
                      {currentCuriosity.highlight}
                    </span>
                  </div>
                )}

                <Button
                  onClick={generateCuriosity}
                  disabled={isAnimating}
                  className="w-fit flex items-center ml-auto justify-center gap-3 px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                >
                  <ArrowsClockwiseOutlinedIcon
                    size={20}
                    className={
                      isAnimating
                        ? "animate-spin"
                        : "group-hover:rotate-180 transition-transform duration-300"
                    }
                  />
                  {usedIds.size >= defaultCuriosities.length
                    ? "Recomeçar do início"
                    : "Próxima Curiosidade"}
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 text-center">
            <Text
              as="p"
              type={Text.Type.BodyFour}
              className=" text-sm text-green-500"
            >
              <strong>Você sabia?</strong> O veganismo negro é um movimento de
              resistência que conecta justiça social, saúde e espiritualidade.
            </Text>
          </div>
        </div>
      </main>
    </div>
  );
}
