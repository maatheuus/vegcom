import type { LinkPreviewData } from "@/shared/types";
import PreviewPostCard from "./PreviewPostCard";
import PreviewRecipeCard from "./PreviewRecipeCard";

interface LinkPreviewProps {
  preview: LinkPreviewData;
  onClick?: (e: React.MouseEvent) => void;
}

export default function LinkPreview({ preview, onClick }: LinkPreviewProps) {
  if (preview.type === "recipe") {
    return <PreviewRecipeCard p={preview} onClick={onClick} />;
  }
  return <PreviewPostCard p={preview} onClick={onClick} />;
}
