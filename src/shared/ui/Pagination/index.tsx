import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/Button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <Button
    variant={isActive ? "default" : "text"}
    size="icon"
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "size-9 cursor-pointer rounded-md transition-colors",
      isActive && "bg-green-500 text-green-50 hover:bg-green-500",
      !isActive && "text-green-500 hover:bg-green-50",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<"button"> & { disabled?: boolean }) => (
  <Button
    variant="text"
    size="sm"
    aria-label="Ir para a página anterior"
    className={cn(
      "cursor-pointer gap-1 px-2.5 text-green-500 hover:bg-green-50",
      disabled && "pointer-events-none opacity-50",
      className,
    )}
    disabled={disabled}
    {...props}
  >
    <ChevronLeft className="size-4" />
    <span className="hidden sm:inline">Anterior</span>
  </Button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<"button"> & { disabled?: boolean }) => (
  <Button
    variant="text"
    size="sm"
    aria-label="Ir para a próxima página"
    className={cn(
      "cursor-pointer gap-1 px-2.5 text-green-500 hover:bg-green-50",
      disabled && "pointer-events-none opacity-50",
      className,
    )}
    disabled={disabled}
    {...props}
  >
    <span className="hidden sm:inline">Próxima</span>
    <ChevronRight className="size-4" />
  </Button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex size-9 cursor-pointer items-center justify-center text-green-500",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">Mais páginas</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
