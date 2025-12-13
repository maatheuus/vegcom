import { getChatById } from "@/features/chat/api/queries/getChatApiServer";
import ChatPage from "@/features/chat/components/chat";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const chat = await getChatById(Number(id));

  return <ChatPage chat={chat} />;
}
