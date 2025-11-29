import type { Comment } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import clsx from "clsx";

export function AvatarGroup({
  comments,
  limit = 3,
  className,
  ...props
}: {
  comments: Comment[];
  limit?: number;
  className?: string;
}) {
  if (!comments || comments.length === 0) return null;

  const visibleComments = comments.slice(0, limit);
  const remaining = comments.length > limit ? comments.length - limit : 0;

  return (
    <div className={clsx("flex items-center", className)} {...props}>
      <div className="flex -space-x-3">
        {visibleComments.map((comment, index) => (
          <Avatar key={index}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
              {comment.user.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        ))}

        {remaining > 0 && (
          <div className="mt-1 ml-1 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-green-100 bg-green-100 text-sm font-medium text-green-500">
            +{remaining}
          </div>
        )}
      </div>
    </div>
  );
}
