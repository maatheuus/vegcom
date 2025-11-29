import { SearchBar } from "@/features/recipes/components/SearchBar";
import useDebounce from "@/shared/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export type SortValues = "recent" | "old" | "views" | "rating";

const sortByOptions = [
  { value: "recent", label: "Mais recentes" },
  { value: "old", label: "Mais antigas" },
  { value: "views", label: "Mais vistas" },
  { value: "rating", label: "Mais avaliadas" },
];

export default function RecipeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<string>(
    (searchParams.get("sort") as SortValues) || "",
  );

  const debouncedSearchParam = useDebounce(searchTerm, 500);
  const isFirstRender = useRef(true);
  const isClearing = useRef(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isClearing.current) {
      return;
    }

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

    params.delete("clear_search");

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl, { scroll: false });
  }, [debouncedSearchParam, sortBy, router, searchParams]);

  useEffect(() => {
    const clearSearch = searchParams.get("clear_search");
    const currentQ = searchParams.get("q");

    if (clearSearch === "true") {
      isClearing.current = true;
      setSearchTerm("");

      setTimeout(() => {
        isClearing.current = false;
      }, 100);
    } else if (currentQ !== searchTerm && !isClearing.current) {
      setSearchTerm(currentQ || "");
    }
  }, [searchParams]);

  return (
    <>
      <SearchBar
        placeholder="Buscar receitas..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-lg rounded-full border border-green-500"
        inputClassName="!max-w-full w-full"
      />

      <div className="max-w-fit">
        <Select onValueChange={handleSort} value={sortBy || ""}>
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
