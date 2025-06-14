"use client";

import { HeartFilledIcon, HeartOutlinedIcon } from "@/components/icons";
import Row from "@/components/ui/Layout/Helpers/Row";
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
    [handleClick]
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
      {saved ? (
        <HeartFilledIcon
          className="text-green-500"
          size={18}
          aria-hidden="true"
        />
      ) : (
        <HeartOutlinedIcon
          className="text-green-500"
          size={18}
          aria-hidden="true"
        />
      )}
    </Row>
  );
});

export default SaveRecipeButton;
