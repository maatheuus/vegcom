"use client";

import useLinkPreviews from "@/shared/hooks/useLinkPreviews";
import Col from "@/shared/ui/Layout/Helpers/Col";
import LinkPreview from "./LinkPreview";
import PreviewSkeleton from "./PreviewSkeleton";

interface LinkPreviewListProps {
  content: string;
  links?: string[];
  onPreviewClick?: (e: React.MouseEvent) => void;
}

export default function LinkPreviewList({
  content,
  links,
  onPreviewClick,
}: LinkPreviewListProps) {
  const { previews, isLoading } = useLinkPreviews(content, links);

  if (!isLoading && previews.length === 0) return null;

  return (
    <Col className="mt-3 gap-y-2">
      {isLoading ? (
        <PreviewSkeleton />
      ) : (
        previews.map((preview, idx) => (
          <LinkPreview
            key={preview.type === "recipe" ? preview.slug : preview.id}
            preview={preview}
            onClick={(e) => {
              e.stopPropagation();
              onPreviewClick?.(e);
            }}
          />
        ))
      )}
    </Col>
  );
}
