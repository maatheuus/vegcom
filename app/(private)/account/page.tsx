import LayoutAccount from "@/components/account/LayoutAccount";
import Text from "@/components/ui/Text";

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

export default function Page() {
  return (
    <>
      <LayoutAccount title="Configurações" />

      <div className="relative h-fit w-full">
        <div className="flex w-full flex-col gap-y-4">
          <Text
            type={Text.Type.BodyOne}
            weight={Text.Weight.Bold}
            className="font-lora text-green-500"
          >
            Dicas da semana
          </Text>

          <div className="grid grid-cols-1 items-start justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="animate-fade-in-slide-up h-full w-full cursor-text space-y-1 rounded-lg border border-green-500 bg-green-50 p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <Text
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.SemiBold}
                  className="font-lora text-green-500"
                >
                  {tip.title}
                </Text>
                <Text
                  type={Text.Type.BodyFour}
                  weight={Text.Weight.Medium}
                  className="font-maitree text-green-200"
                >
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
