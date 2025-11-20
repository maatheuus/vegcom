import type { PostCardDataProps } from "@/shared/types";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Textarea from "@/shared/ui/TextArea";

import {
  ChatCircleTextOutlinedIcon,
  PaperPlaneOutlinedIcon,
  SparklesOutlinedIcon,
} from "@/shared/icons";
import { MAX_LENGTH_FOR_TEXTAREA } from "@/shared/lib/globalVariables";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState, type HTMLAttributes } from "react";

interface PostCommentsDialogProps extends HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  data: PostCardDataProps;
  variant?: "default" | "image" | "announcement";
  isLiked?: boolean;
  likesCount: number;
}

export default function CommentsModal({
  data,
  isLiked,
  likesCount,
  className,
  variant = "default",
}: PostCommentsDialogProps) {
  const [comments, setComments] = useState(data.comments.comments ?? []);
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!data.comments.haveComments) return null;

  const handleResponseForUser = (userName: string) => {
    const mention = `@${userName} `;
    setComment(mention);

    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(mention.length, mention.length);
    }
  };

  const handlePostComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      user: {
        name: "Seu Nome",
        urlImage: "https://github.com/shadcn.png",
      },
      commentContent: comment,
      commentDate: new Date().toISOString().split("T")[0],
    };

    setComments([...comments, newComment]);
    setComment("");

    setTimeout(() => {
      const scrollArea = document.querySelector(".style-scrollbar");
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, 100);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="text"
          className="cursor-pointer rounded-full !p-1 transition-colors hover:bg-green-100"
        >
          <ChatCircleTextOutlinedIcon size={18} className="text-green-500" />
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            {data.comments.commentsNumber}
          </Text>
        </Button>
      </DialogTrigger>

      <DialogContent
        className={clsx("max-w-2xl gap-0 border-gray-200 p-0", className)}
      >
        <Col className="border-b border-gray-100 bg-green-50 px-6 py-5">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-lg leading-tight font-semibold text-green-500">
              {data.postTitle}
            </DialogTitle>

            <Row className="items-center gap-x-4 text-sm">
              <Row className="items-center gap-x-1.5">
                <ChatCircleTextOutlinedIcon
                  size={16}
                  className="text-green-500"
                />
                <Text
                  as="span"
                  type={Text.Type.BodySix}
                  weight={Text.Weight.Medium}
                  className="text-green-500"
                >
                  {data.comments.commentsNumber}{" "}
                  {data.comments.commentsNumber === 1
                    ? "comentário"
                    : "comentários"}
                </Text>
              </Row>

              <span className="size-0.5 rounded-full bg-green-500"></span>

              <Row className="items-center gap-x-1.5">
                <SparklesOutlinedIcon
                  size={16}
                  color={isLiked ? "fill" : "outline"}
                  className="fill-green-500 text-green-500"
                />
                <Text
                  as="span"
                  type={Text.Type.BodySix}
                  weight={Text.Weight.Medium}
                  className="text-green-500"
                >
                  {likesCount} {likesCount === 1 ? "curtida" : "curtidas"}
                </Text>
              </Row>
            </Row>
          </DialogHeader>

          <div className="style-scrollbar max-h-[400px] overflow-y-scroll">
            {variant === "image" && data.postContent.postResources?.images && (
              <Col className="mt-4 gap-y-3">
                <Text
                  type={Text.Type.BodyFour}
                  weight={Text.Weight.Normal}
                  className="line-clamp-3 text-gray-600"
                >
                  {data.postContent.postResources?.content}
                </Text>
                <Row className="flex-wrap gap-2">
                  {data.postContent.postResources.images
                    .slice(0, 3)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="relative h-20 w-24 overflow-hidden rounded-lg bg-gray-100"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                </Row>
              </Col>
            )}

            {variant === "default" && (
              <Text
                type={Text.Type.BodyFour}
                weight={Text.Weight.Normal}
                className="text-black-100 mt-3"
              >
                {data.postContent.postResources?.content}
              </Text>
            )}
          </div>
        </Col>

        <Col className="bg-gray-50/50 px-6 py-5">
          <div className="style-scrollbar h-64 max-w-[575px] overflow-y-scroll pr-2">
            <Col className="gap-y-5">
              {comments &&
                comments.map((comment, index) => (
                  <Row key={index} className="items-start gap-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.user.urlImage} />
                      <AvatarFallback className="bg-green-100 text-xs text-green-500">
                        {comment.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <Col className="flex-1 gap-y-1">
                      <Row className="w-full items-baseline justify-between gap-x-2">
                        <Text
                          weight={Text.Weight.Medium}
                          className="text-sm text-green-500"
                        >
                          {comment.user.name}
                        </Text>
                        <Text
                          type={Text.Type.BodySix}
                          className="font-lora text-xs text-green-500"
                        >
                          {comment.commentDate}
                        </Text>
                      </Row>

                      <Text
                        type={Text.Type.BodyFour}
                        className="text-black-100 leading-relaxed font-medium break-all"
                      >
                        {comment.commentContent}
                      </Text>

                      <Row className="mt-1 items-center gap-x-3">
                        <button
                          onClick={() =>
                            handleResponseForUser(comment.user.name)
                          }
                          className={clsx(
                            "text-black-100 cursor-pointer text-xs",
                            comment.user.name === "Seu Nome" && "hidden",
                          )}
                        >
                          Responder
                        </button>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </Col>
          </div>
        </Col>

        <Col className="border-t border-gray-200 bg-green-50 px-6 py-4">
          <Row className="items-end gap-x-3">
            <Avatar className="h-9 w-9 ring-2 ring-gray-100">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-gray-200 text-xs">
                VE
              </AvatarFallback>
            </Avatar>

            <Col className="max-w-[575px] flex-1 gap-y-2">
              <Textarea
                ref={textareaRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Adicione um comentário..."
                showCharacterCount
                maxLength={MAX_LENGTH_FOR_TEXTAREA}
              />

              <Row className="justify-end gap-x-2">
                <DialogFooter>
                  <Button
                    disabled={!comment.trim()}
                    onClick={() => setComment("")}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={!comment.trim()}
                    variant="default"
                    size="sm"
                    className="gap-x-2 bg-green-500 text-green-50 transition-opacity duration-300 hover:opacity-90"
                    onClick={handlePostComment}
                  >
                    <PaperPlaneOutlinedIcon size={14} />
                    Comentar
                  </Button>
                </DialogFooter>
              </Row>
            </Col>
          </Row>
        </Col>
      </DialogContent>
    </Dialog>
  );
}
