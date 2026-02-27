import { getPostById } from "@/features/community";
import PostActions from "@/features/communityPost/components/PostActions";
import PostComments from "@/features/communityPost/components/PostComments";
import { PostInteractionProvider } from "@/features/communityPost/context/PostInteractionProvider";
import type { PostComment } from "@/shared";
import { dateFormatDistanceLocale } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackToCommunityButton from "../../../../../src/features/communityPost/components/BackToCommunityButton";

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  const content = post?.postContent.postResources?.content;
  const hasHTMLTags = /<[a-z][\s\S]*>/i.test(content || "");

  if (!post) {
    return notFound();
  }

  const uniqueUsersMap = new Map<string, { name: string }>();
  post.comments?.comments.forEach((comment: PostComment) => {
    if (comment.user && comment.user.name) {
      uniqueUsersMap.set(comment.user.name, comment.user);
    }
  });

  const uniqueUsers = Array.from(uniqueUsersMap.values());

  const formattedPostDate = formatDistance(
    new Date(post.postDate),
    new Date(),
    {
      addSuffix: true,
      includeSeconds: true,
      locale: dateFormatDistanceLocale,
    },
  );

  return (
    <PostInteractionProvider>
      <Layout.Default
        className="hidden-scrollbar overflow-hidden"
        gridClassName="overflow-auto"
      >
        <section className="hidden-scrollbar col-span-full container mx-auto overflow-scroll scroll-auto">
          <BackToCommunityButton />
          <Col className="w-full rounded-2xl border-b border-b-gray-100 py-5 transition-colors md:px-4">
            {/* Header */}
            <Row className="mb-4 w-full justify-between">
              <Row className="w-full items-center gap-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.urlImage} alt={post.user.name} />
                  <AvatarFallback>
                    {post.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Row className="items-center gap-x-2">
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    weight={Text.Weight.Medium}
                    className="text-gray-900"
                  >
                    {post.user.name}
                  </Text>
                  <span className="size-0.5 rounded-full bg-green-500"></span>
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    weight={Text.Weight.Normal}
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
                as="h2"
                type={Text.Type.BodyTwo}
                weight={Text.Weight.Medium}
                className="font-lora font-semibold italic"
              >
                {post.postTitle}
              </Text>

              {hasHTMLTags ? (
                <div
                  className="font-maitree text-base break-words text-green-500"
                  dangerouslySetInnerHTML={{
                    __html: post.postContent.postResources?.content,
                  }}
                />
              ) : (
                <Text
                  as="p"
                  type={Text.Type.BodyFour}
                  weight={Text.Weight.Normal}
                  className="font-maitree mt-2 text-base whitespace-pre-wrap"
                >
                  {post.postContent.postResources.content}
                </Text>
              )}

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
              likesCount={post.postLikes || 0}
              commentsCount={post.comments.commentsNumber || 0}
              post={post}
              hasHTMLTags={hasHTMLTags}
            />
          </Col>
          <PostComments
            comments={post.comments.comments}
            uniqueUsers={uniqueUsers}
            hasHTMLTags={hasHTMLTags}
          />
        </section>
      </Layout.Default>
    </PostInteractionProvider>
  );
}
