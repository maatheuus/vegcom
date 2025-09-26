import Text from "@/components/ui/Text";
import React from "react";
import type { Suggestion } from "../tabsComponentsPage/SuggestionsPage";

const SuggestionCard: React.FC<{
  suggestion: Suggestion;
  onClick: () => void;
  index: number;
}> = ({ suggestion, onClick, index }) => {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer relative bg-green-50 border border-green-200/80 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-left w-full animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-full grid">
        <div className="flex mb-3">
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="text-green-50 bg-green-500 rounded-full px-2 py-0.5 text-center"
          >
            {suggestion.category}
          </Text>
        </div>

        <Text as="h3" weight={Text.Weight.Medium} className="text-green-500">
          {suggestion.title}
        </Text>
        <Text type={Text.Type.BodyFour} className="text-green-200 mb-3">
          {suggestion.description}
        </Text>

        <div className="flex items-center justify-between mt-auto">
          <Text
            type={Text.Type.BodyFive}
            className="text-green-500 opacity-80 italic truncate"
          >
            &quot{suggestion.prompt.substring(0, 50)}...&quot
          </Text>
        </div>
      </div>
    </button>
  );
};

export default SuggestionCard;
