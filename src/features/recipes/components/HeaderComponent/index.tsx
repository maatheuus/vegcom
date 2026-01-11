"use client";

import { Categories } from "@/features/recipes/components/Categories";
import { ClearFiltersButton } from "@/features/recipes/components/ClearFiltersButton";
import { SearchBar } from "@/features/recipes/components/SearchBar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function HeaderComponent({ children }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {children}
      <div className="relative md:hidden" ref={menuRef}>
        <Button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          variant="outline"
          size="icon"
          className={clsx(
            "rounded-full shadow-none transition-all duration-300",

            isSearchOpen
              ? "bg-green-500 text-green-50"
              : "bg-green-50 text-green-500 hover:bg-green-500 hover:text-green-50",
          )}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>

        <div
          className={clsx(
            "absolute top-12 right-0 z-50 w-[280px] rounded-md bg-green-50 p-4 shadow-md",
            "transition-all duration-300 ease-in-out",
            isSearchOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0",
          )}
        >
          <Col className="gap-3">
            <SearchBar className="w-full" />
            <Row className="items-center gap-2">
              <Categories className="w-full justify-between" />
              <ClearFiltersButton />
            </Row>
          </Col>
        </div>
      </div>
    </>
  );
}
