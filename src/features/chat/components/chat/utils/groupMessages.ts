import type { LastMessage } from "@/features/chat/api/types";

export interface MessageGroup {
  id: string | number;
  role: "user" | "assistant";
  versions: LastMessage[];
}

export function groupMessages(messages: LastMessage[]): MessageGroup[] {
  const grouped: MessageGroup[] = [];

  for (const msg of messages) {
    const lastGroup = grouped[grouped.length - 1];

    if (msg.role === "assistant" && lastGroup?.role === "assistant") {
      lastGroup.versions.push(msg);
    } else {
      grouped.push({
        id: msg.id,
        role: msg.role as "user" | "assistant",
        versions: [msg],
      });
    }
  }

  return grouped;
}
