"use client";

import { SearchBar } from "@/components/recipes/SearchBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type SortValues = "recent" | "old" | "views" | "rating";
interface Props {}

const sortByOptions = [
  { value: "recent", label: "Mais recentes" },
  { value: "old", label: "Mais antigas" },
  { value: "views", label: "Mais vistas" },
  { value: "rating", label: "Mais avaliadas" },
];

export default function RecipeFilter({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sort") as SortValues
  );
  const debouncedSearchParam = useDebounce(searchTerm, 200);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [searchParams]
  );

  const handleSort = useCallback(
    (value: string) => {
      setSortBy(value);
    },
    [searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchParam) {
      params.set("q", debouncedSearchParam);
    } else {
      params.delete("q");
    }

    if (sortBy) {
      params.set("sort", sortBy);
    } else {
      params.delete("sort");
    }

    router.push(`?${params}`, { scroll: false });
  }, [debouncedSearchParam, pathname, searchParams, sortBy]);

  useEffect(() => {
    const cleanAllIsSet = searchParams.get("clean_all");

    if (cleanAllIsSet === "true") {
      setSearchTerm("");
      setSortBy("");
    }
  }, [searchParams]);

  return (
    <>
      <SearchBar
        placeholder="Buscar receitas..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-green-500 rounded-full w-full max-w-lg"
        inputClassName="!max-w-full w-full"
      />

      <div className="max-w-fit">
        <Select onValueChange={handleSort} defaultValue={sortBy || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" data-slot="select-value" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Opções</SelectLabel>
              {sortByOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
