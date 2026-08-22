import Link from "next/link";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { postsIndexHref } from "@/lib/posts-index";
import { PostsRailToggle } from "@/components/blog/PostsRailToggle";

export interface FacetCategory {
  _id: string;
  title: string | null;
  slug: string | null;
  color: string | null;
  postCount: number | null;
}

interface Entry {
  key: string;
  title: string;
  color: string | null;
  count: number;
}

/**
 * A category with no stories is a dead end — the old sidebar listed one
 * ("Expert Analysis", 0 posts) as a link straight to an empty page.
 */
export function buildEntries(
  categories: FacetCategory[],
  totalCount: number,
): Entry[] {
  const usable = categories.filter(
    (category) => category.slug && (category.postCount ?? 0) > 0,
  );

  if (!usable.length) return [];

  return [
    { key: "", title: "All stories", color: null, count: totalCount },
    ...usable.map((category) => ({
      key: category.slug as string,
      title: category.title ?? "Untitled",
      color: category.color,
      count: category.postCount ?? 0,
    })),
  ];
}

function Dot({ color, active }: { color: string | null; active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors",
        !color && (active ? "bg-brand" : "bg-muted-foreground/40"),
      )}
      style={color ? { backgroundColor: color } : undefined}
    />
  );
}

/** The full list, shown while the rail is expanded. */
export function CategoryFilterList({
  entries,
  active,
  q,
}: {
  entries: Entry[];
  active: string;
  q: string;
}) {
  return (
    <nav id="posts-topics-rail" aria-label="Filter stories by category">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <Tag className="h-4 w-4 text-brand" aria-hidden />
          Topics
        </h2>
        <PostsRailToggle />
      </div>

      <ul className="space-y-0.5">
        {entries.map((entry) => {
          const isActive = entry.key === active;
          return (
            <li key={entry.key || "all"}>
              <Link
                href={postsIndexHref({ category: entry.key, q, page: 1 })}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-brand/10 font-semibold text-brand"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Dot color={entry.color} active={isActive} />
                <span className="min-w-0 flex-1 truncate">{entry.title}</span>
                <span className="text-xs tabular-nums text-muted-foreground/70">
                  {entry.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * The collapsed gutter: one dot per topic, so the filters remain a visible
 * affordance rather than vanishing behind a button.
 */
export function CategoryFilterStrip({
  entries,
  active,
  q,
}: {
  entries: Entry[];
  active: string;
  q: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <PostsRailToggle />

      <ul className="flex flex-col items-center gap-1">
        {entries.map((entry) => {
          const isActive = entry.key === active;
          return (
            <li key={entry.key || "all"}>
              <Link
                href={postsIndexHref({ category: entry.key, q, page: 1 })}
                scroll={false}
                title={`${entry.title} (${entry.count})`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-brand/10 ring-1 ring-brand/30"
                    : "hover:bg-muted",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2 w-2 rounded-full",
                    !entry.color &&
                      (isActive ? "bg-brand" : "bg-muted-foreground/40"),
                  )}
                  style={
                    entry.color ? { backgroundColor: entry.color } : undefined
                  }
                />
                <span className="sr-only">
                  {entry.title}, {entry.count}{" "}
                  {entry.count === 1 ? "story" : "stories"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Horizontal scroller used below the lg breakpoint, where a rail cannot fit. */
export function CategoryFilterBar({
  entries,
  active,
  q,
}: {
  entries: Entry[];
  active: string;
  q: string;
}) {
  return (
    <nav
      aria-label="Filter stories by category"
      className="-mx-4 sm:-mx-6 lg:hidden"
    >
      <ul className="flex snap-x gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide sm:px-6">
        {entries.map((entry) => {
          const isActive = entry.key === active;
          return (
            <li key={entry.key || "all"} className="snap-start">
              <Link
                href={postsIndexHref({ category: entry.key, q, page: 1 })}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "inline-flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
                )}
              >
                {entry.color && <Dot color={entry.color} active={isActive} />}
                {entry.title}
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    isActive ? "opacity-80" : "opacity-60",
                  )}
                >
                  {entry.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
