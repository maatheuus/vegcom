import { useCallback, useState } from 'react';

interface UseSearchBarReturn {
  isFocused: boolean;
  isHovered: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useSearchBar(): UseSearchBarReturn {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    isFocused,
    isHovered,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  };
} 