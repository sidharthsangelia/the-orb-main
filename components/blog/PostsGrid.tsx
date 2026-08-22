// components/blog/PostsGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, Leaf, User } from "lucide-react";
import { CategoryChip } from "@/components/ui/category-chip";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@/lib/utils";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author: {
    name: string;
    picture?: any;
  };
  category?: {
    title: string;
    color: string;
  };
  readingTime?: number;
  status?: string;
}

interface PostsGridProps {
  posts: Post[];
  loading?: boolean;
  /** Give the first card the full row. Off for filtered or paged views. */
  feature?: boolean;
  /** Skeleton count — match it to the page size to avoid a jump on load. */
  skeletonCount?: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export const PostCardSkeleton = ({ large = false }: { large?: boolean }) => (
  <div
    className={cn(
      "overflow-hidden rounded-2xl border border-border bg-card",
      large && "sm:col-span-2",
    )}
  >
    <div
      className={cn(
        "animate-pulse bg-muted",
        large ? "aspect-[16/7]" : "aspect-[16/10]",
      )}
    />
    <div className="space-y-3 p-6">
      <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      <div className="h-5 w-full animate-pulse rounded bg-muted" />
      <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="flex items-center gap-2 pt-3">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </div>
    </div>
  </div>
);

const PostCard = ({ post, large = false }: { post: Post; large?: boolean }) => {
  const readingTime = Math.max(1, post.readingTime ?? 1);
  const published = formatDate(post.date);
  const href = `/posts/${post.slug}`;

  return (
    /*
     * One anchor per card, stretched over the whole surface. The previous card
     * wrapped the image, the heading and a "Read more" button in three separate
     * links to the same URL — three tab stops and three identical entries in a
     * screen reader's link list for a single story.
     */
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg focus-within:border-brand/40",
        large && "sm:col-span-2",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          large ? "aspect-[16/7]" : "aspect-[16/10]",
        )}
      >
        {post.coverImage ? (
          <Image
            src={
              urlForImage(post.coverImage)
                ?.width(large ? 1200 : 800)
                .height(large ? 525 : 500)
                .fit("crop")
                .url() || ""
            }
            alt={post.coverImage?.alt || ""}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes={
              large
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/10 to-brand-accent/10">
            <Leaf className="h-8 w-8 text-brand/60" aria-hidden />
          </div>
        )}

        {post.category && (
          <CategoryChip
            category={post.category}
            className="absolute left-4 top-4 shadow-sm"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {published && (
            <span className="inline-flex items-center gap-1.5">
              {/* <CalendarDays className="h-3.5 w-3.5" aria-hidden /> */}
              <time dateTime={post.date}>{published}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {readingTime} min read
          </span>
        </div>

        <h3
          className={cn(
            "font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand",
            large ? "text-xl sm:text-2xl" : "text-lg",
          )}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p
            className={cn(
              "mt-3 leading-relaxed text-muted-foreground",
              large ? "line-clamp-3 text-base" : "line-clamp-2 text-sm",
            )}
          >
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2.5 pt-5">
          {post.author?.picture ? (
            <Image
              src={
                urlForImage(post.author.picture)?.width(64).height(64).url() ||
                ""
              }
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" aria-hidden />
            </span>
          )}
          <span className="text-sm font-medium text-foreground">
            {post.author?.name}
          </span>
        </div>
      </div>
    </article>
  );
};

export function PostsGrid({
  posts,
  loading = false,
  feature = false,
  skeletonCount = 6,
}: PostsGridProps) {
  /*
   * Two columns, never three. In the content column a third track left each
   * card around 270px, which wrapped most headlines to four lines and left no
   * room for the excerpt — the reason the archive read as cluttered.
   */
  const gridClass = "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7";

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <PostCardSkeleton key={index} large={feature && index === 0} />
        ))}
      </div>
    );
  }

  if (!posts.length) return null;

  return (
    <div className={gridClass}>
      {posts.map((post, index) => (
        <PostCard
          key={post._id}
          post={post}
          /*
           * Only the newest story on an unfiltered first page earns the wide
           * card. The old rule promoted index 0, 8, 15… regardless of context,
           * which put a full-bleed "feature" in the middle of page 2.
           */
          large={feature && index === 0}
        />
      ))}
    </div>
  );
}
