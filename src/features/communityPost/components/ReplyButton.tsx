"use client";

import { usePostInteraction } from "@/features/communityPost/context/PostInteractionContext";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
  isAuthenticated?: boolean;
  className?: string;
}

export default function ReplyButton({ username, isAuthenticated, className }: Props) {
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
      className={clsx(
        "text-[14px] font-maitree font-medium text-green-500/70 transition-colors hover:text-green-500",
        className
      )}
    >
      Responder
    </button>
  );
}
