import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import {
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";

type TabKey = "posts" | "resources" | "announcements";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tab?: TabKey;
}

const emptyStateContent: Record<
  TabKey,
  { title: string; description: string; icon: React.ReactNode }
> = {
  posts: {
    title: "Nenhum post por aqui ainda",
    description:
      "Seja o primeiro a compartilhar algo com a comunidade. Sua contribuição pode inspirar outros!",
    icon: <ScrollIcon size={36} className="text-green-200" />,
  },
  resources: {
    title: "Nenhum recurso disponível",
    description:
      "Ainda não há recursos compartilhados. Fique de olho, novidades podem aparecer a qualquer momento!",
    icon: <PaperclipIcon size={36} className="text-green-200" />,
  },
  announcements: {
    title: "Nenhum anúncio no momento",
    description:
      "Não há anúncios recentes. Volte mais tarde para conferir as novidades da comunidade.",
    icon: <MegaphoneIcon size={36} className="-scale-x-100 text-green-200" />,
  },
};

export default function EmptyState({
  tab = "posts",
  className,
  ...props
}: Props) {
  const content = emptyStateContent[tab];

  return (
    <Col
      className={clsx(
        "items-center justify-center gap-y-3 py-16 text-center",
        className,
      )}
      {...props}
    >
      <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        {content.icon}
      </div>
      <Text
        type={Text.Type.BodyThree}
        weight={Text.Weight.Medium}
        className="font-lora text-black-100"
      >
        {content.title}
      </Text>
      <Text
        type={Text.Type.BodyFour}
        weight={Text.Weight.Normal}
        className="font-allan max-w-xs text-black"
      >
        {content.description}
      </Text>
    </Col>
  );
}
