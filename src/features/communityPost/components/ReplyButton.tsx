"use client";

import { usePostInteraction } from "@/features/communityPost/context/PostInteractionContext";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
  isAuthenticated?: boolean;
}

export default function ReplyButton({ username, isAuthenticated }: Props) {
  const { handleReplyTo } = usePostInteraction();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (!isAuthenticated) {
          router.push("/login");
          return;
        }
        handleReplyTo(username);
      }}
      className="text-xs font-medium text-green-500 transition-colors hover:text-green-700"
    >
      Responder
    </button>
  );
}
