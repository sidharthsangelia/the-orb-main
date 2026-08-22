import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

import { CategoryChip } from "@/components/ui/category-chip";
import { urlForImage } from "@/sanity/lib/utils";

type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author?: {
    name: string;
    picture?: any;
  };
  category?: {
    title?: string | null;
    color?: string | null;
  } | null;
  readingTime?: number;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : dateFormatter.format(parsed);
}

function PostCard({ post }: { post: Post }) {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(900).height(1125).fit("crop").url()
    : null;

  const authorImage = post.author?.picture
    ? urlForImage(post.author.picture)?.width(72).height(72).fit("crop").url()
    : null;

  const published = formatDate(post.date);
  const minutes = Math.max(1, post.readingTime ?? 1);

  return (
    /*
     * A fixed aspect ratio rather than the old `h-96`: at three across on a
     * 1280px container that height left the cards wider than they were tall,
     * so the photograph was cropped to a letterbox strip and the text block
     * filled most of the card.
     */
    <article className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      {imageUrl ? (
        /*
         * Was a CSS `background-image`, which meant no optimisation, no
         * lazy-loading and no responsive sizes — three full-size photos
         * downloading eagerly on every home page visit.
         */
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
          className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/40 to-brand-accent/40"
        />
      )}

      {/*
       * Two scrim layers, not one. A flat wash tames blown-out skies and pale
       * photographs that the old single bottom gradient left white-on-white,
       * while the gradient carries the text block itself to AA contrast.
       */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 via-45% to-transparent"
      />

      {post.category && (
        <CategoryChip
          category={post.category}
          tone="onImage"
          className="absolute left-5 top-5 shadow-sm"
        />
      )}

      <div className="p-5 sm:p-6">
        <h3 className="text-balance text-lg font-semibold leading-snug text-white sm:text-xl">
          <Link
            href={`/posts/${post.slug}`}
            /* Stretched link — the whole card is the hit target, and it is the
               card's only tab stop. */
            className="line-clamp-2 rounded-sm outline-none after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/75">
            {post.excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center gap-2.5 border-t border-white/15 pt-4">
          {authorImage ? (
            <Image
              height={32}
              width={32}
              alt=""
              src={authorImage}
              className="h-8 w-8 shrink-0 rounded-full border border-white/25 object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15"
            >
              <User className="h-4 w-4 text-white/80" />
            </span>
          )}

          <p className="min-w-0 truncate text-sm font-medium text-white/90">
            {post.author?.name || "The Órb"}
          </p>

          <span aria-hidden className="text-white/30">
            •
          </span>

          <p className="flex shrink-0 items-center gap-1.5 text-xs text-white/70">
            {published && <time dateTime={post.date}>{published}</time>}
            {published && (
              <span aria-hidden className="text-white/30">
                •
              </span>
            )}
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {minutes} min
          </p>
        </div>
      </div>
    </article>
  );
}

export default function PostRowGrid({ posts }: { posts: Post[] }) {
  if (!posts?.length) return null;

  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
