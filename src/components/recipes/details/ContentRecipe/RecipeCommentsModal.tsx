import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Col from "@/components/ui/Layout/Helpers/Col";
import { ScrollArea } from "@/components/ui/scroll-area";

import clsx from "clsx";
import type { HTMLAttributes } from "react";
import CommentCard from "../ContentRecipe/CommentCard";
import type { Comment } from "../ContentRecipe/CommentsSection";

interface PostCommentsDialogProps extends HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  data?: Comment[];
  likesCount: { [id: number]: number };
  likedComments: { [id: number]: boolean };
  handleLike: (id: number) => void;
}

export default function RecipeCommentsModal({
  data,
  children,
  className,
  likesCount,
  likedComments,
  handleLike,
}: PostCommentsDialogProps) {
  if (!data) return;

  return (
    <Dialog>
      <DialogTrigger className="w-fit p-1 cursor-pointer hover:bg-green-100 transition-colors duration-200 rounded-md">
        {children}
      </DialogTrigger>

      <DialogContent
        className={clsx("max-w-2xl font-frank text-green-500 p-0", className)}
      >
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-green-500 font-rancho">
            Comentários
          </DialogTitle>
        </DialogHeader>
        <Col className="gap-y-4 p-6">
          <ScrollArea className="h-96 pr-2">
            <Col className="gap-y-4">
              {data.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  likes={likesCount[comment.id] ?? comment.likes}
                  isLiked={!!likedComments[comment.id]}
                  onLike={() => handleLike(comment.id)}
                />
              ))}
            </Col>
          </ScrollArea>
        </Col>
      </DialogContent>
    </Dialog>
  );
}
