import { getInitials } from "@/features/account/components/utils";
import { getPostById } from "@/features/community";
import BackToCommunityButton from "@/features/communityPost/components/BackToCommunityButton";
import PostActions from "@/features/communityPost/components/PostActions";
import PostComments from "@/features/communityPost/components/PostComments";
import { PostInteractionProvider } from "@/features/communityPost/context/PostInteractionProvider";
import type { PostComment } from "@/shared";
import { dateFormatDistanceLocale, safeFormatDistance } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import LinkPreviewList from "@/shared/ui/PreviewLinks/LinkPreviewList";
import Text from "@/shared/ui/Text";
import { prepareHtmlContent } from "@/shared/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const post = await getPostById(id);

  if (!post) return { title: "Post não encontrado" };

  const rawContent = post.postContent.postResources?.content ?? "";
  const excerpt =
    rawContent
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) || "Leia este post na nossa comunidade.";

  const ogImage = post.postContent.postResources?.images?.length
    ? [{ url: post.postContent.postResources.images[0].src, width: 1200, height: 630 }]
    : [];

  return {
    title: post.postTitle,
    description: excerpt,
    openGraph: {
      title: `${post.postTitle} | VegCom`,
      description: excerpt,
      url: `https://www.vegcom.life/community/${id}/${slug}`,
      siteName: "VegCom",
      type: "article",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.postTitle} | VegCom`,
      description: excerpt,
      images: ogImage.map((i) => i.url),
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  const content = post?.postContent.postResources?.content;
  const contentHTML = post?.postContent.postResources?.contentHTML;
  const postByAdmin = post?.user?.role === "ADMIN";

  if (!post) {
    return notFound();
  }

  const uniqueUsersMap = new Map<string, { name: string }>();
  post.comments?.comments.forEach((comment: PostComment) => {
    if (comment.user && comment.user?.name) {
      uniqueUsersMap.set(comment.user?.name, comment.user);
    }
  });

  const uniqueUsers = Array.from(uniqueUsersMap.values());

  const formattedPostDate = safeFormatDistance(post.postDate, dateFormatDistanceLocale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: post.postTitle,
    author: {
      "@type": "Person",
      name: post.user?.name,
    },
    datePublished: post.postDate,
    description: content || "Post de discussão na comunidade.",
    image: post.postContent.postResources?.images?.map((img) => img.src) || [],
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/CommentAction",
      userInteractionCount: post.comments?.commentsNumber || 0,
    },
  };

  return (
    <PostInteractionProvider>
      <Layout.Default
        className="hidden-scrollbar overflow-hidden"
        gridClassName="overflow-auto"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="hidden-scrollbar w-full overflow-scroll scroll-auto">
          <BackToCommunityButton />
          <Col className="w-full rounded-2xl border-b border-b-gray-100 py-5 transition-colors md:px-4">
            {/* Header */}
            <Row className="mb-4 w-full justify-between">
              <Row className="w-full items-center gap-x-2 md:gap-x-3">
                <Link href={`/user/${post.user?.id}`} className="contents">
                  <Avatar className="size-8 md:size-10">
                    <AvatarImage
                      src={post.user?.urlImage || ""}
                      alt={post.user?.name || "user image"}
                    />
                    <AvatarFallback className="text-xs capitalize md:text-base">
                      {post.user?.name ? getInitials(post.user?.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Row className="items-center gap-x-2">
                  <Link href={`/user/${post.user?.id}`} className="contents">
                    <Text
                      as="span"
                      type={Text.Type.BodyFive}
                      weight={Text.Weight.Bold}
                      className="font-maitree text-xs text-green-500 md:text-base"
                    >
                      {post.user?.name}
                    </Text>
                  </Link>
                  <span className="size-0.5 rounded-full bg-green-500"></span>
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    weight={Text.Weight.Medium}
                    className="text-black-100 font-lora opacity-60"
                  >
                    {formattedPostDate}
                  </Text>
                </Row>
              </Row>
            </Row>

            {/* Content */}
            <Col className="h-fit w-full gap-y-1 text-green-500">
              <Text
                as="h1"
                type={Text.Type.BodyTwo}
                weight={Text.Weight.Medium}
                className="font-lora font-semibold"
              >
                {post.postTitle}
              </Text>

              {contentHTML ? (
                <div
                  className="font-maitree mt-2 text-base break-words text-green-500 [&>p]:text-justify [&>p]:hyphens-auto"
                  lang="pt-BR"
                  dangerouslySetInnerHTML={{
                    __html: prepareHtmlContent(contentHTML),
                  }}
                />
              ) : (
                <Text
                  as="p"
                  type={Text.Type.BodyFour}
                  weight={Text.Weight.Normal}
                  className="font-maitree mt-2 text-justify text-base hyphens-auto whitespace-pre-wrap"
                >
                  {content}
                </Text>
              )}

              <LinkPreviewList
                content={post.postContent.postResources.content ?? ""}
                links={post.postContent.postResources.links ?? []}
              />

              {/* Images */}
              {post.postContent.postResources &&
                post.postContent.postResources.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {post.postContent.postResources.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-64 w-full cursor-zoom-in overflow-hidden rounded-lg"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt ?? "imagem do post"}
                          title={img.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}
            </Col>

            <PostActions
              commentsCount={post.comments.commentsNumber || 0}
              post={post}
              postByAdmin={postByAdmin}
            />
          </Col>
          <PostComments
            comments={post.comments.comments}
            uniqueUsers={uniqueUsers}
            postByAdmin={postByAdmin}
            postId={String(post.id)}
          />
        </section>
      </Layout.Default>
    </PostInteractionProvider>
  );
}
