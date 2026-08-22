import Link from "next/link";
import { TrendingUp } from "lucide-react";

export interface TrendingItem {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  date: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

function TrendingEntry({
  post,
  rank,
  decorative,
}: {
  post: TrendingItem;
  rank: number;
  decorative?: boolean;
}) {
  const published = formatDate(post.date);

  return (
    <li className="px-1">
      <Link
        href={`/posts/${post.slug}`}
        // The looping copy exists only to make the scroll seamless. Leaving it
        // reachable would put every headline in the tab order twice and read it
        // out twice to a screen reader.
        aria-hidden={decorative || undefined}
        tabIndex={decorative ? -1 : undefined}
        className="group flex gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/70"
      >
        <span
          aria-hidden
          className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-brand/70"
        >
          {String(rank).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 block text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-brand">
            {post.title}
          </span>
          <span className="mt-1 block truncate text-xs text-muted-foreground">
            {[post.category, published].filter(Boolean).join(" · ")}
          </span>
        </span>
      </Link>
    </li>
  );
}

/**
 * A slow vertical scroll rather than the shared Marquee primitive, which
 * repeats its children four times — sixteen tab stops and sixteen announced
 * headlines for four stories. Two copies is the minimum a seamless loop needs,
 * and the second is hidden from assistive tech.
 *
 * Motion stops outright under prefers-reduced-motion (see globals.css); the
 * global reduce rule alone would collapse the duration to 0.01ms and snap the
 * list to its *end* position, showing the duplicate copy instead of the list.
 */
export function TrendingRail({
  posts,
  title = "Trending now",
}: {
  posts: TrendingItem[];
  title?: string;
}) {
  if (!posts.length) return null;

  /*
   * Scroll only when the list actually overflows the panel. An entry runs
   * ~76px and the panel is 15rem, so four or more overflow and drift; three or
   * fewer sit still rather than animating against empty space.
   */
  const shouldScroll = posts.length > 3;

  return (
    <section aria-labelledby="trending-heading">
      <h2
        id="trending-heading"
        className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground"
      >
        <TrendingUp className="h-4 w-4 text-brand" aria-hidden />
        {title}
      </h2>

      <div
        className={
          shouldScroll
            ? "group relative max-h-[15rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
            : ""
        }
      >
        <div className={shouldScroll ? "orb-trending-track" : ""}>
          <ul className="space-y-1">
            {posts.map((post, index) => (
              <TrendingEntry key={post._id} post={post} rank={index + 1} />
            ))}
          </ul>

          {shouldScroll && (
            <ul className="space-y-1 pt-1" aria-hidden>
              {posts.map((post, index) => (
                <TrendingEntry
                  key={`loop-${post._id}`}
                  post={post}
                  rank={index + 1}
                  decorative
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
