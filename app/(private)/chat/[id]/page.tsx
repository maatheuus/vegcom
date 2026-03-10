import ExistingChatPage from "@/features/chat/components/chat/ChatHandler/ExistingChatPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <ExistingChatPage chatId={Number(id)} />;
}
