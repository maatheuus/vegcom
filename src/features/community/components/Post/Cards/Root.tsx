"use client";

import { getInitials } from "@/features/account/components/utils";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import {
  deletePost,
  toggleLike,
  toggleSave,
} from "@/features/community/api/communityApi";
import { toast } from "@/shared/hooks/use-toast";
import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import type { PostCardDataProps } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import LinkPreviewList from "@/shared/ui/PreviewLinks/LinkPreviewList";
import Text from "@/shared/ui/Text";
import { slugify } from "@/shared/utils";
import {
  BookmarkIcon,
  ChatCircleTextIcon,
  DotsThreeIcon,
  ShareFatIcon,
  SparkleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentPreview from "../CommentsPreview/CommentPreview";
import { AvatarGroup } from "./AvatarGroup";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: PostCardDataProps;
  children: React.ReactNode;
  variant?: "default" | "image" | "announcement";
}

export default function PostCardRoot({
  className,
  data,
  variant,
  children,
  ...props
}: Props) {
  const router = useRouter();
  const { data: currentUser } = useGetUser();

  const [isLiked, setIsLiked] = useState(() => {
    if (data.likes && currentUser?.id) {
      return data.likes.some(
        (like) => String(like.userId) === String(currentUser.id),
      );
    }
    return false;
  });
  const [likesCount, setLikesCount] = useState(data.postLikes);
  const [isSaved, setIsSaved] = useState(
    data.savedBy.includes(Number(currentUser?.id)),
  );
  const { data: user } = useGetUser();

  useEffect(() => {
    if (data.likes && currentUser?.id) {
      setIsLiked(
        data.likes.some(
          (like) => String(like.userId) === String(currentUser.id),
        ),
      );
    }
  }, [data.likes, currentUser?.id]);

  const postSlug = slugify(data.postTitle);
  const postUrl = `/community/${data.id}/${postSlug}`;

  const formattedPostDate = formatDistance(
    new Date(data.postDate),
    new Date(),
    { addSuffix: true, includeSeconds: true, locale: dateFormatDistanceLocale },
  );

  const handleCardClick = () => {
    router.push(postUrl);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    if (!data) return;

    const { postLikes } = await toggleLike(String(data.id));
    setIsLiked(!isLiked);
    setLikesCount(postLikes);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data || !currentUser?.id) return;

    const { saved } = await toggleSave(Number(data.id), Number(currentUser.id));
    setIsSaved(saved);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deletePost(String(data.id));
    window.dispatchEvent(new CustomEvent("community:post-deleted"));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const url = `${window.location.origin}${postUrl}`;

    const summary =
      data.postContent.postResources.content.length > 150
        ? `${data.postContent.postResources.content.substring(0, 150)}...`
        : data.postContent.postResources.content;

    const hashtags =
      data.postTags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ") || "";

    const shareData = {
      title: data.postTitle,
      text: `Confira este post de ${data.user?.name}: "${data.postTitle}"\n\n${summary}\n\n${hashtags}\n`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${url}`);
        toast({
          title: "Sucesso",
          description: "Link e resumo copiados para a área de transferência!",
          variant: "success",
        });
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Erro ao compartilhar:", error);
      }
    }
  };

  return (
    <Col
      onClick={handleCardClick}
      className={clsx(
        "w-full cursor-pointer rounded-2xl border-b border-b-gray-100 py-5 transition-colors first-of-type:mt-4 hover:bg-green-100/35 md:px-4",
        className,
      )}
      {...props}
    >
      <Row className="mb-4 w-full justify-between">
        <Row className="min-w-0 flex-1 items-center gap-x-2 md:gap-x-3">
          <Link href={`/user/${data.user?.id}`} className="contents">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage
                src={data.user?.urlImage || ""}
                alt={data.user?.name || "user image"}
              />
              <AvatarFallback className="text-xs capitalize md:text-base">
                {data.user?.name ? getInitials(data.user.name) : "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <Row className="min-w-0 flex-1 items-center gap-x-2">
            <Link href={`/user/${data.user?.id}`} className="contents">
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.Bold}
                className="font-maitree truncate text-xs text-green-500 md:text-base"
              >
                {data.user?.name}
              </Text>
            </Link>
            <span className="size-0.5 shrink-0 rounded-full bg-green-500"></span>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora text-black-100 shrink-0 opacity-60"
            >
              {formattedPostDate}
            </Text>
          </Row>
        </Row>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className={variant === "announcement" ? "hidden" : ""}
          >
            <Button.Icon
              variant="text"
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer rounded-full border border-transparent px-3 transition-colors hover:border-green-100 hover:bg-green-100 data-[state=open]:bg-green-100"
              icon={<DotsThreeIcon size={22} />}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-green-500 text-green-50"
          >
            <DropdownMenuItem
              onClick={handleSave}
              className="cursor-pointer gap-x-3 py-2.5 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-green-50"
            >
              <BookmarkIcon size={18} weight={isSaved ? "fill" : "regular"} />
              Salvar post
            </DropdownMenuItem>

            {data.user?.id === currentUser?.id && (
              <DropdownMenuItem
                onClick={handleDelete}
                className="cursor-pointer gap-x-3 py-2.5 text-red-400 hover:!bg-green-200/80 focus:!text-red-400"
              >
                <TrashIcon size={18} />
                Deletar post
              </DropdownMenuItem>
            )}
            {/* <DropdownMenuItem className="cursor-pointer gap-x-3 py-2.5 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-green-50">
              <EyeSlashIcon size={18} />
              Ocultar
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-x-3 py-2.5 text-red-400 hover:!bg-green-200/80 focus:!bg-green-200/80 focus:!text-red-400">
              <FlagIcon size={18} />
              Denunciar
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>

      {children}
      <LinkPreviewList
        content={data.postContent.postResources.content ?? ""}
        links={data.postContent.postResources.links ?? []}
      />

      {variant !== "announcement" && data.comments.comments.length > 0 && (
        <CommentPreview
          comments={data.comments.comments}
          totalCount={data.comments.commentsNumber}
          onClickSeeAll={() => router.push(postUrl)}
        />
      )}

      <Row className="items-baseline justify-between">
        <Row className="mt-3 items-center gap-x-3">
          {data.comments.comments &&
            data.comments.comments.length > 0 &&
            variant !== "announcement" && (
              <>
                <AvatarGroup
                  comments={data.comments.comments}
                  className="max-md:hidden"
                />
                <span className="size-0.5 rounded-full bg-green-500 max-md:hidden"></span>
              </>
            )}

          {variant !== "announcement" && (
            <>
              <Button.Icon
                variant="text"
                className="cursor-pointer rounded-full !p-1 transition-colors hover:bg-green-100"
                leftIcon={
                  <ChatCircleTextIcon size={18} className="text-green-500" />
                }
                role="div"
              >
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  weight={Text.Weight.Medium}
                  className="text-green-500"
                >
                  {data.comments.commentsNumber || 0}
                </Text>
              </Button.Icon>
              <span className="size-0.5 rounded-full bg-green-500"></span>
            </>
          )}

          <Button.Icon
            onClick={handleLike}
            className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-1 hover:bg-green-100"
            variant="text"
            leftIcon={
              <SparkleIcon size={16} weight={isLiked ? "fill" : "regular"} />
            }
          >
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora flex items-center gap-x-1 font-bold text-green-500 italic"
            >
              {likesCount}
            </Text>
          </Button.Icon>

          <span className="size-0.5 rounded-full bg-green-500"></span>

          <Button.Icon
            onClick={handleShare}
            className="flex cursor-pointer items-center gap-x-1.5 rounded-full p-1 hover:bg-green-100"
            variant="text"
            leftIcon={<ShareFatIcon size={16} weight="regular" />}
          >
            <Text
              as="span"
              type={Text.Type.BodyFive}
              weight={Text.Weight.Medium}
              className="font-lora flex items-center gap-x-1 font-bold text-green-500 italic"
            >
              Compartilhar
            </Text>
          </Button.Icon>
        </Row>
      </Row>
    </Col>
  );
}
