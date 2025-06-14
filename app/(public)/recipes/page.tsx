"use client";

import { SearchOutlinedIcon } from "@/components/icons";
import { Categories } from "@/components/recipes/Categories";
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
    <Layout.Default className="overflow-y-auto style-scrollbar">
      <section className="container mx-auto px-4 py-8 space-y-12">
        <Row className="items-center justify-between">
          <Text
            as="h1"
            type={Text.Type.HeadingTwo}
            weight={Text.Weight.Medium}
            className="text-green-500"
          >
            Receitas
          </Text>
          
          <Row className="hidden md:flex gap-4">
            <SearchBar />
            <Categories />
          </Row>

          <div className="md:hidden relative" ref={menuRef}>
            <Button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              variant="outline"
              size="icon"
              className={clsx(
                "rounded-full transition-all duration-300 shadow-none",

                isSearchOpen 
                  ? "bg-green-500 text-green-50 rotate-90" 
                  : "bg-green-50 text-green-500 hover:bg-green-500 hover:text-green-50"
              )}
            >
              <SearchOutlinedIcon className="w-5 h-5" />
            </Button>

            <div
              className={clsx(
                "absolute right-0 top-12 w-[280px] bg-green-50 rounded-md shadow-md p-4 z-50",
                "transition-all duration-300 ease-in-out",
                isSearchOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
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
            className="text-green-500"
          >
            Mais Bem Avaliadas
          </Text>
          <RecipeGrid />
        </Col>
      </section>
    </Layout.Default>
  );
}
