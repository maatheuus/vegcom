import { getChats } from "@/features/chat/api/queries/getChatApiServer";
import HistoryChatPage from "@/features/chat/components/historyChats";
import Col from "@/shared/ui/Layout/Helpers/Col";

export default async function Page() {
  const chats = await getChats();

  return (
    <Col className="h-full min-h-0 w-full">
      <HistoryChatPage chats={chats} />
    </Col>
  );
}
