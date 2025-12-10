import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

/**
 * Props for the usePagination hook.
 * @template T
 */
interface UsePaginationProps<T> {
  /** The complete list of items to paginate. */
  items: T[];
  /** The number of items to display per page. */
  itemsPerPage?: number;
  /** Artificial delay in milliseconds to simulate loading. */
  loadingDelay?: number;
  /** The URL query parameter key for the page number. */
  queryKey?: string;
  /** Optional function to sort items before paginating. */
  sortFn?: (a: T, b: T) => number;
}

/**
 * A custom hook for client-side pagination with URL synchronization.
 *
 * @template T
 * @param {UsePaginationProps<T>} props - The configuration properties.
 * @returns {Object} An object containing pagination state and control functions.
 * @returns {number} return.currentPage - The current page number (1-based).
 * @returns {number} return.totalPages - The total number of pages.
 * @returns {T[]} return.currentItems - The items for the current page.
 * @returns {Function} return.goToPage - Function to navigate to a specific page.
 * @returns {Function} return.goToNextPage - Function to navigate to the next page.
 * @returns {Function} return.goToPreviousPage - Function to navigate to the previous page.
 * @returns {Function} return.getPageNumbers - Function to generate the list of page numbers to display (including ellipses).
 * @returns {boolean} return.hasNextPage - Whether there is a next page.
 * @returns {boolean} return.hasPreviousPage - Whether there is a previous page.
 * @returns {boolean} return.isLoading - Whether a page transition is in progress.
 */
export function usePagination<T>({
  items,
  itemsPerPage = 10,
  loadingDelay = 300,
  queryKey = "page",
  sortFn,
}: UsePaginationProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const sortedItems = useMemo(() => {
    if (!sortFn) return items;
    return [...items].sort(sortFn);
  }, [items, sortFn]);

  const currentPage = Number(searchParams.get(queryKey)) || 1;
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedItems.slice(start, end);
  }, [sortedItems, currentPage, itemsPerPage]);

  const updateURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        params.delete(queryKey);
      } else {
        params.set(queryKey, page.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.push(url, { scroll: false });
      });
    },
    [pathname, queryKey, router, searchParams],
  );

  /**
   * Navigates to a specific page number.
   * @param {number} page - The target page number.
   */
  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      if (pageNumber === currentPage) return;

      setIsLoading(true);
      updateURL(pageNumber);

      setTimeout(() => {
        setIsLoading(false);
      }, loadingDelay);
    },
    [currentPage, loadingDelay, totalPages, updateURL],
  );

  /**
   * Navigates to the next page if available.
   */
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage, totalPages]);

  /**
   * Navigates to the previous page if available.
   */
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  /**
   * Generates an array of page numbers and ellipses for pagination UI.
   * @returns {(number | "ellipsis")[]} The array of page numbers/ellipses.
   */
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    isLoading: isLoading || isPending,
  };
}
