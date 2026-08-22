import Link from "next/link";
import { Image } from "next-sanity/image";
import { Clock } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { relatedStoriesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import DateComponent from "./date";

export default async function MoreStories({
  skip,
  limit,
  categoryIds,
}: {
  skip: string;
  limit: number;
  categoryIds: string[];
}) {
  const pool = await sanityFetch({
    query: relatedStoriesQuery,
    params: { skip, categoryIds },
  });

  /*
   * Rank by shared categories, then let recency break ties. Array.sort is
   * stable, so the date ordering the query already applied survives within
   * each relevance band — and a post with no category overlap still fills the
   * grid rather than leaving a hole.
   */
  const posts = [...(pool ?? [])]
    .sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0))
    .slice(0, limit);

  if (!posts.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const cover = post.coverImage?.asset?._ref
          ? urlForImage(post.coverImage)?.width(800).height(500).fit("crop").url()
          : null;

        return (
          <article
            key={post._id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {cover && (
                <Image
                  src={cover}
                  alt={post.coverImage?.alt || ""}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              {post.category?.title && (
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  {post.category.title}
                </span>
              )}

              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                <Link href={`/posts/${post.slug}`}>
                  {/* Stretched link: the whole card is the target, but the
                      accessibility tree still sees exactly one link. */}
                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                  {post.title}
                </Link>
              </h3>

              {post.excerpt && (
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-muted-foreground">
                {post.author?.name && (
                  <>
                    <span className="font-medium text-foreground/80">
                      {post.author.name}
                    </span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <DateComponent dateString={post.date} />
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {Math.max(1, post.readingTime ?? 1)} min
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
