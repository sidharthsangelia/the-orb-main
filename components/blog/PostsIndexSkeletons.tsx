import { PostCardSkeleton } from "@/components/blog/PostsGrid";
import { POSTS_PER_PAGE } from "@/lib/posts-index";

/**
 * Every skeleton here mirrors the exact box its content will occupy — same
 * aspect ratios, same row count, same header height. A skeleton that is a
 * different size from its result is just a second layout shift with a
 * shimmer on it.
 */

export function PostsResultsSkeleton({ feature = false }: { feature?: boolean }) {
  return (
    <div>
      <div className="mb-7 flex items-center justify-between border-b border-border pb-4">
        <div className="h-4 w-44 animate-pulse rounded bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
        {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
          <PostCardSkeleton key={index} large={feature && index === 0} />
        ))}
      </div>
    </div>
  );
}

export function FilterRailSkeleton() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-4 h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="space-y-1.5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2.5 px-3 py-2.5">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
              <div className="h-3 w-4 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[17rem] animate-pulse rounded-xl border border-border bg-muted/40" />
    </div>
  );
}

export function FilterBarSkeleton() {
  return (
    <div className="lg:hidden -mx-4 flex gap-2 overflow-hidden px-4 pb-3 sm:-mx-6 sm:px-6">
      {[88, 132, 104, 148, 96].map((width, index) => (
        <div
          key={index}
          style={{ width }}
          className="h-10 flex-shrink-0 animate-pulse rounded-full bg-muted"
        />
      ))}
    </div>
  );
}
