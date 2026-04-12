"use client";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import {
  ArrowClockwiseIcon,
  LeafIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { defaultCuriosities, didYouKnowPhrases } from "../curiosites/utils";
import FastFacts from "../FastFacts";
import HistoryTimeline from "../HistoryTimeline";

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

    if (usedIds.size >= defaultCuriosities.length) setUsedIds(new Set());

    const availableCuriosities = defaultCuriosities.filter(
      (c) => !usedIds.has(c.id),
    );
    const selected =
      availableCuriosities[
        Math.floor(Math.random() * availableCuriosities.length)
      ];
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
    <div className="mt-6 h-full overflow-auto md:mt-0">
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 md:space-y-16 md:py-0">
        <section className="space-y-3 text-center">
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold tracking-wider text-green-600 uppercase">
            <LeafIcon size={12} weight="fill" />
            Veganismo
          </span>
          <Text
            as="h1"
            type={Text.Type.HeadingTwo}
            weight={Text.Weight.Bold}
            className="font-lora text-3xl text-green-700 md:text-4xl"
          >
            Curiosidades & História
          </Text>
          <Text
            type={Text.Type.BodyThree}
            className="font-maitree mx-auto max-w-xl text-gray-500"
          >
            Explore fatos surpreendentes, marcos históricos e dados sobre o
            movimento que está transformando a forma como o mundo se alimenta.
          </Text>
        </section>

        <section className="space-y-4">
          <Text
            as="h2"
            type={Text.Type.HeadingFour}
            weight={Text.Weight.Bold}
            className="font-lora text-xl text-green-700"
          >
            Em números
          </Text>
          <FastFacts />
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <Text
              as="h2"
              type={Text.Type.HeadingFour}
              weight={Text.Weight.Bold}
              className="font-lora text-xl text-green-700"
            >
              Uma breve história
            </Text>
            <p className="font-maitree text-sm text-gray-500">
              Do pensamento filosófico antigo até o movimento global de hoje.
            </p>
          </div>
          <HistoryTimeline />
        </section>

        <div className="flex items-center gap-x-4">
          <div className="h-px flex-1 bg-green-200/50" />
          <span className="font-lora text-xs tracking-widest text-green-500/80 uppercase italic">
            Curiosidade do dia
          </span>
          <div className="h-px flex-1 bg-green-200/50" />
        </div>

        <section className="space-y-6 overflow-y-hidden">
          {currentCuriosity && (
            <div className="space-y-8">
              <div
                className={`min-h-[260px] space-y-8 overflow-hidden transition-all duration-500 md:min-h-[220px] ${
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
              </div>

              <div className="flex w-full flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                {currentCuriosity.highlight && (
                  <div
                    className={`pointer-events-none inline-flex items-center gap-2 rounded-full border-2 border-green-200 bg-gradient-to-r from-green-600 to-green-500 px-5 py-1.5 shadow-md transition-opacity duration-300 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <SparkleIcon size={18} className="text-green-50" />
                    <span className="font-lora text-sm font-semibold text-green-50 italic">
                      {currentCuriosity.highlight}
                    </span>
                  </div>
                )}

                <Button
                  onClick={generateCuriosity}
                  disabled={isAnimating}
                  className="group font-lora flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-green-500 px-6 py-3.5 font-semibold text-green-50 shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto"
                >
                  <ArrowClockwiseIcon
                    size={20}
                    className={`transition-transform ${
                      isAnimating
                        ? "animate-spin"
                        : "duration-500 group-hover:rotate-180"
                    }`}
                  />
                  {isAnimating
                    ? "Carregando..."
                    : usedIds.size >= defaultCuriosities.length
                      ? "Recomeçar do início"
                      : "Próxima curiosidade"}
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
        </section>
      </main>
    </div>
  );
}
