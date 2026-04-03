import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { PlantIcon } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <Col className="min-h-screen items-center justify-center gap-y-6 bg-green-50 px-4">
      <div className="animate-fade-in-slide-up flex flex-col items-center gap-y-4">
        <PlantIcon size={80} weight="duotone" className="text-green-200" />

        <Text
          as="h1"
          type={Text.Type.HeadingTwo}
          weight={Text.Weight.SemiBold}
          className="text-center text-green-500"
        >
          Página não encontrada
        </Text>

        <Text
          as="p"
          type={Text.Type.BodyTwo}
          className="max-w-md text-center text-green-600"
        >
          Parece que essa página não existe ou foi movida. Que tal voltar para a
          comunidade?
        </Text>

        <Button.Link href="/" className="mt-4">
          Voltar para a comunidade
        </Button.Link>
      </div>
    </Col>
  );
}
