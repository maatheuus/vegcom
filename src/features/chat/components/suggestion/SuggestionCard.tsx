import Text from "@/shared/ui/Text";
import { ArrowRightIcon, LightbulbFilamentIcon } from "@phosphor-icons/react";
import React from "react";
import type { Suggestion } from "./";

const SuggestionCard: React.FC<{
  suggestion: Suggestion;
  onClick: () => void;
}> = ({ suggestion, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group animate-fadeIn relative w-full cursor-pointer overflow-hidden rounded-xl border border-green-200/80 bg-green-50 p-4 text-left shadow-sm transition-all duration-300 hover:border-green-500 hover:shadow-lg"
    >
      <LightbulbFilamentIcon
        size={20}
        className="absolute top-2 right-2 text-8xl text-green-200/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-2">
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="font-lora inline-flex h-6 items-center justify-center rounded-full bg-green-500 px-3 text-center text-sm text-green-50"
          >
            {suggestion.category}
          </Text>
        </div>

        <Text
          as="h3"
          weight={Text.Weight.Medium}
          className="font-maitree text-lg text-green-500"
        >
          {suggestion.title}
        </Text>

        <div className="font-maitree mt-auto flex items-center justify-between pt-4">
          <Text
            type={Text.Type.BodyFive}
            className="text-green-500 italic opacity-80"
          >
            &quot;{suggestion.prompt.substring(0, 35)}...&quot;
          </Text>

          <div className="transform text-green-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:translate-x-[-10px]">
            <ArrowRightIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default SuggestionCard;
