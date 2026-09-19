import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";

interface EventsPaginationProps {
  page: number;
  totalPages: number;
  isLoading: boolean;
  onChange: (page: number) => void;
  label: string;
}

export function EventsPagination({
  page,
  totalPages,
  isLoading,
  onChange,
  label,
}: EventsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="border-t border-green-100 pt-7" aria-label={label}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(page - 1)}
            disabled={page <= 1 || isLoading}
          />
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              onClick={() => onChange(item)}
              isActive={item === page}
              disabled={isLoading}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(page + 1)}
            disabled={page >= totalPages || isLoading}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
