"use client";

import Row from "@/shared/ui/Layout/Helpers/Row";
import { BookmarkIcon } from "@phosphor-icons/react";
import { memo, useCallback, useState } from "react";

interface SaveRecipeButtonProps {
  initialSaved: boolean;
  onSavedChange?: (saved: boolean) => void;
}

const SaveRecipeButton = memo(function SaveRecipeButton({
  initialSaved,
  onSavedChange,
}: SaveRecipeButtonProps) {
  const [saved, setSaved] = useState(initialSaved);

  const handleClick = useCallback(() => {
    const newSaved = !saved;
    setSaved(newSaved);
    onSavedChange?.(newSaved);
  }, [saved, onSavedChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <Row
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-label={
        saved ? "Remover receita dos favoritos" : "Salvar receita nos favoritos"
      }
      aria-pressed={saved}
    >
      <BookmarkIcon
        weight={saved ? "fill" : "thin"}
        size={18}
        className="text-green-500"
        aria-hidden="true"
      />
    </Row>
  );
});

export default SaveRecipeButton;
