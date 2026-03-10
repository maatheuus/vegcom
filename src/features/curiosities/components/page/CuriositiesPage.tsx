"use client";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import {
  ArrowClockwiseIcon,
  LeafIcon,
  PlantIcon,
  SparkleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
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

// ── Dados da seção histórica ──────────────────────────────────

const historyTimeline = [
  {
    year: "~700 a.C.",
    title: "Primeiras raízes",
    description:
      "Filósofos gregos como Pitágoras defendiam uma dieta sem carne por razões éticas e espirituais. Na Índia, o Jainismo já pregava a não-violência (ahimsa) com todos os seres.",
    icon: LeafIcon,
  },
  {
    year: "1806",
    title: "O primeiro vegano registrado",
    description:
      "Percy Bysshe Shelley e outros pensadores britânicos começaram a defender publicamente a abstinência de todos os produtos animais, indo além do vegetarianismo da época.",
    icon: PlantIcon,
  },
  {
    year: "1944",
    title: "Nasce o termo 'Vegano'",
    description:
      "Donald Watson fundou a Vegan Society no Reino Unido e cunhou a palavra 'vegan', separando quem excluía apenas carne de quem excluía todos os produtos de origem animal.",
    icon: UsersThreeIcon,
  },
  {
    year: "1990s",
    title: "Crescimento global",
    description:
      "Com o avanço da internet e de documentários como 'Earthlings', o movimento vegano ganhou tração mundial. Supermercados começaram a oferecer as primeiras alternativas plant-based.",
    icon: SparkleIcon,
  },
  {
    year: "Hoje",
    title: "Uma revolução alimentar",
    description:
      "Estima-se que mais de 88 milhões de pessoas no mundo sigam uma dieta vegana. A indústria plant-based movimenta bilhões e cresce acima de 10% ao ano globalmente.",
    icon: LeafIcon,
  },
];

const fastFacts = [
  { value: "88M+", label: "veganos no mundo" },
  { value: "1944", label: "ano da fundação da Vegan Society" },
  { value: "10%", label: "crescimento anual do mercado plant-based" },
  { value: "75%", label: "redução na pegada de carbono com dieta vegana" },
];

// ── Componentes internos ──────────────────────────────────────

function FastFacts() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {fastFacts.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center rounded-2xl border border-green-500/10 bg-green-50/60 px-4 py-5 text-center"
        >
          <span className="font-lora text-2xl font-bold text-green-600">
            {value}
          </span>
          <span className="font-maitree mt-1 text-xs text-green-500/70">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HistoryTimeline() {
  return (
    <div className="space-y-0">
      {historyTimeline.map(({ year, title, description, icon: Icon }, i) => (
        <div key={year} className="flex gap-x-4">
          {/* Linha do tempo */}
          <div className="flex flex-col items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-green-200 bg-green-50 text-green-500">
              <Icon size={16} weight="duotone" />
            </div>
            {i < historyTimeline.length - 1 && (
              <div className="my-1 w-px flex-1 bg-green-200/50" />
            )}
          </div>

          {/* Conteúdo */}
          <div className="pb-8">
            <span className="font-lora text-xs font-semibold tracking-widest text-green-400 uppercase italic">
              {year}
            </span>
            <h3 className="font-lora mt-0.5 text-base font-semibold text-green-700">
              {title}
            </h3>
            <p className="font-maitree mt-1 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────

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
    <div className="mt-12 h-full overflow-auto md:mt-0">
      <main className="mx-auto w-full max-w-3xl space-y-16 px-4 py-12">
        {/* ── HERO ───────────────────────────────────────────── */}
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

        {/* ── NÚMEROS RÁPIDOS ────────────────────────────────── */}
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

        {/* ── LINHA DO TEMPO ─────────────────────────────────── */}
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

        {/* ── DIVISOR ────────────────────────────────────────── */}
        <div className="flex items-center gap-x-4">
          <div className="h-px flex-1 bg-green-200/50" />
          <span className="font-lora text-xs tracking-widest text-green-400 uppercase italic">
            Curiosidade do dia
          </span>
          <div className="h-px flex-1 bg-green-200/50" />
        </div>

        {/* ── CURIOSIDADE ALEATÓRIA ──────────────────────────── */}
        <section className="space-y-6">
          {currentCuriosity && (
            <div
              className={`space-y-8 overflow-hidden transition-all duration-500 ${
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
        </section>
      </main>
    </div>
  );
}
