import ChatWorkspace from "@/features/chat/components/workspace/ChatWorkspace";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatWorkspace>{children}</ChatWorkspace>;
}
