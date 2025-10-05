import type { PostCardDataProps } from "@/components/@types";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import { ScrollArea } from "@/components/ui/scroll-area";
import Textarea from "@/components/ui/TextArea";

import {
  ChatCircleTextOutlinedIcon,
  OpenEyeOutlinedIcon,
} from "@/components/icons";
import Text from "@/components/ui/Text";
import clsx from "clsx";
import Image from "next/image";
import type { HTMLAttributes } from "react";
import { mockComments, mockPostContent } from "../../mockData";

interface PostCommentsDialogProps extends HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  data: PostCardDataProps;
  variant?: "default" | "image" | "announcement";
}

export default function CommentsModal({
  data,
  className,
  variant = "default",
}: PostCommentsDialogProps) {
  if (!data.comments.haveComments) return;

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          asChild
          variant="text"
          className="p-1 cursor-pointer hover:bg-green-100"
        >
          <Text
            as="span"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Medium}
            className="text-green-500 font-lora italic font-bold flex items-center gap-x-1"
          >
            <ChatCircleTextOutlinedIcon size={16} />
            {data.comments.commentsNumber}
          </Text>
        </Button>
      </DialogTrigger>

      <DialogContent
        className={clsx("max-w-2xl gap-0 text-green-500 p-0", className)}
      >
        <Col className="gap-y-4 bg-green-100/60 px-6 pt-6 pb-3">
          <DialogHeader>
            <DialogTitle className="text-green-500 font-lora italic">
              {data.postTitle}
            </DialogTitle>
          </DialogHeader>

          {variant === "image" &&
            data.postContent.postResources!.images!.length > 0 && (
              <Col className="gap-y-2 w-full">
                <Text
                  type={Text.Type.BodyFour}
                  weight={Text.Weight.Medium}
                  className="font-maitree text-green-200"
                >
                  {data.postContent.postResources?.content}
                </Text>
                <Row className="flex-wrap gap-x-3 w-full">
                  {data.postContent.postResources?.images?.map(
                    (image, index) => (
                      <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        title={image.title}
                        width={128}
                        height={104}
                        className="w-full h-full object-cover max-h-[6.5rem] max-w-32 rounded-sm"
                      />
                    )
                  )}
                </Row>
              </Col>
            )}

          {variant === "announcement" && (
            <Text
              type={Text.Type.BodyFour}
              weight={Text.Weight.Medium}
              className="font-maitree text-green-200"
            >
              {mockPostContent}
            </Text>
          )}

          {variant === "default" && (
            <Text
              type={Text.Type.BodyFour}
              weight={Text.Weight.Medium}
              className="font-maitree text-green-200"
            >
              {mockPostContent}
            </Text>
          )}

          <Row className="items-center gap-x-3 text-green-200">
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="!font-bold font-lora italic"
            >
              {`${data.comments.commentsNumber} ${
                data.comments.commentsNumber! <= 1
                  ? "comentário"
                  : "comentários"
              }`}
            </Text>
            <Row className="items-center gap-x-1">
              <OpenEyeOutlinedIcon size={16} />
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.Medium}
                className="!font-bold font-lora italic"
              >
                {`${data.postViews} ${
                  data.postViews! <= 1 ? "visualização" : "visualizações"
                }`}
              </Text>
            </Row>
          </Row>
        </Col>
        <Col className="gap-y-4 p-6">
          <ScrollArea className="h-40 pr-2">
            <Col className="gap-y-4">
              {mockComments?.map((comment) => (
                <Row key={comment.id} className="gap-x-3 items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatarUrl} />
                    <AvatarFallback>
                      {comment.user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Col className="gap-y-1 font-lora">
                    <Text
                      weight={Text.Weight.Medium}
                      className="text-base text-green-500 italic"
                    >
                      {comment.user.name}
                    </Text>
                    <Text
                      type={Text.Type.BodyFour}
                      className="text-green-500 font-maitree"
                    >
                      {comment.content}
                    </Text>
                    <Text
                      type={Text.Type.BodyFive}
                      className="text-green-200 text-xs !font-bold"
                    >
                      {comment.date}
                    </Text>
                  </Col>
                </Row>
              ))}
            </Col>
          </ScrollArea>

          <Row className="gap-x-4 items-end">
            <Textarea
              placeholder="Escreva sua resposta..."
              className="min-h-10 w-full max-w-[27.75rem] !text-base border-t-0 border-x-0 focus-visible:ring-0 font-lora"
            />
            <DialogFooter>
              <Button
                variant="default"
                size="lg"
                className="font-lora bg-green-500 cursor-pointer hover:bg-green-600"
              >
                Enviar resposta
              </Button>
            </DialogFooter>
          </Row>
        </Col>
      </DialogContent>
    </Dialog>
  );
}
