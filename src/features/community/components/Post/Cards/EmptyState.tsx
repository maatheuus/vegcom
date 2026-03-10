import EmptyState from "@/shared/ui/EmptyState";
import {
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
} from "@phosphor-icons/react";

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
    icon: <ScrollIcon size={32} />,
  },
  resources: {
    title: "Nenhum recurso disponível",
    description:
      "Ainda não há recursos compartilhados. Fique de olho, novidades podem aparecer a qualquer momento!",
    icon: <PaperclipIcon size={32} />,
  },
  announcements: {
    title: "Nenhum anúncio no momento",
    description:
      "Não há anúncios recentes. Volte mais tarde para conferir as novidades da comunidade.",
    icon: <MegaphoneIcon size={32} className="-scale-x-100" />,
  },
};

export default function EmptyStateComponent({
  tab = "posts",
  className,
  ...props
}: Props) {
  const content = emptyStateContent[tab];

  return (
    <EmptyState
      icon={content.icon}
      title={content.title}
      description={content.description}
      className={className}
      {...props}
    />
  );
}
