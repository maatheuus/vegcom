import type { PostCardDataProps } from "@/shared/types";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Textarea from "@/shared/ui/TextArea";

import { MAX_LENGTH_FOR_INPUT } from "@/shared/lib/globalVariables";
import ImageCarouselModal from "@/shared/ui/ImageCarouselModal";
import Text from "@/shared/ui/Text";
import { ChatCircleTextIcon, SparkleIcon } from "@phosphor-icons/react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!data.comments.haveComments) return null;

  const handleResponseForUser = (userName: string) => {
    const mention = `@${userName} `;
    setComment(mention);

    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(mention.length, mention.length);
    }
  };

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="text"
            className="cursor-pointer rounded-full !p-1 transition-colors hover:bg-green-100"
          >
            <ChatCircleTextIcon size={18} className="text-green-500" />
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
          className={clsx(
            "max-w-[calc(100vw-2rem)] gap-0 overflow-hidden rounded-2xl border-gray-200 p-0 md:max-w-2xl",
            className,
          )}
        >
          <Col className="border-b border-gray-100 bg-green-50 px-6 py-5">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-lg leading-tight font-semibold text-green-500">
                {data.postTitle}
              </DialogTitle>

              <Row className="items-center gap-x-4 text-sm">
                <Row className="items-center gap-x-1.5">
                  <ChatCircleTextIcon size={16} className="text-green-500" />
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
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
                  <SparkleIcon
                    size={16}
                    weight={isLiked ? "fill" : "regular"}
                    className="fill-green-500 text-green-500"
                  />
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    weight={Text.Weight.Medium}
                    className="text-green-500"
                  >
                    {likesCount} {likesCount === 1 ? "curtida" : "curtidas"}
                  </Text>
                </Row>
              </Row>
            </DialogHeader>

            <div className="style-scrollbar max-h-[220px] overflow-y-scroll pr-2 md:max-h-[400px]">
              {variant === "image" &&
                data.postContent.postResources?.images && (
                  <Col className="mt-4 gap-y-3">
                    <Text
                      type={Text.Type.BodyFour}
                      weight={Text.Weight.Normal}
                      className="text-black-100 mt-3"
                    >
                      {data.postContent.postResources?.content}
                    </Text>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {data.postContent.postResources.images.map(
                        (image, index) => (
                          <div
                            key={index}
                            onClick={() => openImage(index)}
                            className="relative h-28 w-full cursor-pointer overflow-hidden rounded-lg"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ),
                      )}
                    </div>
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

          <Col className="px-6 py-5">
            <div className="style-scrollbar h-64 max-h-[10rem] max-w-[575px] overflow-y-scroll pr-2 md:max-h-full md:max-w-full">
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

          <Col className="border-t border-gray-200 px-6 py-4">
            <Row className="justify-center gap-x-3">
              <Col className="max-w-[calc(100vw-5rem)] flex-1 gap-y-2 md:max-w-[575px]">
                <Textarea
                  ref={textareaRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Adicione um comentário..."
                  showCharacterCount
                  maxLength={MAX_LENGTH_FOR_INPUT}
                />

                <Row className="justify-between gap-x-2">
                  <Button
                    disabled={!comment.trim()}
                    onClick={() => setComment("")}
                    variant="text"
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
                    Comentar
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </DialogContent>
      </Dialog>

      <ImageCarouselModal
        images={data.postContent.postResources.images}
        isOpen={isOpen}
        onClose={setIsOpen}
        initialIndex={selectedImageIndex}
      />
    </>
  );
}
