import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { postsIndexHref } from "@/lib/posts-index";

interface PostsPaginationProps {
  currentPage: number;
  totalPages: number;
  category: string;
  q: string;
}

/**
 * Link-based, so every page of the archive is a real URL a crawler can follow
 * and a reader can bookmark. The previous pager was a set of buttons calling
 * setState — and behind a query that ignored the page entirely, so pressing "2"
 * re-rendered exactly the same posts.
 */
function pageWindow(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < total) pages.add(current + 1);
  if (current <= 3) pages.add(2).add(3);
  if (current >= total - 2) pages.add(total - 1).add(total - 2);

  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1
      ? (["gap", page] as (number | "gap")[])
      : [page],
  );
}

const arrowClass =
  "inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium transition-colors";

export function PostsPagination({
  currentPage,
  totalPages,
  category,
  q,
}: PostsPaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Story archive pages"
      className="mt-12 flex items-center justify-center gap-1.5 border-t border-border pt-8"
    >
      {hasPrev ? (
        <Link
          href={postsIndexHref({ category, q, page: currentPage - 1 })}
          rel="prev"
          className={cn(arrowClass, "text-foreground hover:border-brand/40 hover:bg-muted")}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        // Rendered as inert text rather than omitted, so the row does not
        // reflow as the reader moves between the first page and the rest.
        <span
          aria-hidden
          className={cn(arrowClass, "cursor-default opacity-40")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      <ul className="flex items-center gap-1">
        {pageWindow(currentPage, totalPages).map((page, index) =>
          page === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="px-1.5 text-sm text-muted-foreground"
            >
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={postsIndexHref({ category, q, page })}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium tabular-nums transition-colors",
                  page === currentPage
                    ? "bg-brand text-brand-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {page}
              </Link>
            </li>
          ),
        )}
      </ul>

      {hasNext ? (
        <Link
          href={postsIndexHref({ category, q, page: currentPage + 1 })}
          rel="next"
          className={cn(arrowClass, "text-foreground hover:border-brand/40 hover:bg-muted")}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : (
        <span
          aria-hidden
          className={cn(arrowClass, "cursor-default opacity-40")}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
