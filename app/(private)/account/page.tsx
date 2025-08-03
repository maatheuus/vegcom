import LayoutAccount from "@/components/account/LayoutAccount";
import { LightBulbOutlinedIcon } from "@/components/icons";
import Text from "@/components/ui/Text";
import type { ComponentProps } from "react";

const tips = [
  {
    title: "O Poder do Prato Colorido",
    description:
      "Encha seu prato com todas as cores do arco-íris! Legumes e verduras vibrantes não só são lindos, mas cheios de nutrientes e sabor.",
  },
  {
    title: "Desvendando o Tofu Mágico",
    description:
      "Dê uma chance ao tofu! Mariná-lo bem e selar na frigideira pode transformá-lo no seu novo ingrediente favorito. Crocante por fora, macio por dentro!",
  },
  {
    title: "A Revolução do Feijão",
    description:
      "Feijões e lentilhas são super-heróis! Ricos em proteína e fibra, são a base perfeita para hambúrgueres vegetais, sopas e ensopados cremosos.",
  },
  {
    title: "Temperos que Transformam",
    description:
      "Explore o universo dos temperos! Páprica defumada, cominho, cúrcuma... eles elevam o sabor dos vegetais a outro nível, sem precisar de carne.",
  },
  {
    title: "O Segredo da Textura Perfeita",
    description:
      "Castanhas e sementes são suas aliadas! Elas adicionam crocância, cremosidade e um boost de nutrientes em saladas, molhos e sobremesas.",
  },
  {
    title: "Café da Manhã Vegano Descomplicado",
    description:
      "Comece o dia com energia! Frutas frescas, aveia, leites vegetais e sementes são a combinação perfeita para um café da manhã delicioso e nutritivo.",
  },
];

export default function page({ className, ...props }: ComponentProps<"div">) {
  return (
    <>
      <LayoutAccount title="Configurações" />

      <div className="w-full h-fit relative">
        <div
          className={`flex flex-col gap-y-4 w-full ${className || ""}`}
          {...props}
        >
          <div className="flex items-center gap-x-2">
            <LightBulbOutlinedIcon size={22} className="text-green-500" />
            <Text
              type={Text.Type.BodyOne}
              weight={Text.Weight.Bold}
              className="text-green-500 pl-4"
            >
              Dicas da semana
            </Text>
          </div>
          <div className="grid gap-4 items-start justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="w-full p-3 space-y-1 h-full bg-green-50 rounded-lg border border-green-500 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg animate-fade-in-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <Text
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.Medium}
                  className="text-green-500"
                >
                  {tip.title}
                </Text>
                <Text type={Text.Type.BodyFour} className="text-green-200">
                  {tip.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
