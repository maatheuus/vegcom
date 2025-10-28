import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  showCharacterCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      showCharacterCount = false,
      maxLength = 500,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
      if (value !== undefined) {
        const length = typeof value === "string" ? value.length : 0;
        setCharCount(length);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (showCharacterCount && newValue.length > maxLength) {
        return;
      }

      setCharCount(newValue.length);

      if (onChange) {
        onChange(e);
      }
    };

    const isNearLimit = charCount >= maxLength * 0.9;
    const isAtLimit = charCount >= maxLength;

    return (
      <div className="relative w-full">
        <textarea
          id="textarea"
          className={clsx(
            "font-maitree flex field-sizing-content max-h-[160px] min-h-[92px] w-full max-w-[570px] resize-none rounded-sm border border-green-500 bg-transparent px-3 py-2 pb-8 text-sm text-green-500 placeholder:text-green-200 focus-visible:ring-1 focus-visible:ring-green-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          maxLength={showCharacterCount ? maxLength : undefined}
          {...props}
        />

        {showCharacterCount && (
          <div className="font-lora absolute right-3 bottom-2 flex items-center gap-x-1 italic">
            <span
              className={clsx(
                "text-xs font-medium transition-colors",
                isAtLimit
                  ? "font-semibold text-red-500"
                  : isNearLimit
                    ? "text-orange-500"
                    : "text-green-200",
              )}
            >
              {charCount}
            </span>
            <span className="text-xs text-green-200">/</span>
            <span className="text-xs text-green-200">{maxLength}</span>
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
