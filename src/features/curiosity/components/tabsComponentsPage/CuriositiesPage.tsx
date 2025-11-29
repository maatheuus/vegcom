"use client";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import { ArrowClockwiseIcon, SparkleIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { defaultCuriosities, didYouKnowPhrases } from "../curiosites/utils";

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
  highlight?: string;
  source?: string;
}

export default function CuriositiesPage() {
  const [currentCuriosity, setCurrentCuriosity] = useState<Curiosity | null>(
    null,
  );
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phraseKey, setPhraseKey] = useState(0);

  const generateCuriosity = () => {
    setIsAnimating(true);

    if (usedIds.size >= defaultCuriosities.length) {
      setUsedIds(new Set());
    }

    const availableCuriosities = defaultCuriosities.filter(
      (c) => !usedIds.has(c.id),
    );

    const randomIndex = Math.floor(Math.random() * availableCuriosities.length);
    const selected = availableCuriosities[randomIndex];

    const nextPhraseIndex = (currentPhraseIndex + 1) % didYouKnowPhrases.length;

    setTimeout(() => {
      setCurrentCuriosity(selected);
      setUsedIds((prev) => new Set(prev).add(selected.id));
      setCurrentPhraseIndex(nextPhraseIndex);
      setPhraseKey((prev) => prev + 1);
      setIsAnimating(false);
    }, 400);
  };

  useEffect(() => {
    generateCuriosity();
  }, []);

  return (
    <div className="h-full overflow-auto">
      <main className="my-auto flex h-full flex-1 items-center justify-center">
        <div className="w-full max-w-3xl space-y-6">
          {currentCuriosity && (
            <div
              className={`space-y-8 overflow-hidden px-8 transition-all duration-500 ${
                isAnimating
                  ? "scale-95 opacity-0 blur-sm"
                  : "blur-0 scale-100 opacity-100"
              }`}
            >
              <div className="flex justify-center">
                <span className="inline-flex items-center rounded-full bg-green-500 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase shadow-sm">
                  {currentCuriosity.category}
                </span>
              </div>

              <div className="space-y-6">
                <Text
                  as="h2"
                  type={Text.Type.HeadingFour}
                  weight={Text.Weight.Bold}
                  className="font-lora text-center text-2xl leading-tight text-green-600 md:text-3xl"
                >
                  {currentCuriosity.title}
                </Text>

                <Text
                  type={Text.Type.BodyThree}
                  className="font-maitree text-center text-lg !leading-relaxed text-gray-700"
                >
                  {currentCuriosity.description}
                </Text>

                {currentCuriosity.source && (
                  <div className="mt-6 border-t border-green-200/30 p-4">
                    <p className="font-lora text-sm text-green-200 italic">
                      Fonte:{" "}
                      <strong className="font-semibold text-green-500">
                        {currentCuriosity.source}
                      </strong>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                {currentCuriosity.highlight && (
                  <div className="pointer-events-none inline-flex items-center gap-2 rounded-full border-2 border-green-200 bg-gradient-to-r from-green-600 to-green-500 px-5 py-1.5 shadow-md">
                    <SparkleIcon size={18} className="text-green-50" />
                    <span className="font-lora text-sm font-semibold text-green-50 italic">
                      {currentCuriosity.highlight}
                    </span>
                  </div>
                )}

                <Button
                  onClick={generateCuriosity}
                  disabled={isAnimating}
                  className="group font-lora flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-green-500 px-6 py-3.5 font-semibold text-green-50 shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto sm:w-auto"
                >
                  <ArrowClockwiseIcon
                    size={20}
                    className="transition-transform duration-700 group-hover:rotate-[360deg]"
                  />
                  {usedIds.size >= defaultCuriosities.length
                    ? "Recomeçar do início"
                    : "Próxima Curiosidade"}
                </Button>
              </div>
            </div>
          )}

          <div key={phraseKey} className="animate-fade-in p-6">
            <Text
              as="p"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Medium}
              className="font-maitree text-center text-sm leading-relaxed text-green-500"
            >
              <strong className="text-green-500">Você sabia?</strong>{" "}
              {didYouKnowPhrases[currentPhraseIndex]}
            </Text>
          </div>
        </div>
      </main>
    </div>
  );
}
