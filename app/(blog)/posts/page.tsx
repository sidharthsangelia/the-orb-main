import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostsSearch } from "@/components/blog/PostsSearch";
import { PostsResults } from "@/components/blog/PostsResults";
import { PostsFilterPanel } from "@/components/blog/PostsFilterPanel";
import {
  FilterBarSkeleton,
  FilterRailSkeleton,
  PostsResultsSkeleton,
} from "@/components/blog/PostsIndexSkeletons";
import NewsletterArticleCard from "@/components/NewsLetterArticleCard";
import { PostsRailPreference } from "@/components/blog/PostsRailToggle";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsIndexCountQuery } from "@/sanity/lib/queries";
import {
  POSTS_PER_PAGE,
  parsePostsIndexParams,
  postsIndexHref,
  toGroqMatch,
} from "@/lib/posts-index";

export const revalidate = 60;

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { page, category, q } = parsePostsIndexParams(await searchParams);

  const title =
    page > 1 ? `All Stories — Page ${page}` : "All Stories";

  return {
    title,
    description:
      "Climate reporting, explainers and field stories from young Indians — on heat, water, waste, policy and the work of adapting to a warmer country.",
    // Paged views get their own canonical so they can be indexed
    // independently; search and category views point back at the archive
    // rather than competing with it for the same query.
    alternates: {
      canonical: q ? "/posts" : postsIndexHref({ category, page }),
    },
    robots: q ? { index: false, follow: true } : undefined,
  };
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, category, q } = parsePostsIndexParams(await searchParams);

  /*
   * The only blocking query on this route, and only past page 1 — so the
   * common case still streams immediately. It has to happen here rather than
   * inside the results boundary: notFound() cannot set a 404 once a Suspense
   * boundary has flushed the shell, which is exactly how /posts?page=99 ended
   * up serving a 404 page under a 200 status.
   */
  if (page > 1) {
    const total = (await sanityFetch({
      query: postsIndexCountQuery,
      params: { category, q: toGroqMatch(q) },
    })) as number;

    if ((page - 1) * POSTS_PER_PAGE >= total) notFound();
  }

  /*
   * Deliberately NOT awaited here. Every await in this function delays the
   * whole document; the two Suspense boundaries below let the masthead, the
   * search field and the newsletter band reach the browser while Sanity is
   * still answering.
   *
   * The key on each boundary is what makes the skeleton reappear when the
   * reader changes filters — without it React reuses the resolved boundary
   * and the page simply freezes on stale results until the new ones land.
   */
  const resultsKey = `${page}:${category}:${q}`;

  return (
    <div className="min-h-dvh bg-background">
      <PostsRailPreference />

      {/* Masthead — static, so it paints on the first byte */}
      <header className="border-b border-border bg-card/40">
        <div className="container py-14 text-center sm:py-20">
          {/* <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
            <span aria-hidden className="h-px w-6 bg-brand-accent/50" />
            The archive
          </p> */}

          <h1 className="text-balance mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Climate Stories &amp; Insights
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Reporting, explainers and field notes from young Indians turning
            climate awareness into action.
          </p>

          <div className="mt-9">
            <PostsSearch q={q} category={category} />
          </div>
        </div>
      </header>

      <div className="container py-10 sm:py-14">
        {/* Category chips on small screens, where the rail would not fit */}
        <Suspense key={`bar:${q}`} fallback={<FilterBarSkeleton />}>
          <PostsFilterPanel category={category} q={q} variant="bar" />
        </Suspense>

        {/* Column widths live in CSS (.posts-shell) so the collapse can be
            applied before hydration — see PostsRailPreference above. */}
        <div className="posts-shell mt-6 lg:mt-0">
          {/*
           * Sticky below the fixed header, not underneath it. The old rail used
           * `top-8`, which slid the first two categories behind the masthead as
           * soon as the reader scrolled.
           */}
          <aside className="hidden lg:block">
            <div className="posts-rail-clip sticky top-[calc(var(--header-height)+2rem)] max-h-[calc(100dvh-var(--header-height)-4rem)] pb-4 scrollbar-hide">
              <Suspense key={`rail:${q}`} fallback={<FilterRailSkeleton />}>
                <PostsFilterPanel category={category} q={q} variant="rail" />
              </Suspense>
            </div>
          </aside>

          <div className="min-w-0">
            <Suspense
              key={resultsKey}
              fallback={
                <PostsResultsSkeleton feature={page === 1 && !category && !q} />
              }
            >
              <PostsResults page={page} category={category} q={q} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-y">
          <NewsletterArticleCard />
        </div>
      </div>
    </div>
  );
}
