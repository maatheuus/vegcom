"use client";

import { SearchOutlinedIcon } from "@/components/icons";
import { Categories } from "@/components/recipes/Categories";
import Header from "@/components/recipes/details/Header";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { RecipeHero } from "@/components/recipes/RecipeHero";
import { SearchBar } from "@/components/recipes/SearchBar";
import Button from "@/components/ui/Button";
import Layout from "@/components/ui/Layout";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function Page() {
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
    <Layout.Default className="style-scrollbar overflow-y-auto">
      <section className="container mx-auto space-y-12 px-4 py-8">
        <Row className="items-center justify-between">
          <Header title="Receitas" className="border-0 p-0" />

          <Row className="hidden gap-4 md:flex">
            <SearchBar />
            <Categories />
          </Row>

          <div className="relative md:hidden" ref={menuRef}>
            <Button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              variant="outline"
              size="icon"
              className={clsx(
                "rounded-full shadow-none transition-all duration-300",

                isSearchOpen
                  ? "rotate-90 bg-green-500 text-green-50"
                  : "bg-green-50 text-green-500 hover:bg-green-500 hover:text-green-50",
              )}
            >
              <SearchOutlinedIcon className="h-5 w-5" />
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
                <Categories className="w-full justify-between" />
              </Col>
            </div>
          </div>
        </Row>

        <RecipeHero />

        <Col as="section" className="gap-y-4">
          <Text
            as="h2"
            type={Text.Type.HeadingFour}
            weight={Text.Weight.Bold}
            className="font-lora font-semibold text-green-500"
          >
            Mais Bem Avaliadas
          </Text>
          <RecipeGrid />
        </Col>
      </section>
    </Layout.Default>
  );
}
