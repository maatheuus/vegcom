import type { MouseEvent, TouchEvent } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface MenuPosition {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  transformOrigin: string;
}

const useDraggable = () => {
  const [position, setPosition] = useState<Position>({
    x: typeof window !== 'undefined' ? window.innerWidth - 80 : 0,
    y: 36,
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<Position>({ x: 0, y: 0 });
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    right: "26%",
    top: "0px",
    transformOrigin: "top right",
  });

  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const dragThreshold = 5;

  const calculateMenuPosition = useCallback((): MenuPosition => {
    const buttonSize = 48;
    const menuWidth = 250;
    const menuHeight = 200;
    const padding = 10;

    if (typeof window === 'undefined') {
      return {
        right: "26%",
        top: "0px",
        transformOrigin: "top right",
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const menuPos: MenuPosition = {
      transformOrigin: "top left",
    };

    const spaceOnRight = viewportWidth - (position.x + buttonSize);
    const spaceOnLeft = position.x;

    if (spaceOnRight >= menuWidth + padding) {
      menuPos.left = "26%";
      menuPos.transformOrigin = "top left";
    } else if (spaceOnLeft >= menuWidth + padding) {
      menuPos.right = "26%";
      menuPos.transformOrigin = "top right";
    } else {
      if (spaceOnRight > spaceOnLeft) {
        menuPos.left = "26%";
        menuPos.transformOrigin = "top left";
      } else {
        menuPos.right = "26%";
        menuPos.transformOrigin = "top right";
      }
    }

    const spaceBelow = viewportHeight - position.y;
    const spaceAbove = position.y + buttonSize;

    if (spaceBelow >= menuHeight + padding) {
      menuPos.top = "0px";
      menuPos.transformOrigin = menuPos.transformOrigin.replace("top", "top");
    } else if (spaceAbove >= menuHeight + padding) {
      menuPos.bottom = "0%";
      menuPos.transformOrigin = menuPos.transformOrigin.replace(
        "top",
        "bottom"
      );
    } else {
      if (spaceBelow > spaceAbove) {
        menuPos.top = "0px";
        menuPos.transformOrigin = menuPos.transformOrigin.replace("top", "top");
      } else {
        menuPos.bottom = "0%";
        menuPos.transformOrigin = menuPos.transformOrigin.replace(
          "top",
          "bottom"
        );
      }
    }

    return menuPos;
  }, [position]);

  useEffect(() => {
    if (isMenuOpen) {
      setMenuPosition(calculateMenuPosition());
    }
  }, [position, isMenuOpen, calculateMenuPosition]);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      const maxX = typeof window !== 'undefined' ? window.innerWidth - 50 : 0;
      const maxY = typeof window !== 'undefined' ? window.innerHeight - 50 : 0;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      if (isDragging) {
        const dragDistance = Math.sqrt(
          Math.pow(e.clientX - dragStartPos.x, 2) +
            Math.pow(e.clientY - dragStartPos.y, 2)
        );

        if (dragDistance < dragThreshold) {
          setIsMenuOpen((prev) => !prev);
        }
      }
      setIsDragging(false);
    },
    [isDragging, dragStartPos, dragThreshold]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
    setDragStartPos({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    if (!touch) return;

    const newX = touch.clientX - dragOffset.current.x;
    const newY = touch.clientY - dragOffset.current.y;

    const maxX = typeof window !== 'undefined' ? window.innerWidth - 50 : 0;
    const maxY = typeof window !== 'undefined' ? window.innerHeight - 50 : 0;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
    e.preventDefault();
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.changedTouches[0];
      if (!touch) return;

      const dragDistance = Math.sqrt(
        Math.pow(touch.clientX - dragStartPos.x, 2) +
          Math.pow(touch.clientY - dragStartPos.y, 2)
      );

      if (dragDistance < dragThreshold) {
        setIsMenuOpen((prev) => !prev);
      }
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (dragRef.current && !dragRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Set initial position once component mounts on client
    if (typeof window !== 'undefined' && position.x === 0) {
      setPosition({ x: window.innerWidth - 80, y: 36 });
    }
  }, [position.x]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setPosition({ x: window.innerWidth - 80, y: 36 });
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 9999,
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    touchAction: "none",
    width: "auto",
    margin: 0,
    right: "auto",
    transform: "none",
  };

  const menuStyle: React.CSSProperties = {
    ...menuPosition,
    transformOrigin: menuPosition.transformOrigin,
  };

  return {
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    containerStyle,
    menuStyle,
    isMenuOpen,
    dragRef,
    isDragging,
  };
};

export default useDraggable;
